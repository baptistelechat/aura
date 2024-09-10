import * as htmlToImage from "html-to-image";
import { RefObject } from "react";

interface IGenerateImageProps {
  previewRef: RefObject<HTMLDivElement>;
  width: number;
  height: number;
}

const updatePreviewStyle = ({
  previewRef,
  width,
  height,
}: IGenerateImageProps) => {
  if (previewRef.current) {
    previewRef.current.classList.toggle("border");
    previewRef.current.classList.toggle("border-slate-200");
    previewRef.current.classList.toggle("transition-all");
    previewRef.current.classList.toggle("rounded-xl");

    previewRef.current.style.width = `${width}px`;
    previewRef.current.style.height = `${height}px`;
  }
};

const generateImage = async ({
  previewRef,
  width,
  height,
}: IGenerateImageProps) => {
  if (previewRef.current) {
    const previousWidth = Number(
      previewRef.current.style.width.replace("px", "")
    );
    const previousHeight = Number(
      previewRef.current.style.height.replace("px", "")
    );

    updatePreviewStyle({ previewRef, width, height });

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
      updatePreviewStyle({
        previewRef,
        width: previousWidth,
        height: previousHeight,
      });
    }
  }
};

export default generateImage;
