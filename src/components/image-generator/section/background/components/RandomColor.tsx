import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

interface IRandomColorProps {
  variant: "custom" | "custom-gradient" | "tailwind-gradient";
  icon?: boolean;
}

const RandomColor = ({ variant, icon }: IRandomColorProps) => {
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
      variant === "custom-gradient"
        ? getRandomColor()
        : getRandomTailwindColor();
    const randomTo =
      variant === "custom-gradient"
        ? getRandomColor()
        : getRandomTailwindColor();

    setBackgroundColor(
      defaultImageGeneratorSettings.background.backgroundColor
    );
    setTailwindColor("");

    setFrom(randomFrom);
    setTo(randomTo);

    const shouldSetVia = Math.random() > 0.25;

    if (shouldSetVia) {
      const randomVia =
        variant === "custom-gradient"
          ? getRandomColor()
          : getRandomTailwindColor();
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

  const getCustomRandomColor = () => {
    const randomColor = getRandomColor();
    setBackgroundColor(randomColor.hex);
    setTailwindColor("");
  };

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          variant="outline"
          size={icon ? "icon" : "lg"}
          onClick={
            variant.includes("gradient")
              ? getRandomGradient
              : getCustomRandomColor
          }
          className="w-full px-2"
        >
          <Dices className={`${icon ? "" : "mr-2"} size-5`} />
          {icon
            ? ""
            : variant.includes("gradient")
            ? "Random gradient"
            : "Random color"}
        </Button>
      </TooltipTrigger>
      {icon && (
        <TooltipContent>
          <p>Get a random {variant === "custom" ? "color" : "gradient"}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export default RandomColor;
