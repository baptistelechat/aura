import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import * as htmlToImage from "html-to-image";
import { toast } from "sonner";
import { umamiGenerateImage } from "../umami/umamiGenerateImage";
import { updatePreviewSize } from "./updatePreviewSize";
import { updatePreviewStyle } from "./updatePreviewStyle";
import { validateWatermark } from "./validateWatermark";

interface IGenerateImage {
  action?: "download" | "clipboard";
  method?: "button" | "shortcut";
}

export const generateImage = async ({
  action,
  method,
}: IGenerateImage) => {
  const imageGeneratorStore = useImageGeneratorStore.getState();
  const previewRef = imageGeneratorStore.previewRefs.previewRef;

  if (!validateWatermark()) {
    return;
  }

  if (previewRef?.current) {
    imageGeneratorStore.setIsDownloading(true);

    const previewWidth = imageGeneratorStore.settings.dimension.width;
    const previewHeight = imageGeneratorStore.settings.dimension.height;

    const previousWidth = Number(
      previewRef.current.style.width.replace("px", "")
    );
    const previousHeight = Number(
      previewRef.current.style.height.replace("px", "")
    );

    updatePreviewStyle();

    const generateAndHandleImage = new Promise<string>(
      async (resolve, reject) => {
        const format = imageGeneratorStore.settings.dimension.format;

        try {
          // Generate the image in PNG format
          const dataUrl = await new Promise<string>(async (resolve, reject) => {
            try {
              setTimeout(async () => {
                const result = await htmlToImage.toPng(previewRef.current!);
                resolve(result);
              }, 500);
            } catch (error) {
              reject(error);
            }
          });
          const imageData = dataUrl.split(",")[1]; // Extracts base64 data from the image

          // Call the API route to convert the image format
          const response = await fetch("/api/convert-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              image: imageData,
              format,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to convert image.");
          }

          const convertedBlob = await response.blob();

          // Action - Download or Copy to Clipboard
          if (action === "download") {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(convertedBlob);
            link.download = `social-image.${format}`;
            link.click();
            umamiGenerateImage({ action, method });
            resolve("Image successfully downloaded!");
          } else if (action === "clipboard") {
            if (navigator.clipboard && ClipboardItem) {
              const clipboardItem = new ClipboardItem({
                [`image/${format}`]: convertedBlob,
              });
              await navigator.clipboard.write([clipboardItem]);
              umamiGenerateImage({ action, method });
              resolve("Image copied to clipboard!");
            } else {
              reject("Clipboard API or ClipboardItem API is not supported.");
            }
          }
        } catch (error) {
          reject(error);
        }
      }
    );

    toast.promise(generateAndHandleImage, {
      loading: "Generating image...",
      success: (message) => message as string,
      error: "Failed to generate the image or perform the action.",
    });

    try {
      await generateAndHandleImage;
    } catch (error: any) {
      console.error("Error generating image:", error);
      toast.error("Error generating the image or copying to clipboard.", {
        description: error.message,
      });
    } finally {
      imageGeneratorStore.setDimensions({
        width: previousWidth,
        height: previousHeight,
      });
      updatePreviewStyle();
      imageGeneratorStore.setDimensions({
        width: previewWidth,
        height: previewHeight,
      });
      updatePreviewSize();
      imageGeneratorStore.setIsDownloading(false);
    }
  }
};
