import Control from "@/components/Control";
import CustomAccordionItem from "@/components/CustomAccordionItem";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import {
  ImageIcon,
  Rotate3D,
  RotateCcwSquare,
  RotateCwSquare,
} from "lucide-react";

const ImageRotation = () => {
  const rotateX = useImageGeneratorStore((s) => s.settings.image.rotateX);
  const rotateY = useImageGeneratorStore((s) => s.settings.image.rotateY);
  const rotateZ = useImageGeneratorStore((s) => s.settings.image.rotateZ);

  const setRotateX = useImageGeneratorStore((s) => s.setImageRotateX);
  const setRotateY = useImageGeneratorStore((s) => s.setImageRotateY);
  const setRotateZ = useImageGeneratorStore((s) => s.setImageRotateZ);

  const resetRotate = useImageGeneratorStore((s) => s.resetImageRotate);

  return (
    <CustomAccordionItem
      title={"Rotation"}
      icon={<Rotate3D className="size-4" />}
      disabled={rotateX === defaultImageGeneratorSettings.image.rotateX ||rotateY === defaultImageGeneratorSettings.image.rotateY || rotateZ === defaultImageGeneratorSettings.image.rotateZ}
      reset={resetRotate}
    >
      <Control
        title={"rotateX"}
        value={rotateX}
        setValue={setRotateX}
        min={-180}
        max={180}
        step={1}
        minIcon={<RotateCcwSquare className="size-5" />}
        middleIcon={<ImageIcon className="size-5" />}
        maxIcon={<RotateCwSquare className="size-5" />}
        normalize={false}
      />
      <Control
        title={"rotateY"}
        value={rotateY}
        setValue={setRotateY}
        min={-180}
        max={180}
        step={1}
        minIcon={<RotateCcwSquare className="size-5" />}
        middleIcon={<ImageIcon className="size-5" />}
        maxIcon={<RotateCwSquare className="size-5" />}
        normalize={false}
      />
      <Control
        title={"rotateZ"}
        value={rotateZ}
        setValue={setRotateZ}
        min={-180}
        max={180}
        step={1}
        minIcon={<RotateCcwSquare className="size-5" />}
        middleIcon={<ImageIcon className="size-5" />}
        maxIcon={<RotateCwSquare className="size-5" />}
        normalize={false}
      />
    </CustomAccordionItem>
  );
};

export default ImageRotation;
