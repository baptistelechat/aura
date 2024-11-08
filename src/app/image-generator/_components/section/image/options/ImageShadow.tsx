import CustomAccordionItem from "@/components/image-generator/CustomAccordionItem";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { LampDesk, Moon, Sun, SunMoon } from "lucide-react";
import Control from "@/components/image-generator/Control";

const ImageShadow = () => {
  const shadow = useImageGeneratorStore((s) => s.settings.image.shadow);
  const setImage = useImageGeneratorStore((s) => s.setImage);
  const defaultValue = defaultImageGeneratorSettings.image.shadow;

  return (
    <CustomAccordionItem
      title={"Shadow"}
      icon={<LampDesk className="size-4" />}
      disabled={shadow === defaultValue}
      reset={() => setImage({ shadow: defaultValue })}
    >
      <Control
        title={"opacity"}
        value={shadow}
        setValue={setImage}
        updateKey={"shadow"}
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
