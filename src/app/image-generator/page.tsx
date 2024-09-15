"use client";
import Preview from "@/components/image-generator/Preview";
import Sidebar from "@/components/image-generator/Sidebar";
import generateImage from "@/lib/image-generator/generateImage";
import updatePreviewSize from "@/lib/image-generator/updatePreviewSize";
import IUpdatePreview from "@/lib/interface/IUpdatePreview";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import { MonitorSmartphone } from "lucide-react";
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
  }, [width, height]);

  return (
    <div className="flex gap-8 size-full p-8">
      <div className="hidden w-full gap-4 md:flex">
        <Sidebar generateImage={() => generateImage(updatePreviewObject)} />
        <Preview
          containerRef={containerRef}
          previewRef={previewRef}
          imageRef={imageRef}
        />
      </div>
      <div className="size-full flex flex-col gap-8 items-center justify-center md:hidden">
        <MonitorSmartphone className="size-40" />
        <p className="text-3xl font-bold text-center">
          This tool is not available on mobile or small devices. Try using it on
          a desktop browser
        </p>
      </div>
    </div>
  );
};

export default ImageGenerator;
