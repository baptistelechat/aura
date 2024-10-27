"use client";
import CustomAccordionItem from "@/components/CustomAccordionItem";
import { Separator } from "@/components/ui/separator";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { cn } from "@/lib/utils";
import { Ghost, Moon, Sun, SunMoon } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";
import Control from "@/components/Control";

type Shadow = {
  id: number;
  name: string;
  alt: string;
};

const generateShadowImages = (start: number, end: number): Shadow[] => {
  const images = [];
  for (let i = start; i <= end; i++) {
    if (i !== 53) {
      images.push({
        id: i,
        name: `Layer-${i}.webp`,
        alt: `Shadow Layer ${i}`,
      });
    }
  }
  return images;
};

const OverlayShadow = () => {
  const name = useImageGeneratorStore((s) => s.settings.overlay.name);
  const opacity = useImageGeneratorStore((s) => s.settings.overlay.opacity);

  const setName = useImageGeneratorStore((s) => s.setOverlayName);
  const setOpacity = useImageGeneratorStore((s) => s.setOverlayOpacity);

  const resetOverlay = useImageGeneratorStore((s) => s.resetOverlay);

  const shadows = useMemo(() => generateShadowImages(11, 111), []);
  const defaultOverlaySettings = defaultImageGeneratorSettings.overlay;

  return (
    <CustomAccordionItem
      title={"Overlay Shadow"}
      icon={<Ghost className="size-4" />}
      disabled={
        name === defaultOverlaySettings.name &&
        opacity === defaultOverlaySettings.opacity
      }
      reset={resetOverlay}
    >
      <div className="flex w-full flex-col gap-4">
        <Control
          title={"opacity"}
          value={opacity}
          setValue={setOpacity}
          min={0}
          max={1}
          step={0.05}
          minIcon={<Moon className="size-5" />}
          middleIcon={<SunMoon className="size-5" />}
          maxIcon={<Sun className="size-5" />}
        />
        <Separator />
        <div className="grid grid-cols-3 gap-2">
          {shadows.map((shadow) => (
            <div key={shadow.id}>
              <div
                className={cn(
                  "relative cursor-pointer rounded",
                  shadow.name === name &&
                    "outline outline-2 outline-offset-0 outline-primary"
                )}
                onClick={() =>
                  setName(`/textures/overlays-shadow/thumbnails/${shadow.name}`)
                }
              >
                <Image
                  src={`/textures/overlays-shadow/thumbnails/${shadow.name}`}
                  alt={shadow.alt}
                  width={100}
                  height={100}
                  quality={30}
                  className="rounded transition-all duration-300 ease-in-out dark:invert"
                  // layout="responsive"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </CustomAccordionItem>
  );
};

export default OverlayShadow;
