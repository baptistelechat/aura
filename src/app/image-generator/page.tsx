"use client";
import Preview from "@/components/image-generator/Preview";
import Sidebar from "@/components/image-generator/Sidebar";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import updatePreviewSize from "@/lib/utils/image-generator/updatePreviewSize";
import { MonitorSmartphone } from "lucide-react";
import { useEffect, useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";

const ImageGenerator = () => {
  useHotkeys("ctrl+s", (event:any) => {
    event.preventDefault();
    console.log("Document sauvegardé");
  });

  useHotkeys("ctrl+c", (event:any) => {
    event.preventDefault();
    console.log("Contenu copié");
  });

  useHotkeys("ctrl+v", (event:any) => {
    event.preventDefault();
    console.log("Contenu collé");
  });

  const width = useImageGeneratorStore((s) => s.settings.dimension.width);
  const height = useImageGeneratorStore((s) => s.settings.dimension.height);
  const refs = useImageGeneratorStore((s) => s.refs);
  const setRefs = useImageGeneratorStore((s) => s.setRefs);

  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setRefs({
      containerRef,
      previewRef,
      imageRef,
    });
  }, [setRefs]);

  useEffect(() => {
    updatePreviewSize(useImageGeneratorStore.getState());
    window.addEventListener("resize", () =>
      updatePreviewSize(useImageGeneratorStore.getState())
    );
    return () =>
      window.removeEventListener("resize", () =>
        updatePreviewSize(useImageGeneratorStore.getState())
      );
  }, [width, height, refs]);

  return (
    <div className="flex size-full gap-8 p-8">
      <div className="hidden w-full gap-4 md:flex">
        <Sidebar />
        <Preview
          containerRef={containerRef}
          previewRef={previewRef}
          imageRef={imageRef}
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
