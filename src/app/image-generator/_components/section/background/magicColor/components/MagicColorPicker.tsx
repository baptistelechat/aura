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

  const from = useImageGeneratorStore(
    (s) => s.settings.background.gradient.from
  );
  const via = useImageGeneratorStore((s) => s.settings.background.gradient.via);
  const to = useImageGeneratorStore((s) => s.settings.background.gradient.to);

  const setBackgroundColor = useImageGeneratorStore(
    (s) => s.setBackgroundColor
  );
  const setTailwindColor = useImageGeneratorStore((s) => s.setTailwindColor);
  const setUseVia = useImageGeneratorStore((s) => s.setUseVia);
  const setFrom = useImageGeneratorStore((s) => s.setGradientFrom);
  const setVia = useImageGeneratorStore((s) => s.setGradientVia);
  const setTo = useImageGeneratorStore((s) => s.setGradientTo);

  const currentColor =
    {
      solid: backgroundColor,
      "gradient-from": from.hex,
      "gradient-via": via.hex,
      "gradient-to": to.hex,
    }[action] || "";

  const setGradientColor = {
    "gradient-from": setFrom,
    "gradient-via": setVia,
    "gradient-to": setTo,
  };

  const handleColorClick = (hex: string) => () => {
    if (action === "solid") {
      setBackgroundColor(hex);
      setTailwindColor("");
    } else {
      if (action === "gradient-via") {
        setUseVia(true);
      }
      setGradientColor[action]?.({ name: "", hex });
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

  return <p>Load an image to get magic colors</p>;
};

export default MagicColorPicker;
