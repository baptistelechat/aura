"use client";
import Preview from "@/app/image-generator/_components/preview/Preview";
import Sidebar from "@/app/image-generator/_components/sidebar/Sidebar";
import { browsers } from "@/lib/constant/browsers";
import { hotkeys } from "@/lib/constant/hotkeys";
import { useCustomHotKey } from "@/lib/hooks/useCustomHotKey";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { updatePreviewSize } from "@/lib/utils/image-generator/updatePreviewSize";
import { validateWatermark } from "@/lib/utils/image-generator/validateWatermark";
import { MonitorSmartphone } from "lucide-react";
import Image from "next/image";
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

  if (!isDesktop) {
    return (
      <div className="relative flex size-full gap-8 p-8">
        <div className="flex size-full flex-col items-center justify-center gap-4">
          <MonitorSmartphone className="size-40" />
          <p className="text-center text-3xl font-bold">
            For the best experience, please use Aura on a desktop browser.
          </p>
          <p className="text-center text-lg text-muted-foreground">
            Mobile and small devices are not supported, and some browsers are
            not yet compatible.
          </p>
          <p className="text-center text-lg text-muted-foreground">
            Meanwhile, we recommend using one of the desktop browsers suggested
            below.
          </p>
          <div className="flex items-center justify-center gap-4">
            {browsers.map((browser) => (
              <div
                key={browser.name.toLowerCase()}
                className="flex flex-col items-center justify-center gap-2"
              >
                <Image
                  src={browser.logo}
                  alt={browser.name}
                  width={40}
                  height={40}
                />
                <p className="text-sm font-medium" style={{ color: browser.color }}>
                  {browser.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
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
