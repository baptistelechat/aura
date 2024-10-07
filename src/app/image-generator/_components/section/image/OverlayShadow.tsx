"use client";
import CustomAccordionItem from "@/components/CustomAccordionItem";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { Blend } from "lucide-react";
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
    images.push({
      id: i,
      name: `Layer-${i}.webp`,
      alt: `Shadow Layer ${i}`,
    });
  }
  return images;
};

const OverlayShadow = () => {
  const name = useImageGeneratorStore(s=> s.settings.overlay.name);
  const opacity = useImageGeneratorStore(s=> s.settings.overlay.opacity);

  const setName = useImageGeneratorStore(s=> s.setOverlayName);
  // const setOpacity = useImageGeneratorStore(s=> s.setOverlayOpacity);

  const resetOverlay = useImageGeneratorStore(s=> s.resetOverlay);

  const shadows = useMemo(() => generateShadowImages(11, 111), []);
  const defaultOverlaySettings = defaultImageGeneratorSettings.overlay;

  return (
    <CustomAccordionItem
      title={"Overlay Shadow"}
      icon={<Blend className="size-4" />}
      disabled={
        name === defaultOverlaySettings.name &&
        opacity === defaultOverlaySettings.opacity
      }
      reset={resetOverlay}
    >
      <div className="flex w-full flex-col gap-4">
        <div className="grid grid-cols-3 gap-2">
          {shadows.map((shadow) => (
            <div key={shadow.id} className="relative">
              <Image
                src={`/textures/shadow-overlays/thumbnails/${shadow.name}`}
                alt={shadow.alt}
                width={100}
                height={100}
                quality={30}
                className="cursor-pointer rounded"
                onClick={()=> setName(shadow.name)}
                layout="responsive"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </CustomAccordionItem>
  );
};

export default OverlayShadow;
