import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import gradientOrientations from "@/lib/constant/gradientOrientations";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import {
  LinearGradientOrientation,
  RadialGradientOrientation,
} from "@/lib/types/gradientOrientation";
interface IGradientOrientationPickerProps {
  variant: "linear" | "radial";
}

const GradientOrientationPicker = ({
  variant,
}: IGradientOrientationPickerProps) => {
  const orientation = useImageGeneratorStore(
    (s) => s.settings.background.gradient.orientation
  );
  const setOrientation = useImageGeneratorStore(
    (s) => s.setGradientOrientation
  );

  return (
    <div className="flex flex-col gap-1">
      {gradientOrientations[variant]
        .reduce((rows, { angle, icon }, index) => {
          if (index % 3 === 0) rows.push([]);
          rows[rows.length - 1].push(
            <Tooltip>
              <TooltipTrigger>
                <Button
                  key={angle ?? "shuffle"}
                  disabled={orientation === angle || angle === null}
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setOrientation(
                      angle as
                        | LinearGradientOrientation
                        | RadialGradientOrientation
                    )
                  }
                >
                  {icon}
                </Button>
              </TooltipTrigger>
              {angle !== null && (
                <TooltipContent>
                  <p>
                    {typeof angle === "number"
                      ? `${angle}°`
                      : `${angle.charAt(0).toUpperCase()}${angle.slice(1)}`}
                  </p>
                </TooltipContent>
              )}
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
  );
};

export default GradientOrientationPicker;
