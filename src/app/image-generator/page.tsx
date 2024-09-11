"use client";
import Preview from "@/components/image-generator/Preview";
import Sidebar from "@/components/image-generator/Sidebar";
import generateImage from "@/lib/image-generator/generateImage";
import updatePreviewSize from "@/lib/image-generator/updatePreviewSize";
import IUpdatePreview from "@/lib/interface/IUpdatePreview";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import { useEffect, useRef } from "react";

const ImageGenerator = () => {
  const width = useImageGeneratorStore((s) => s.settings.dimension.width);
  const height = useImageGeneratorStore((s) => s.settings.dimension.height);
  const imageGeneratorStore = useImageGeneratorStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const updatePreviewObject: IUpdatePreview = {
    containerRef,
    previewRef,
    imageRef,
    imageGeneratorStore,
  };

  useEffect(() => {
    updatePreviewSize(updatePreviewObject);
    window.addEventListener("resize", () =>
      updatePreviewSize(updatePreviewObject)
    );
    return () =>
      window.removeEventListener("resize", () =>
        updatePreviewSize(updatePreviewObject)
      );
  }, [width, height]);

  return (
    <div className="flex h-full p-8">
      <Sidebar generateImage={() => generateImage(updatePreviewObject)} />
      <Preview
        containerRef={containerRef}
        previewRef={previewRef}
        imageRef={imageRef}
      />
    </div>
  );
};

export default ImageGenerator;
