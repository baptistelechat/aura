import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { tailwindColors } from "@/lib/constant/tailwindColors";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { Check } from "lucide-react";

interface ITailwindColorPickerProps {
  action: "solid" | "gradient-from" | "gradient-via" | "gradient-to";
}

const TailwindColorPicker = ({ action }: ITailwindColorPickerProps) => {
  const tailwindColor = useImageGeneratorStore(
    (s) => s.settings.background.tailwindColor
  );
  const gradient = useImageGeneratorStore(
    (s) => s.settings.background.gradient
  );

  const setBackground = useImageGeneratorStore((s) => s.setBackground);

  const currentColor =
    {
      solid: tailwindColor,
      "gradient-from": gradient.from.name,
      "gradient-via": gradient.via.name,
      "gradient-to": gradient.to.name,
    }[action] || "";

  const handleColorClick = (colorName: string, hex: string) => () => {
    const isCurrentColor = currentColor === colorName;

    const resetGradient = () => {
      setBackground({
        gradient: defaultImageGeneratorSettings.background.gradient,
      });
    };

    const updateColors = (name: string, hexValue: string) => {
      setBackground({
        backgroundColor: hexValue,
        tailwindColor: name,
        backgroundImage: null,
      });
    };

    const resetColors = () => {
      setBackground({
        backgroundColor:
          defaultImageGeneratorSettings.background.backgroundColor,
        backgroundImage: null,
        tailwindColor: "",
      });
    };

    if (action === "solid") {
      resetGradient();
      isCurrentColor ? resetColors() : updateColors(colorName, hex);
    } else {
      let updatedFrom = gradient.from;
      let updatedVia = gradient.via;
      let updatedTo = gradient.to;

      if (isCurrentColor) {
        setBackground({
          gradient: {
            ...gradient,
          }});

        if (action === "gradient-from") updatedFrom = { name: "", hex: "" };
        if (action === "gradient-via") updatedVia = { name: "", hex: "" };
        if (action === "gradient-to") updatedTo = { name: "", hex: "" };

        if (
          updatedFrom.name === "" &&
          updatedVia.name === "" &&
          updatedTo.name === ""
        ) {
          resetColors();
        } else {
          const color = updatedFrom.name || updatedVia.name || updatedTo.name;
          const colorHex = updatedFrom.hex || updatedVia.hex || updatedTo.hex;
          updateColors(color, colorHex);
        }
      } else {
        const newColor = { name: colorName, hex };

        setBackground({
          tailwindColor: "",
          gradient: {
            ...gradient,
            useVia : action === "gradient-via" ? true : gradient.useVia,
            from : action === "gradient-from" ? newColor : gradient.from,
            via : action === "gradient-via" ? newColor : gradient.via,
            to : action === "gradient-to" ? newColor : gradient.to,
          },
        });

        if (action === "gradient-from") updatedFrom = newColor;
        if (action === "gradient-via") updatedVia = newColor;
        if (action === "gradient-to") updatedTo = newColor;

        const color = updatedFrom.name || updatedVia.name || updatedTo.name;
        const colorHex = updatedFrom.hex || updatedVia.hex || updatedTo.hex;
        updateColors(color, colorHex);
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
                <TooltipTrigger asChild>
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
        <div className="flex flex-col gap-1">
          <Label className="italic">{currentColor}</Label>
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
