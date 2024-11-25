import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import * as htmlToImage from "html-to-image";
import { toast } from "sonner";
import { isFirefox } from "../getBrowser";
import { umamiGenerateImage } from "../umami/umamiGenerateImage";
import { updatePreviewSize } from "./updatePreviewSize";
import { updatePreviewStyle } from "./updatePreviewStyle";
import { validateWatermark } from "./validateWatermark";

interface IGenerateImage {
  action?: "download" | "clipboard";
  method?: "button" | "shortcut";
}

const formatCurrentDate = () => {
  const date = new Date();

  const year = String(date.getFullYear()).padStart(2, "0").slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}${month}${day}_${hours}${minutes}${seconds}`;
};

const mimeType = (format: string, isFirefox: boolean) => {
  if (isFirefox && (format === "tiff" || format === "gif")) {
    return "image/png"; // Force PNG for unsupported formats in Firefox
  }
  if (format === "png") return "image/png";
  if (format === "jpg") return "image/jpeg";
  if (format === "webp") return "image/webp";
  if (format === "tiff") return "image/tiff";
  if (format === "gif") return "image/gif";
  return "image/png";
};

export const generateImage = async ({ action, method }: IGenerateImage) => {
  const isFirefoxBrowser = isFirefox();

  const imageGeneratorStore = useImageGeneratorStore.getState();
  const previewRef = imageGeneratorStore.previewRefs.previewRef;

  if (!validateWatermark()) {
    return;
  }

  if (previewRef?.current) {
    imageGeneratorStore.setIsDownloading(true);

    const previousTransform = previewRef.current.style.transform;

    previewRef.current.style.transform = "scale(1)";

    updatePreviewStyle();

    const generateAndHandleImage = new Promise<string>(
      async (resolve, reject) => {
        const format = imageGeneratorStore.settings.dimension.format;

        try {
          const dataUrl = await new Promise<string>(async (resolve, reject) => {
            try {
              setTimeout(async () => {
                const canvas = await htmlToImage.toCanvas(previewRef.current!);
                const result = canvas.toDataURL(
                  mimeType(format, isFirefoxBrowser)
                );
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
            link.download = `Aura_${formatCurrentDate()}.${format}`;
            link.click();
            umamiGenerateImage({ action, method });
            if (isFirefoxBrowser && (format === "tiff" || format === "gif")) {
              toast.warning(
                "Firefox does not support TIFF and GIF formats. PNG is used instead."
              );
            }
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
      previewRef.current.style.transform = previousTransform;
      updatePreviewStyle();
      updatePreviewSize();
      imageGeneratorStore.setIsDownloading(false);
    }
  }
};
