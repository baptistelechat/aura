import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import defaultImageGeneratorSettings from "@/lib/constant/defaultImageGeneratorSettings";
import tailwindColors from "@/lib/constant/tailwindColors";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import { Check } from "lucide-react";

interface ITailwindColorPickerProps {
  action: "solid" | "gradient-from" | "gradient-via" | "gradient-to";
}

const TailwindColorPicker = ({ action }: ITailwindColorPickerProps) => {
  const tailwindColor = useImageGeneratorStore(
    (s) => s.settings.background.tailwindColor
  );
  const from = useImageGeneratorStore(
    (s) => s.settings.background.tailwindGradient.from
  );
  const via = useImageGeneratorStore(
    (s) => s.settings.background.tailwindGradient.via
  );
  const to = useImageGeneratorStore(
    (s) => s.settings.background.tailwindGradient.to
  );

  const setTailwindColor = useImageGeneratorStore((s) => s.setTailwindColor);
  const setBackgroundColor = useImageGeneratorStore(
    (s) => s.setBackgroundColor
  );
  const setFrom = useImageGeneratorStore((s) => s.setTailwindGradientFrom);
  const setVia = useImageGeneratorStore((s) => s.setTailwindGradientVia);
  const setTo = useImageGeneratorStore((s) => s.setTailwindGradientTo);

  const currentColor =
    {
      solid: tailwindColor,
      "gradient-from": from.name,
      "gradient-via": via.name,
      "gradient-to": to.name,
    }[action] || "";

  const setGradientColor = {
    "gradient-from": setFrom,
    "gradient-via": setVia,
    "gradient-to": setTo,
  };

  const handleColorClick = (colorName: string, hex: string) => () => {
    const isCurrentColor = currentColor === colorName;

    if (action === "solid") {
      if (isCurrentColor) {
        setTailwindColor("");
        setBackgroundColor(
          defaultImageGeneratorSettings.background.backgroundColor
        );
      } else {
        setTailwindColor(colorName);
        setBackgroundColor(hex);
        setFrom({ name: "", hex: "" });
        setVia({ name: "", hex: "" });
        setTo({ name: "", hex: "" });
      }
    } else {
      let updatedFrom = from;
      let updatedVia = via;
      let updatedTo = to;

      if (isCurrentColor) {
        setGradientColor[action]?.({ name: "", hex: "" });

        if (action === "gradient-from") {
          updatedFrom = { name: "", hex: "" };
        }
        if (action === "gradient-via") {
          updatedVia = { name: "", hex: "" };
        }
        if (action === "gradient-to") {
          updatedTo = { name: "", hex: "" };
        }

        if (
          updatedFrom.name === "" &&
          updatedVia.name === "" &&
          updatedTo.name === ""
        ) {
          setBackgroundColor(
            defaultImageGeneratorSettings.background.backgroundColor
          ); 
        } else if (
          updatedFrom.name !== "" &&
          updatedTo.name === ""
        ) {
          setTailwindColor(updatedFrom.name);
          setBackgroundColor(updatedFrom.hex);
        } else if (
          updatedFrom.name === "" &&
          updatedVia.name !== "" &&
          updatedTo.name === ""
        ) {
          setTailwindColor(updatedVia.name); 
          setBackgroundColor(updatedVia.hex);
        } else if (
          updatedFrom.name === "" &&
          updatedTo.name !== ""
        ) {
          setTailwindColor(updatedTo.name); 
          setBackgroundColor(updatedTo.hex); 
        }
      } else {
        setGradientColor[action]?.({ name: colorName, hex });

        if (action === "gradient-from") updatedFrom = { name: colorName, hex };
        if (action === "gradient-via") updatedVia = { name: colorName, hex };
        if (action === "gradient-to") updatedTo = { name: colorName, hex };

        if (
          updatedFrom.name !== "" &&
          updatedVia.name === "" &&
          updatedTo.name === ""
        ) {
          setBackgroundColor(updatedFrom.hex);
        } else if (
          updatedFrom.name === "" &&
          updatedVia.name !== "" &&
          updatedTo.name === ""
        ) {
          setBackgroundColor(updatedVia.hex);
        } else if (
          updatedFrom.name === "" &&
          updatedVia.name === "" &&
          updatedTo.name !== ""
        ) {
          setBackgroundColor(updatedTo.hex);
        }
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-11 gap-1">
        {Object.entries(tailwindColors).map(([colorName, shades]) => {
          if (typeof shades === "object" && shades !== null) {
            return (
              <Tooltip key={colorName}>
                <TooltipTrigger>
                  <div
                    className="size-5 cursor-pointer rounded"
                    style={{ backgroundColor: shades[500] }}
                    onClick={handleColorClick(`${colorName}-500`, shades[500])}
                  >
                    {colorName === currentColor.split("-")[0] && (
                      <Check className="size-5" style={{ color: shades[50] }} />
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

      {currentColor && (
        <div className="flex flex-col gap-2">
          <Label className="italic text-primary/40">{currentColor}</Label>
          <div className="grid grid-cols-11 gap-1">
            {Object.entries(tailwindColors)
              .filter(([name]) => name === currentColor.split("-")[0])
              .map(([colorName, shades]) =>
                Object.entries(shades).map(([shade, hex]) => (
                  <Tooltip key={`${colorName}-${shade}`}>
                    <TooltipTrigger>
                      <div
                        className="size-5 cursor-pointer rounded"
                        style={{ backgroundColor: hex }}
                        onClick={handleColorClick(`${colorName}-${shade}`, hex)}
                      >
                        {`${colorName}-${shade}` === currentColor && (
                          <Check
                            className="size-5"
                            style={{
                              color:
                                Number(shade) >= 500 ? shades[50] : shades[950],
                            }}
                          />
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{`${colorName}-${shade}`}</p>
                    </TooltipContent>
                  </Tooltip>
                ))
              )}
          </div>
        </div>
      )}
    </>
  );
};

export default TailwindColorPicker;
