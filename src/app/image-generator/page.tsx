"use client";
import Preview from "@/components/image-generator/Preview";
import Sidebar from "@/components/image-generator/Sidebar";
import generateImage from "@/lib/image-generator/generateImage";
import updatePreviewSize from "@/lib/image-generator/updatePreviewSize";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
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

  return (
    <div className="flex h-full p-8">
      <Sidebar
        generateImage={() => generateImage({ previewRef, width, height })}
      />
      <Preview containerRef={containerRef} previewRef={previewRef} />
    </div>
  );
};

export default ImageGenerator;
