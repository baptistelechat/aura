import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import tailwindColors from "@/lib/constant/tailwindColors";
import { useState } from "react";

interface ITailwindColorPickerProps {
  action: (value:string) => void;
}

const TailwindColorPicker = ({action}:ITailwindColorPickerProps) => {
  const [tailwindColor, setTailwindColor] = useState("")

  return (
    <>
      <div className="grid grid-cols-11 gap-1">
        {Object.entries(tailwindColors).map(([colorName, shades]) => {
          if (typeof shades === "object" && shades !== null) {
            return (
              <Tooltip key={`${colorName}`}>
                <TooltipTrigger>
                  <div
                    className="size-4 cursor-pointer rounded"
                    style={{ backgroundColor: shades[500] }}
                    onClick={() => setTailwindColor(colorName)}
                  />
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
            {tailwindColor.split("-")[0]}
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
                          className="size-4 cursor-pointer rounded"
                          style={{ backgroundColor: hex }}
                          onClick={() =>
                            action(hex)
                          }
                        />
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
