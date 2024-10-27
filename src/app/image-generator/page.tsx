"use client";
import Preview from "@/app/image-generator/_components/Preview";
import Sidebar from "@/app/image-generator/_components/Sidebar";
import { hotkeys } from "@/lib/constant/hotkeys";
import { useCustomHotKey } from "@/lib/hooks/useCustomHotKey";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { updatePreviewSize } from "@/lib/utils/image-generator/updatePreviewSize";
import { validateWatermark } from "@/lib/utils/image-generator/validateWatermark";
import { MonitorSmartphone } from "lucide-react";
import { useEffect } from "react";

const ImageGenerator = () => {
  useCustomHotKey(hotkeys);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const width = useImageGeneratorStore((s) => s.settings.dimension.width);
  const height = useImageGeneratorStore((s) => s.settings.dimension.height);
  const previewRefs = useImageGeneratorStore((s) => s.previewRefs);
  
  useEffect(() => {
    updatePreviewSize();
    window.addEventListener("resize", () => updatePreviewSize());
    return () =>
      window.removeEventListener("resize", () => updatePreviewSize());
  }, [width, height, previewRefs]);

  useEffect(() => {
    if (isDesktop) {
      const interval = setInterval(() => {
        if (!validateWatermark()) {
          clearInterval(interval);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isDesktop]);

  return (
    <div className="relative flex size-full gap-8 p-8">
      <div className="hidden w-full gap-4 md:flex">
        <Sidebar />
        <Preview />
      </div>
      <div className="flex size-full flex-col items-center justify-center gap-8 md:hidden">
        <MonitorSmartphone className="size-40" />
        <p className="text-center text-3xl font-bold">
          Aura is not available on mobile or small devices. Try using it on a
          desktop browser
        </p>
      </div>
    </div>
  );
};

export default ImageGenerator;
