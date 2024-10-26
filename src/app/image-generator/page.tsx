"use client";
import Preview from "@/app/image-generator/_components/Preview";
import Sidebar from "@/app/image-generator/_components/Sidebar";
import { hotkeys } from "@/lib/constant/hotkeys";
import { useCustomHotKey } from "@/lib/hooks/useCustomHotKey";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { cn } from "@/lib/utils";
import { updatePreviewSize } from "@/lib/utils/image-generator/updatePreviewSize";
import { validateWatermark } from "@/lib/utils/image-generator/validateWatermark";
import { MonitorSmartphone } from "lucide-react";
import { Gugi } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";

const gugi = Gugi({ weight: "400", subsets: ["latin"] });

const ImageGenerator = () => {
  const [isLoading, setIsLoading] = useState(true);
  useCustomHotKey(hotkeys);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const width = useImageGeneratorStore((s) => s.settings.dimension.width);
  const height = useImageGeneratorStore((s) => s.settings.dimension.height);
  const previewRefs = useImageGeneratorStore((s) => s.previewRefs);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    if (document.readyState === "complete") {
      setIsLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

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
      {isLoading && (
        <div className="absolute left-0 top-0 z-50 flex size-full items-center justify-center bg-background">
          <div className="flex animate-bounce-slow flex-col items-center justify-center gap-4">
            <Image src="/Logo.svg" alt="Logo" width={125} height={125} />
            <p
              className={cn("text-4xl font-bold text-primary", gugi.className)}
            >
              AURA
            </p>
          </div>
        </div>
      )}
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
