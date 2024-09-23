import { Button } from "@/components/ui/button";
import defaultImageGeneratorSettings from "@/lib/constant/defaultImageGeneratorSettings";
import gradientOrientations from "@/lib/constant/gradientOrientations";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import {
  LinearGradientOrientation,
  RadialGradientOrientation,
} from "@/lib/types/gradientOrientation";
import getRandomColor from "@/lib/utils/colors/getRandomColor";
import getRandomTailwindColor from "@/lib/utils/colors/getRandomTailwindColor";
import { Dices } from "lucide-react";

interface IRandomGradientProps {
  variant: "custom" | "tailwind";
}

const RandomGradient = ({ variant }: IRandomGradientProps) => {
  const orientation = useImageGeneratorStore(
    (s) => s.settings.background.gradient.orientation
  );
  const setBackgroundColor = useImageGeneratorStore(
    (s) => s.setBackgroundColor
  );
  const setTailwindColor = useImageGeneratorStore((s) => s.setTailwindColor);
  const setUseVia = useImageGeneratorStore((s) => s.setUseVia);
  const setOrientation = useImageGeneratorStore(
    (s) => s.setGradientOrientation
  );
  const setFrom = useImageGeneratorStore((s) => s.setGradientFrom);
  const setVia = useImageGeneratorStore((s) => s.setGradientVia);
  const setTo = useImageGeneratorStore((s) => s.setGradientTo);

  const getRandomGradient = () => {
    const gradientType = ["linear", "radial"][Math.floor(Math.random() * 2)] as
      | "linear"
      | "radial";

    const validOrientations = gradientOrientations[gradientType].filter(
      (o) => o.angle !== null && o.angle !== orientation
    );
    const randomIndex = Math.floor(Math.random() * validOrientations.length);

    setOrientation(
      validOrientations[randomIndex].angle as
        | LinearGradientOrientation
        | RadialGradientOrientation
    );

    const randomFrom =
      variant === "custom" ? getRandomColor() : getRandomTailwindColor();
    const randomTo =
      variant === "custom" ? getRandomColor() : getRandomTailwindColor();

    setBackgroundColor(
      defaultImageGeneratorSettings.background.backgroundColor
    );
    setTailwindColor("");

    setFrom(randomFrom);
    setTo(randomTo);

    const shouldSetVia = Math.random() > 0.25;

    if (shouldSetVia) {
      const randomVia =
        variant === "custom" ? getRandomColor() : getRandomTailwindColor();
      setUseVia(true);
      setVia({
        name: randomVia.name,
        hex: randomVia.hex,
      });
    } else {
      setUseVia(false);
      setVia({
        name: "",
        hex: "",
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

export default RandomGradient;
