import CustomAccordionItem from "@/components/CustomAccordionItem";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { ImageDown, ImageIcon, ImageUp, Scaling } from "lucide-react";
import Control from "@/components/Control";

const ImageSize = () => {
  const scale = useImageGeneratorStore((s) => s.settings.image.scale);
  const setImage = useImageGeneratorStore((s) => s.setImage);
  const resetScale = useImageGeneratorStore((s) => s.resetImageScale);

  return (
    <CustomAccordionItem
      title={"Size"}
      icon={<Scaling className="size-4" />}
      disabled={scale === defaultImageGeneratorSettings.image.scale}
      reset={resetScale}
    >
      <Control
        title={"scale"}
        value={scale}
        setValue={setImage}
        updateKey={"scale"}
        min={0}
        max={1}
        step={0.05}
        minIcon={<ImageDown className="size-5" />}
        middleIcon={<ImageIcon className="size-5" />}
        maxIcon={<ImageUp className="size-5" />}
      />
    </CustomAccordionItem>
  );
};

export default ImageSize;
