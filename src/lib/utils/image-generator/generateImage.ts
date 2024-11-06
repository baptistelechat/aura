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

const mimeType = (format: string) => {
  if (format === "png") return "image/png";
  if (format === "jpg") return "image/jpeg";
  if (format === "webp") return "image/webp";
  if (format === "tiff") return "image/tiff";
  if (format === "gif") return "image/gif";
  return "image/png";
};

export const generateImage = async ({ action, method }: IGenerateImage) => {
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
          const dataUrl = await new Promise<string>(async (resolve, reject) => {
            try {
              setTimeout(async () => {
                const canvas = await htmlToImage.toCanvas(previewRef.current!);
                const result = canvas.toDataURL(mimeType(format));
                resolve(result);
              }, 1000);
            } catch (error) {
              reject(error);
            }
          });

          const convertedBlob = await fetch(dataUrl).then((res) => res.blob());

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
                [`image/png`]: convertedBlob,
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
