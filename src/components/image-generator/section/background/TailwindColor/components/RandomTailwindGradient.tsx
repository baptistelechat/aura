import { Button } from "@/components/ui/button";
import gradientOrientations from "@/lib/constant/gradientOrientations";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import {
  TailwindLinearGradientOrientation,
  TailwindRadialGradientOrientation,
} from "@/lib/types/TailwindGradientOrientation";
import getRandomTailwindColor from "@/lib/utils/image-generator/getRandomTailwindColor";
import { Dices } from "lucide-react";

const RandomTailwindGradient = () => {
  const orientation = useImageGeneratorStore(
    (s) => s.settings.background.tailwindGradient.orientation
  );
  const setOrientation = useImageGeneratorStore(
    (s) => s.setTailwindGradientOrientation
  );
  const setFrom = useImageGeneratorStore((s) => s.setTailwindGradientFrom);
  const setVia = useImageGeneratorStore((s) => s.setTailwindGradientVia);
  const setTo = useImageGeneratorStore((s) => s.setTailwindGradientTo);

  const getRandomGradient = () => {
    const variant = ["linear", "radial"][Math.floor(Math.random() * 2)] as
      | "linear"
      | "radial";

    const validOrientations = gradientOrientations[variant].filter(
      (o) => o.angle !== null && o.angle !== orientation
    );
    const randomIndex = Math.floor(Math.random() * validOrientations.length);

    setOrientation(
      validOrientations[randomIndex].angle as
        | TailwindLinearGradientOrientation
        | TailwindRadialGradientOrientation
    );

    const randomFrom = getRandomTailwindColor();
    const randomTo = getRandomTailwindColor();
    
    setFrom(randomFrom);
    setTo(randomTo);
    
    const shouldSetVia = Math.random() > 0.25;
    
    if (shouldSetVia) {
    const randomVia = getRandomTailwindColor();
    setVia(randomVia); 
  } else {
    setVia({
      name:"",
      hex:""
    });
  }
  };

  return (
    <Button variant="outline" size="lg" onClick={getRandomGradient}>
      <Dices className="mr-2 size-5" />
      Random gradient
    </Button>
  );
};

export default RandomTailwindGradient;
