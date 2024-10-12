import CustomAccordionItem from "@/components/CustomAccordionItem";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { Circle, CircleDashed, CircleDotDashed } from "lucide-react";
import Control from "@/components/Control";

const BackgroundBlur = () => {
  const blur = useImageGeneratorStore((s) => s.settings.background.blur);
  const setBlur = useImageGeneratorStore((s) => s.setBackgroundBlur);
  const resetBlur = useImageGeneratorStore((s) => s.resetBackgroundBlur);

  return (
    <CustomAccordionItem
      title={"Blur"}
      icon={<CircleDotDashed className="size-4" />}
      disabled={blur === defaultImageGeneratorSettings.background.blur}
      reset={resetBlur}
    >
      <Control
        title={"blur"}
        value={blur}
        setValue={setBlur}
        min={0}
        max={64}
        step={1}
        minIcon={<Circle className="size-5" />}
        middleIcon={<CircleDotDashed className="size-5" />}
        maxIcon={<CircleDashed className="size-5" />}
      />
    </CustomAccordionItem>
  );
};

export default BackgroundBlur;
