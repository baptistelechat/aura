import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { gradientOrientations } from "@/lib/constant/gradientOrientations";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import {
  LinearGradientOrientation,
  RadialGradientOrientation,
} from "@/lib/types/gradientOrientation";
import { getRandomColor } from "@/lib/utils/colors/getRandomColor";
import { getRandomTailwindColor } from "@/lib/utils/colors/getRandomTailwindColor";
import { Dices } from "lucide-react";

interface IRandomColorProps {
  variant:
    | "custom"
    | "custom-gradient"
    | "tailwind-gradient"
    | "magic-gradient";
  icon?: boolean;
}

const RandomColor = ({ variant, icon }: IRandomColorProps) => {
  const gradient = useImageGeneratorStore(
    (s) => s.settings.background.gradient
  );
  const magicColor = useImageGeneratorStore(
    (s) => s.settings.background.magicColor
  );
  const setBackground = useImageGeneratorStore((s) => s.setBackground);

  const getRandomMagicColor = () => {
    const randomMagicColor =
      magicColor[Math.floor(Math.random() * magicColor.length)];
    return {
      name: "",
      hex: randomMagicColor,
    };
  };

  const getRandomGradient = () => {
    const gradientType = ["linear", "radial"][Math.floor(Math.random() * 2)] as
      | "linear"
      | "radial";

    const validOrientations = gradientOrientations[gradientType].filter(
      (o) => o.angle !== null && o.angle !== gradient.orientation
    );
    const randomIndex = Math.floor(Math.random() * validOrientations.length);

    const randomFrom =
      variant === "custom-gradient"
        ? getRandomColor()
        : variant === "tailwind-gradient"
        ? getRandomTailwindColor()
        : getRandomMagicColor();

    const randomTo =
      variant === "custom-gradient"
        ? getRandomColor()
        : variant === "tailwind-gradient"
        ? getRandomTailwindColor()
        : getRandomMagicColor();

    const shouldSetVia = Math.random() > 0.25;

    if (shouldSetVia) {
      const randomVia =
        variant === "custom-gradient"
          ? getRandomColor()
          : variant === "tailwind-gradient"
          ? getRandomTailwindColor()
          : getRandomMagicColor();

      setBackground({
        backgroundColor:
          defaultImageGeneratorSettings.background.backgroundColor,
        backgroundImage: null,
        tailwindColor: "",
        gradient: {
          ...gradient,
          useVia: true,
          orientation: validOrientations[randomIndex].angle as
            | LinearGradientOrientation
            | RadialGradientOrientation,
          from: randomFrom,
          via: randomVia,
          to: randomTo,
        },
      });
    } else {
      setBackground({
        backgroundColor:
          defaultImageGeneratorSettings.background.backgroundColor,
        backgroundImage: null,
        tailwindColor: "",
        gradient: {
          ...gradient,
          useVia: false,
          orientation: validOrientations[randomIndex].angle as
            | LinearGradientOrientation
            | RadialGradientOrientation,
          from: randomFrom,
          via: {
            name: "",
            hex: "",
          },
          to: randomTo,
        },
      });
    }
  };

  const getCustomRandomColor = () => {
    const randomColor = getRandomColor();
    setBackground({
      backgroundColor: randomColor.hex,
      tailwindColor: "",
    });
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size={icon ? "icon" : "lg"}
          onClick={
            variant.includes("gradient")
              ? getRandomGradient
              : getCustomRandomColor
          }
          className="px-2"
        >
          <Dices className={`${icon ? "" : "mr-2"} size-4`} />
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
