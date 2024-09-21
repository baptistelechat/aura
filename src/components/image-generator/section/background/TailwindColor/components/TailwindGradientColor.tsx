import { Label } from "@/components/ui/label";
import gradientOrientations from "@/lib/constant/gradientOrientations";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import {
  TailwindLinearGradientOrientation,
  TailwindRadialGradientOrientation,
} from "@/lib/types/TailwindGradientOrientation";
import { Dices } from "lucide-react";
import TailwindColorPicker from "./TailwindColorPicker";
import TailwindGradientOrientation from "./TailwindGradientOrientationPicker";
import { Button } from "@/components/ui/button";

const TailwindGradientColor = () => {
  const orientation = useImageGeneratorStore(
    (s) => s.settings.background.tailwindGradient.orientation
  );
  const setOrientation = useImageGeneratorStore(
    (s) => s.setTailwindGradientOrientation
  );

  const getRandomGradient = () => {
    const variant = ["linear", "radial"][
      Math.floor(Math.random() * 2)
    ] as "linear" | "radial";

    const validOrientations = gradientOrientations[variant].filter(
      (o) => o.angle !== null && o.angle !== orientation
    );
    const randomIndex = Math.floor(Math.random() * validOrientations.length);
    
    setOrientation(
      validOrientations[randomIndex].angle as
        | TailwindLinearGradientOrientation
        | TailwindRadialGradientOrientation
    );
  };

  return (
    <>
        <Button
          variant="outline"
          size="lg"
          onClick={getRandomGradient}
        >
          <Dices className="mr-2 size-5" />
          Random gradient
        </Button>
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <Label className="text-primary/40">Linear</Label>
          <TailwindGradientOrientation variant={"linear"} />
        </div>
        <div className="flex flex-col gap-4">
          <Label className="text-primary/40">Radial</Label>
          <TailwindGradientOrientation variant={"radial"} />
        </div>
      </div>
      <Label className="text-primary/40">From</Label>
      <TailwindColorPicker action={"gradient-from"} />
      <Label className="text-primary/40">Via (Optional)</Label>
      <TailwindColorPicker action={"gradient-via"} />
      <Label className="text-primary/40">To</Label>
      <TailwindColorPicker action={"gradient-to"} />
    </>
  );
};

export default TailwindGradientColor;
