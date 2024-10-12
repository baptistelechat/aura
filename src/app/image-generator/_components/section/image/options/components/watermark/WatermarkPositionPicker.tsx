import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import {
  ArrowDownLeft,
  ArrowDownRight,
  ArrowUpLeft,
  ArrowUpRight,
} from "lucide-react";

const position = [
  { name: "top-left", icon: <ArrowUpLeft className="size-4" /> },
  { name: "top-right", icon: <ArrowUpRight className="size-4" /> },
  { name: "bottom-left", icon: <ArrowDownLeft className="size-4" /> },
  { name: "bottom-right", icon: <ArrowDownRight className="size-4" /> },
];

const WatermarkPositionPicker = () => {
  const watermarkPosition = useImageGeneratorStore(
    (s) => s.settings.watermark.position
  );

  const setWatermarkPosition = useImageGeneratorStore(
    (s) => s.setWatermarkPosition
  );

  return (
    <div className="flex w-fit flex-col gap-4">
      <Label>Position</Label>
      <div className="flex flex-col gap-1">
        {position
          .reduce((rows, { name, icon }, index) => {
            if (index % 2 === 0) rows.push([]);
            rows[rows.length - 1].push(
              <Tooltip key={name}>
                <TooltipTrigger asChild>
                  <Button
                    disabled={name === watermarkPosition}
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setWatermarkPosition(
                        name as
                          | "top-left"
                          | "top-right"
                          | "bottom-left"
                          | "bottom-right"
                      )
                    }
                  >
                    {icon}
                  </Button>
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

export default WatermarkPositionPicker;
