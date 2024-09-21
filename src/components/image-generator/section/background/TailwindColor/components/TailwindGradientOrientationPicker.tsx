import { Button } from "@/components/ui/button";
import gradientOrientations from "@/lib/constant/gradientOrientations";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import {
  TailwindLinearGradientOrientation,
  TailwindRadialGradientOrientation,
} from "@/lib/types/TailwindGradientOrientation";


interface ITailwindGradientOrientationPickerProps {
  variant: "linear" | "radial";
}

const TailwindGradientOrientationPicker = ({
  variant,
}: ITailwindGradientOrientationPickerProps) => {
  const orientation = useImageGeneratorStore(
    (s) => s.settings.background.tailwindGradient.orientation
  );
  const setOrientation = useImageGeneratorStore(
    (s) => s.setTailwindGradientOrientation
  );

  return (
    <div className="flex flex-col gap-1">
      {gradientOrientations[variant]
        .reduce((rows, { angle, icon }, index) => {
          if (index % 3 === 0) rows.push([]);
          rows[rows.length - 1].push(
            <Button
              key={angle ?? "shuffle"}
              disabled={orientation === angle || angle === null}
              variant="outline"
              size="icon"
              onClick={() =>
                setOrientation(
                  angle as
                    | TailwindLinearGradientOrientation
                    | TailwindRadialGradientOrientation
                )
              }
            >
              {icon}
            </Button>
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

export default TailwindGradientOrientationPicker;
