import Control from "@/components/Control";
import CustomAccordionItem from "@/components/CustomAccordionItem";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { BoxSelect, Circle, Square, Squircle } from "lucide-react";

const ImageBorder = () => {
  const borderRadius = useImageGeneratorStore(
    (s) => s.settings.image.borderRadius
  );
  const setImage = useImageGeneratorStore((s) => s.setImage);
  const resetBorderRadius = useImageGeneratorStore(
    (s) => s.resetImageBorderRadius
  );

  return (
    <CustomAccordionItem
      title={"Border"}
      icon={<BoxSelect className="size-4" />}
      disabled={
        borderRadius === defaultImageGeneratorSettings.image.borderRadius
      }
      reset={resetBorderRadius}
    >
      <Control
        title={"border-radius"}
        value={borderRadius}
        setValue={setImage}
        updateKey={"borderRadius"}
        min={0}
        max={48}
        step={1}
        minIcon={<Square className="size-5" />}
        middleIcon={<Squircle className="size-5" />}
        maxIcon={<Circle className="size-5" />}
      />
    </CustomAccordionItem>
  );
};

export default ImageBorder;
