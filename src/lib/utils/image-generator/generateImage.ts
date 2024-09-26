import { ImageGeneratorStoreType } from "@/lib/store/imageGenerator.store";
import * as htmlToImage from "html-to-image";
import updatePreviewSize from "./updatePreviewSize";
import updatePreviewStyle from "./updatePreviewStyle";
import { toast } from "sonner";

interface IGenerateImage {
  imageGeneratorStore: ImageGeneratorStoreType;
  action?: "download" | "clipboard";
}

const generateImage = async ({
  imageGeneratorStore,
  action = "download",
}: IGenerateImage) => {
  const previewRef = imageGeneratorStore.refs.previewRef;

  if (previewRef?.current) {
    const previewWidth = imageGeneratorStore.settings.dimension.width;
    const previewHeight = imageGeneratorStore.settings.dimension.height;

    const previousWidth = Number(
      previewRef.current.style.width.replace("px", "")
    );
    const previousHeight = Number(
      previewRef.current.style.height.replace("px", "")
    );

    updatePreviewStyle(imageGeneratorStore);

    try {
      const dataUrl = await new Promise<string>(async (resolve) => {
        setTimeout(async () => {
          const result = await htmlToImage.toPng(previewRef.current!);
          resolve(result);
        }, 500);
      });

      if (action === "download") {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "social-image.png";
        link.click();
      } else if (action === "clipboard") {
        const blob = await (await fetch(dataUrl)).blob();
        const clipboardItem = new ClipboardItem({ "image/png": blob });
        await navigator.clipboard.write([clipboardItem]);
        toast.success("Image copy to clipboard !");
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      imageGeneratorStore.setDimensions({
        width: previousWidth,
        height: previousHeight,
      });

      updatePreviewStyle(imageGeneratorStore);

      imageGeneratorStore.setDimensions({
        width: previewWidth,
        height: previewHeight,
      });

      updatePreviewSize(imageGeneratorStore);
    }
  }
};

export default generateImage;
