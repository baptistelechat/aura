import CustomAccordionItem from "@/components/CustomAccordionItem";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { Circle, CircleDashed, CircleDotDashed } from "lucide-react";
import Control from "@/components/Control";

const BackgroundBlur = () => {
  const blur = useImageGeneratorStore((s) => s.settings.background.blur);
  const setBackground = useImageGeneratorStore((s) => s.setBackground);
  const defaultValue = defaultImageGeneratorSettings.background.blur

  return (
    <CustomAccordionItem
      title={"Blur"}
      icon={<CircleDotDashed className="size-4" />}
      disabled={blur === defaultValue}
      reset={()=> setBackground({blur: defaultValue})}
    >
      <Control
        title={"blur"}
        value={blur}
        setValue={setBackground}
        updateKey={"blur"}
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
