import SidebarSection from "@/components/image-generator/SidebarSection";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import tailwindColors from "@/lib/constant/tailwindColors";
import useImageGeneratorStore, {
  defaultSettings,
} from "@/lib/store/imageGenerator.store";
import { Palette } from "lucide-react";

const TailwindColor = () => {
  const backgroundColor = useImageGeneratorStore(
    (s) => s.settings.background.backgroundColor
  );
  const tailwindColor = useImageGeneratorStore(
    (s) => s.settings.background.tailwindColor
  );
  const setBackgroundColor = useImageGeneratorStore(
    (s) => s.setBackgroundColor
  );
  const setTailwindColor = useImageGeneratorStore((s) => s.setTailwindColor);
  const resetBackground = useImageGeneratorStore((s) => s.resetBackground);

  const handleColorChange = (
    backgroundColor: string,
    tailwindColor: string
  ) => {
    setBackgroundColor(backgroundColor);
    setTailwindColor(tailwindColor);
  };

  return (
    <SidebarSection
      title={"Tailwind Color"}
      icon={<Palette className="size-4" />}
      disabled={backgroundColor === defaultSettings.background.backgroundColor}
      reset={resetBackground}
    >
      <div className="flex flex-col gap-4">
        <Label className="text-primary/40">Solid color</Label>
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
                              handleColorChange(hex, `${colorName}-${shade}`)
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
      </div>
    </SidebarSection>
  );
};

export default TailwindColor;
