"use client";
import Control from "@/components/Control";
import CustomAccordionItem from "@/components/CustomAccordionItem";
import { Separator } from "@/components/ui/separator";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { cn } from "@/lib/utils";
import { Ghost, Moon, Sun, SunMoon } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";

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

  const setOverlay = useImageGeneratorStore((s) => s.setOverlay);

  const shadows = useMemo(() => generateShadowImages(11, 111), []);
  const defaultValue = defaultImageGeneratorSettings.overlay;

  return (
    <CustomAccordionItem
      title={"Overlay Shadow"}
      icon={<Ghost className="size-4" />}
      disabled={name === defaultValue.name && opacity === defaultValue.opacity}
      reset={() =>
        setOverlay({ name: defaultValue.name, opacity: defaultValue.opacity })
      }
    >
      <div className="flex w-full flex-col gap-4">
        <Control
          title={"opacity"}
          value={opacity}
          setValue={setOverlay}
          updateKey={"opacity"}
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
                  `/images/textures/overlays-shadow/thumbnails/${shadow.name}` ===
                    name && "outline outline-2 outline-offset-0 outline-primary"
                )}
                onClick={() =>
                  setOverlay({
                    name: `/images/textures/overlays-shadow/thumbnails/${shadow.name}`,
                  })
                }
              >
                <Image
                  src={`/images/textures/overlays-shadow/thumbnails/${shadow.name}`}
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
