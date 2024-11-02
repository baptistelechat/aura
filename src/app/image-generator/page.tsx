"use client";
import Preview from "@/app/image-generator/_components/preview/Preview";
import Sidebar from "@/app/image-generator/_components/sidebar/Sidebar";
import { hotkeys } from "@/lib/constant/hotkeys";
import { useCustomHotKey } from "@/lib/hooks/useCustomHotKey";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { updatePreviewSize } from "@/lib/utils/image-generator/updatePreviewSize";
import { validateWatermark } from "@/lib/utils/image-generator/validateWatermark";
import { useEffect } from "react";
import UnsupportedDevice from "./_components/UnsupportedDevice";

const ImageGenerator = () => {
  useCustomHotKey(hotkeys);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isSafari = useImageGeneratorStore((s) => s.general.isSafari);

  const width = useImageGeneratorStore((s) => s.settings.dimension.width);
  const height = useImageGeneratorStore((s) => s.settings.dimension.height);
  const previewRefs = useImageGeneratorStore((s) => s.previewRefs);

  useEffect(() => {
    if (!isSafari) {
      updatePreviewSize();
      window.addEventListener("resize", () => updatePreviewSize());
      return () =>
        window.removeEventListener("resize", () => updatePreviewSize());
    }
  }, [width, height, previewRefs]);

  useEffect(() => {
    if (isDesktop && !isSafari) {
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

  if (!isDesktop || isSafari) {
    return (
      <UnsupportedDevice/>
    );
  }

  return (
    <div className="relative flex size-full gap-8 p-8">
      <div className="flex w-full gap-4">
        <Sidebar />
        <Preview />
      </div>
    </div>
  );
};

export default ImageGenerator;
