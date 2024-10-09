import CustomAccordionItem from "@/components/CustomAccordionItem";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { LampDesk, Moon, Sun, SunMoon } from "lucide-react";
import Control from "@/components/Control";

const ImageShadow = () => {
  const shadow = useImageGeneratorStore((s) => s.settings.image.shadow);
  const setShadow = useImageGeneratorStore((s) => s.setImageShadow);
  const resetShadow = useImageGeneratorStore((s) => s.resetImageShadow);

  return (
    <CustomAccordionItem
      title={"Shadow"}
      icon={<LampDesk className="size-4" />}
      disabled={shadow === defaultImageGeneratorSettings.image.shadow}
      reset={resetShadow}
    >
      <Control
        title={"opacity"}
        value={shadow}
        setValue={setShadow}
        min={0}
        max={1}
        step={0.05}
        minIcon={<Moon className="size-5" />}
        middleIcon={<SunMoon className="size-5" />}
        maxIcon={<Sun className="size-5" />}
      />
    </CustomAccordionItem>
  );
};

export default ImageShadow;
