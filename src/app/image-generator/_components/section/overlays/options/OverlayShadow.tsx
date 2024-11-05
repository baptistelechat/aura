"use client";
import Control from "@/components/Control";
import CustomAccordionItem from "@/components/CustomAccordionItem";
import ImageSelect from "@/components/ImageSelect";
import { Separator } from "@/components/ui/separator";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { Ghost, Moon, Sun, SunMoon } from "lucide-react";

const OverlayShadow = () => {
  const overlay = useImageGeneratorStore((s) => s.settings.overlay.name);
  const opacity = useImageGeneratorStore((s) => s.settings.overlay.opacity);

  const setOverlay = useImageGeneratorStore((s) => s.setOverlay);
  const defaultValue = defaultImageGeneratorSettings.overlay;

  return (
    <CustomAccordionItem
      title={"Shadow"}
      icon={<Ghost className="size-4" />}
      disabled={
        overlay === defaultValue.name && opacity === defaultValue.opacity
      }
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
        <ImageSelect
          title={"Shadow"}
          path={"/images/overlays/shadow"}
          totalImages={100}
          currentImageName={overlay}
          mode={"overlay"}
        />
      </div>
    </CustomAccordionItem>
  );
};

export default OverlayShadow;
