import Control from "@/components/image-generator/Control";
import CustomAccordionItem from "@/components/image-generator/CustomAccordionItem";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { BoxSelect, Circle, Square, Squircle } from "lucide-react";

const ImageBorder = () => {
  const borderRadius = useImageGeneratorStore(
    (s) => s.settings.image.borderRadius
  );
  const setImage = useImageGeneratorStore((s) => s.setImage);
  const defaultValue = defaultImageGeneratorSettings.image.borderRadius;

  return (
    <CustomAccordionItem
      title={"Border"}
      icon={<BoxSelect className="size-4" />}
      disabled={borderRadius === defaultValue}
      reset={() =>
        setImage({
          borderRadius: defaultValue,
        })
      }
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
