"use client";
import Preview from "@/app/image-generator/_components/Preview";
import Sidebar from "@/app/image-generator/_components/Sidebar";
import { hotkeys } from "@/lib/constant/hotkeys";
import { useCustomHotKey } from "@/lib/hooks/useCustomHotKey";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { updatePreviewSize } from "@/lib/utils/image-generator/updatePreviewSize";
import { MonitorSmartphone } from "lucide-react";
import { useEffect, useRef } from "react";

const ImageGenerator = () => {
  useCustomHotKey(hotkeys);

  const width = useImageGeneratorStore((s) => s.settings.dimension.width);
  const height = useImageGeneratorStore((s) => s.settings.dimension.height);
  const refs = useImageGeneratorStore((s) => s.refs);
  const setRefs = useImageGeneratorStore((s) => s.setRefs);

  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLImageElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRefs({
      containerRef,
      previewRef,
      backgroundRef,
      imageRef,
      watermarkRef
    });
  }, [setRefs]);

  useEffect(() => {
    updatePreviewSize();
    window.addEventListener("resize", () => updatePreviewSize());
    return () =>
      window.removeEventListener("resize", () => updatePreviewSize());
  }, [width, height, refs]);

  return (
    <div className="flex size-full gap-8 p-8">
      <div className="hidden w-full gap-4 md:flex">
        <Sidebar />
        <Preview
          containerRef={containerRef}
          previewRef={previewRef}
          backgroundRef={backgroundRef}
          imageRef={imageRef}
          watermarkRef={watermarkRef}
        />
      </div>
      <div className="flex size-full flex-col items-center justify-center gap-8 md:hidden">
        <MonitorSmartphone className="size-40" />
        <p className="text-center text-3xl font-bold">
          This tool is not available on mobile or small devices. Try using it on
          a desktop browser
        </p>
      </div>
    </div>
  );
};

export default ImageGenerator;
