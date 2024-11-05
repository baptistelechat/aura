"use client";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { ColorTranslator } from "colortranslator";
import { Check } from "lucide-react";

interface IMagicColorProps {
  action: "solid" | "gradient-from" | "gradient-via" | "gradient-to";
}

const MagicColorPicker = ({ action }: IMagicColorProps) => {
  const backgroundColor = useImageGeneratorStore(
    (s) => s.settings.background.backgroundColor
  );
  const magicColor = useImageGeneratorStore(
    (s) => s.settings.background.magicColor
  );
  const gradient = useImageGeneratorStore(
    (s) => s.settings.background.gradient
  );

  const setBackground = useImageGeneratorStore(
    (s) => s.setBackground
  );

  const currentColor =
    {
      solid: backgroundColor,
      "gradient-from": gradient.from.hex,
      "gradient-via": gradient.via.hex,
      "gradient-to": gradient.to.hex,
    }[action] || "";

  const handleColorClick = (hex: string) => () => {
    if (action === "solid") {
      setBackground({
        backgroundColor: hex,
        tailwindColor: "",
      })
    } else {
      const newColor = { name: "", hex };

      setBackground({
        gradient: {
          ...gradient,
          useVia: action === "gradient-via" ? true : gradient.useVia,
          from: action === "gradient-from" ? newColor : gradient.from,
          via: action === "gradient-via" ? newColor : gradient.via,
          to: action === "gradient-to" ? newColor : gradient.to,
        },
      })
    }
  };

  const getIconColor = (color: string) => {
    const luminance = new ColorTranslator(color).L;
    const iconColor = new ColorTranslator(color).setL(luminance > 75 ? 25 : 90).HEX
    return iconColor
  };

  if (magicColor.length > 0) {
    return (
      <div className="flex w-full flex-col gap-4">
        {action === "solid" && (
          <Label>
            {magicColor.includes(currentColor) ? backgroundColor : "-"}
          </Label>
        )}
        <div className="grid grid-cols-11 gap-1">
          {magicColor.map((color, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className="flex size-5 cursor-pointer rounded"
                  onClick={handleColorClick(color)}
                  style={{
                    backgroundColor: color,
                  }}
                >
                  {color === currentColor && (
                    <Check className="size-5" color={getIconColor(color)} />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{color}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    );
  }

};

export default MagicColorPicker;
