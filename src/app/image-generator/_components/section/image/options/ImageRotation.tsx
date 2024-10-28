import Control from "@/components/Control";
import CustomAccordionItem from "@/components/CustomAccordionItem";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import {
  ArrowUpFromDot,
  Dot,
  Rotate3D,
  RotateCcwSquare,
  RotateCwSquare,
  Square,
  UndoDot,
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
      disabled={
        rotateX === defaultImageGeneratorSettings.image.rotateX &&
        rotateY === defaultImageGeneratorSettings.image.rotateY &&
        rotateZ === defaultImageGeneratorSettings.image.rotateZ
      }
      reset={resetRotate}
    >
      <Control
        title={"rotateX"}
        value={rotateX}
        setValue={setRotateX}
        min={-90}
        max={90}
        step={5}
        minIcon={<ArrowUpFromDot className="size-5 -scale-y-100" />}
        middleIcon={<Dot className="size-5" />}
        maxIcon={<ArrowUpFromDot className="size-5" />}
        normalize={false}
        extraStyle="mb-4"
      />
      <Control
        title={"rotateY"}
        value={rotateY}
        setValue={setRotateY}
        min={-90}
        max={90}
        step={5}
        minIcon={<UndoDot className="size-5 rotate-90 -scale-x-100" />}
        middleIcon={<Dot className="size-5" />}
        maxIcon={<UndoDot className="size-5 rotate-90" />}
        normalize={false}
        extraStyle="mb-4"
      />
      <Control
        title={"rotateZ"}
        value={rotateZ}
        setValue={setRotateZ}
        min={-180}
        max={180}
        step={5}
        minIcon={<RotateCcwSquare className="size-5" />}
        middleIcon={<Square className="size-5" />}
        maxIcon={<RotateCwSquare className="size-5" />}
        normalize={false}
      />
    </CustomAccordionItem>
  );
};

export default ImageRotation;
