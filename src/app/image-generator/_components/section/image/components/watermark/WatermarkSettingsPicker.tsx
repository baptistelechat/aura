import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { watermarkSettings } from "@/lib/constant/watermarkSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { cn } from "@/lib/utils";
import { Ban, Check } from "lucide-react";

interface IWatermarkSettingsPickerProps {
  variant: "position" | "background" | "foreground";
}

const WatermarkSettingsPicker = ({
  variant,
}: IWatermarkSettingsPickerProps) => {
  const watermarkPosition = useImageGeneratorStore(
    (s) => s.settings.watermark.position
  );
  const background = useImageGeneratorStore(
    (s) => s.settings.watermark.background
  );
  const foreground = useImageGeneratorStore(
    (s) => s.settings.watermark.foreground
  );

  const setWatermarkPosition = useImageGeneratorStore(
    (s) => s.setWatermarkPosition
  );
  const setWatermarkBackground = useImageGeneratorStore(
    (s) => s.setWatermarkBackground
  );
  const setWatermarkForeground = useImageGeneratorStore(
    (s) => s.setWatermarkForeground
  );

  const handleClick = (value: any) => {
    if (variant === "position") {
      setWatermarkPosition(
        value as "top-left" | "top-right" | "bottom-left" | "bottom-right"
      );
    } else if (value !== background || value !== foreground) {
      if (variant === "background") {
        setWatermarkBackground(
          value as "light" | "dark" | "color-light" | "color-dark"
        );
      } else if (variant === "foreground") {
        setWatermarkForeground(
          value as "light" | "dark" | "color-light" | "color-dark"
        );
      }
    }
  };

  return (
    <div className="flex w-fit flex-col gap-4">
      <Label>
        {variant === "position"
          ? "Position"
          : variant === "background"
          ? "Background"
          : "Foreground"}
      </Label>
      <div className="flex flex-col gap-1">
        {watermarkSettings[variant]
          .reduce((rows, { name, icon }, index) => {
            if (index % 2 === 0) rows.push([]);
            rows[rows.length - 1].push(
              <Tooltip key={name}>
                <TooltipTrigger asChild>
                  {variant === "position" ? (
                    <Button
                      disabled={name === watermarkPosition}
                      variant="outline"
                      size="icon"
                      onClick={() => handleClick(name)}
                    >
                      {icon}
                    </Button>
                  ) : (
                    <div
                      onClick={() => handleClick(name)}
                      className={cn(
                        "size-10 rounded-md border border-input flex items-center justify-center",
                        name === background || name === foreground
                          ? "hover:cursor-not-allowed"
                          : "hover:cursor-pointer",
                        typeof icon === "string" && icon.includes("#")
                          ? `bg-[${icon}]`
                          : `bg-${icon}`
                      )}
                    >
                      {(variant === "background" && name === background) ||
                      (variant === "foreground" && name === foreground) ? (
                        <Check
                          className="size-4"
                          color={name !== "light" ? "white" : "black"}
                        />
                      ) : name === background ||
                        name === foreground ? (
                        <Ban
                          className="size-4"
                          color={name !== "light" ? "white" : "black"}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {name.split("-")[0].charAt(0).toUpperCase() +
                      name.split("-")[0].slice(1)}{" "}
                    {name.split("-")[1]
                      ? name.split("-")[1]?.charAt(0).toUpperCase() +
                        name.split("-")[1]?.slice(1)
                      : ""}
                  </p>
                </TooltipContent>
              </Tooltip>
            );
            return rows;
          }, [] as JSX.Element[][])
          .map((row, i) => (
            <div key={i} className="flex gap-1">
              {row}
            </div>
          ))}
      </div>
    </div>
  );
};

export default WatermarkSettingsPicker;
