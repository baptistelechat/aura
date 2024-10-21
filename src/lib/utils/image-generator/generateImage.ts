import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import * as htmlToImage from "html-to-image";
import { toast } from "sonner";
import { updatePreviewSize } from "./updatePreviewSize";
import { updatePreviewStyle } from "./updatePreviewStyle";
import { validateWatermark } from "./validateWatermark";
import { umamiGenerateImage } from "../umami/umamiGenerateImage";

interface IGenerateImage {
  action?: "download" | "clipboard";
  method?: "button" | "shortcut";
}

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
        // Generate image
        try {
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

          // Action - Download or Copy to clipboard
          if (action === "download") {
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = "social-image.png";
            link.click();
            umamiGenerateImage({ action, method });
            resolve("Image successfully downloaded!");
          } else if (action === "clipboard") {
            const blob = await (await fetch(dataUrl)).blob();
            const clipboardItem = new ClipboardItem({ "image/png": blob });
            await navigator.clipboard.write([clipboardItem]);
            umamiGenerateImage({ action, method });
            resolve("Image copied to clipboard!");
          }
        } catch (error) {
          reject(error);
        }
      }
    );

    toast.promise(generateAndHandleImage, {
      loading: "Generating image...",
      success: (message) => {
        return message as string;
      },
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
