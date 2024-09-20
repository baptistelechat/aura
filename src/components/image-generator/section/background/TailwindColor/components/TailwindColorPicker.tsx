import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import tailwindColors from "@/lib/constant/tailwindColors";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import { Check } from "lucide-react";
import { useState } from "react";

interface ITailwindColorPickerProps {
  action: "solid" | "gradient-from" | "gradient-via" | "gradient-to";
}

const TailwindColorPicker = ({ action }: ITailwindColorPickerProps) => {
  const [tailwindColor, setTailwindColor] = useState("");

  const setBackgroundColor = useImageGeneratorStore(
    (s) => s.setBackgroundColor
  );
  const setFrom = useImageGeneratorStore((s) => s.setTailwindGradientFrom);
  const setVia = useImageGeneratorStore((s) => s.setTailwindGradientVia);
  const setTo = useImageGeneratorStore((s) => s.setTailwindGradientTo);

  const handleColorClick = (colorName: string, hex: string) => () => {
    setTailwindColor(colorName);
    if (action === "solid") {
      setBackgroundColor(hex);
      setFrom("");
      setVia("");
      setTo("");
    }
    if (action === "gradient-from") {
      setFrom(hex);
    }
    if (action === "gradient-via") {
      setVia(hex);
    }
    if (action === "gradient-to") {
      setTo(hex);
    }
  };

  const handleShadeClick = (colorName: string, hex: string) => () => {
    setTailwindColor(colorName);
    if (action === "solid") {
      setBackgroundColor(hex);
    }
    if (action === "gradient-from") {
      setFrom(hex);
    }
    if (action === "gradient-via") {
      setVia(hex);
    }
    if (action === "gradient-to") {
      setTo(hex);
    }
  };

  return (
    <>
      <div className="grid grid-cols-11 gap-1">
        {Object.entries(tailwindColors).map(([colorName, shades]) => {
          if (typeof shades === "object" && shades !== null) {
            return (
              <Tooltip key={`${colorName}`}>
                <TooltipTrigger>
                  <div
                    className="size-5 cursor-pointer rounded"
                    style={{ backgroundColor: shades[500] }}
                    onClick={handleColorClick(`${colorName}-500`, shades[500])}
                  >{colorName === tailwindColor.split("-")[0] ? (
                    <Check className="size-5" style={{ color: shades[50] }} />
                  ) : (
                    ""
                  )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{colorName}</p>
                </TooltipContent>
              </Tooltip>
            );
          }
          return null;
        })}
      </div>
      {tailwindColor !== "" ? (
        <div className="flex flex-col gap-2">
          <Label className="italic text-primary/40">
            {tailwindColor}
          </Label>
          <div className="grid grid-cols-11 gap-1">
            {Object.entries(tailwindColors)
              .filter(([name, shades]) => {
                if (typeof shades === "object" && shades !== null) {
                  return name === tailwindColor.split("-")[0];
                }
                return false;
              })
              .map(([colorName, shades]) => {
                if (typeof shades === "object" && shades !== null) {
                  return Object.entries(shades).map(([shade, hex]) => (
                    <Tooltip key={`${colorName}-${shade}`}>
                      <TooltipTrigger>
                        <div
                          className="size-5 cursor-pointer rounded"
                          style={{ backgroundColor: hex }}
                          onClick={handleShadeClick(
                            `${colorName}-${shade}`,
                            hex
                          )}
                        >
                          {`${colorName}-${shade}` === tailwindColor ? (
                            <Check
                              className="size-5"
                              style={{ color: Number(shade) >= 500 ? shades[50] : shades[950] }}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{`${colorName}-${shade}`}</p>
                      </TooltipContent>
                    </Tooltip>
                  ));
                }
                return null;
              })}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default TailwindColorPicker;
