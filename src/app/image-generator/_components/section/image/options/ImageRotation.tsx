import Control from "@/components/Control";
import CustomAccordionItem from "@/components/CustomAccordionItem";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import {
  ImageIcon,
  RefreshCcw,
  RotateCcwSquare,
  RotateCwSquare,
} from "lucide-react";

const ImageRotation = () => {
  const scale = useImageGeneratorStore((s) => s.settings.image.scale);
  const setScale = useImageGeneratorStore((s) => s.setImageScale);
  const resetScale = useImageGeneratorStore((s) => s.resetImageScale);

  return (
    <CustomAccordionItem
      title={"Rotation"}
      icon={<RefreshCcw className="size-4" />}
      disabled={scale === defaultImageGeneratorSettings.image.scale}
      reset={resetScale}
    >
      <Control
        title={"rotate"}
        value={scale}
        setValue={setScale}
        min={-180}
        max={180}
        step={1}
        minIcon={<RotateCcwSquare className="size-5" />}
        middleIcon={<ImageIcon className="size-5" />}
        maxIcon={<RotateCwSquare className="size-5" />}
      />
    </CustomAccordionItem>
  );
};

export default ImageRotation;
