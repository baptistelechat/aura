import * as htmlToImage from "html-to-image";
import { RefObject } from "react";

const generateImage = async (previewRef: RefObject<HTMLDivElement>) => {
  if (previewRef.current) {
    try {
      previewRef.current.classList.remove(
        "border",
        "border-slate-200",
        "transition-all",
        "rounded-xl"
      );

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
      previewRef.current.classList.add(
        "border",
        "border-slate-200",
        "transition-all",
        "rounded-xl"
      );
    }
  }
};

export default generateImage;
