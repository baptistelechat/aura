import * as htmlToImage from "html-to-image";
import IUpdatePreview from "../interface/IUpdatePreview";
import updatePreviewStyle from "./updatePreviewStyle";
const generateImage = async ({
  containerRef,
  previewRef,
  imageRef,
  imageGeneratorStore,
}: IUpdatePreview) => {
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

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "social-image.png";
      link.click();
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
        width:previewWidth,
        height:previewWidth,
      });
    }
  }
};

export default generateImage;
