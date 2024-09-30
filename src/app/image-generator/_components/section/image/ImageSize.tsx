import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { ImageDown, ImageIcon, ImageUp, Proportions } from "lucide-react";
import Control from "../../Control";
import CustomAccordionItem from "@/components/CustomAccordionItem";

const ImageSize = () => {
  const scale = useImageGeneratorStore((s) => s.settings.image.scale);
  const setScale = useImageGeneratorStore((s) => s.setImageScale);
  const resetScale = useImageGeneratorStore((s) => s.resetImageScale);

  return (
    <CustomAccordionItem
      title={"Size"}
      icon={<Proportions className="size-4" />}
      disabled={scale === defaultImageGeneratorSettings.image.scale}
      reset={resetScale}
    >
      <Control
        title={"scale"}
        value={scale}
        setValue={setScale}
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
