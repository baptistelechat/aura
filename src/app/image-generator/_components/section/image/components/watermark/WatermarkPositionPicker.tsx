import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";

const watermarkPositions = [
  { position: "top-left", label: "Top Left" },
  { position: "top-right", label: "Top Right" },
  { position: "bottom-left", label: "Bottom Left" },
  { position: "bottom-right", label: "Bottom Right" },
];

const WatermarkPositionPicker = () => {
  const watermarkPosition = useImageGeneratorStore(
    (s) => s.settings.watermark.position
  );
  const setWatermarkPosition = useImageGeneratorStore(
    (s) => s.setWatermarkPosition
  );

  return (
    <div className="flex flex-col gap-2">
      {watermarkPositions
        .reduce((rows, { position, label }, index) => {
          if (index % 2 === 0) rows.push([]);
          rows[rows.length - 1].push(
            <Tooltip key={position}>
              <TooltipTrigger asChild>
                <Button
                  disabled={position === watermarkPosition}
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setWatermarkPosition(
                      position as
                        | "top-left"
                        | "top-right"
                        | "bottom-left"
                        | "bottom-right"
                    )
                  }
                >
                  {position.charAt(0).toUpperCase()}
                  {position.split("-")[1].charAt(0).toUpperCase()}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{label}</p>
              </TooltipContent>
            </Tooltip>
          );
          return rows;
        }, [] as JSX.Element[][])
        .map((row, i) => (
          <div key={i} className="flex gap-2">
            {row}
          </div>
        ))}
    </div>
  );
};

export default WatermarkPositionPicker;
