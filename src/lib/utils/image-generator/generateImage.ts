import * as htmlToImage from "html-to-image";
import IUpdatePreview from "../../interface/IUpdatePreview";
import updatePreviewSize from "./updatePreviewSize";
import updatePreviewStyle from "./updatePreviewStyle";

const generateImage = async ({
  containerRef,
  previewRef,
  imageRef,
  imageGeneratorStore,
  action = "download",
}: IUpdatePreview & { action?: "download" | "clipboard" }) => {
  if (previewRef.current) {
    const previewWidth = imageGeneratorStore.settings.dimension.width;
    const previewHeight = imageGeneratorStore.settings.dimension.height;

    const previousWidth = Number(
      previewRef.current.style.width.replace("px", "")
    );
    const previousHeight = Number(
      previewRef.current.style.height.replace("px", "")
    );

    updatePreviewStyle({
      containerRef,
      previewRef,
      imageRef,
      imageGeneratorStore,
    });

    try {
      const dataUrl = await new Promise<string>(async (resolve) => {
        setTimeout(async () => {
          const result = await htmlToImage.toPng(previewRef.current!);
          resolve(result);
        }, 500);
      });

      if (action === "download") {
        // Télécharger l'image
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "social-image.png";
        link.click();
      } else if (action === "clipboard") {
        const blob = await (await fetch(dataUrl)).blob();
        const clipboardItem = new ClipboardItem({ "image/png": blob });
        await navigator.clipboard.write([clipboardItem]);
        console.log("Image copiée dans le presse-papiers !");
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      imageGeneratorStore.setDimensions({
        width: previousWidth,
        height: previousHeight,
      });

      updatePreviewStyle({
        containerRef,
        previewRef,
        imageRef,
        imageGeneratorStore,
      });

      imageGeneratorStore.setDimensions({
        width: previewWidth,
        height: previewHeight,
      });

      updatePreviewSize({
        containerRef,
        previewRef,
        imageRef,
        imageGeneratorStore,
      });
    }
  }
};

export default generateImage;
