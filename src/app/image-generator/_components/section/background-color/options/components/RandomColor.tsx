import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { setRandomCustomBackground } from "@/lib/utils/image-generator/setBackgroundColor/setRandomCustomBackground";
import { setRandomGradientBackground } from "@/lib/utils/image-generator/setBackgroundColor/setRandomGradientBackground";
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
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size={icon ? "icon" : "lg"}
          onClick={() =>
            variant.includes("gradient")
              ? setRandomGradientBackground(variant)
              : setRandomCustomBackground()
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
