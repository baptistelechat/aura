"use client";
import Preview from "@/components/image-generator/Preview";
import Sidebar from "@/components/image-generator/Sidebar";
import updatePreviewSize from "@/lib/image-generator/updatePreviewSize";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import * as htmlToImage from "html-to-image";
import { useEffect, useRef } from "react";

const ImageGenerator = () => {
  const dimension = useImageGeneratorStore((s) => s.settings.dimension);
  const { width, height } = dimension;
  
  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    updatePreviewSize({ containerRef, previewRef, width, height });
    window.addEventListener("resize", () =>
      updatePreviewSize({ containerRef, previewRef, width, height })
    );
    return () =>
      window.removeEventListener("resize", () =>
        updatePreviewSize({ containerRef, previewRef, width, height })
      );
  }, [width, height]);

  const generateImage = async () => {
    if (previewRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(previewRef.current);
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "social-image.png";
        link.click();
      } catch (error) {
        console.error("Error generating image:", error);
      }
    }
  };

  return (
    <div className="flex h-full p-8">
      <Sidebar generateImage={generateImage} />
      <Preview containerRef={containerRef} previewRef={previewRef} />
    </div>
  );
};

export default ImageGenerator;
