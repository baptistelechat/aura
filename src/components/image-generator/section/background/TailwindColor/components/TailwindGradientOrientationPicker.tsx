import { Button } from "@/components/ui/button";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import TailwindGradientOrientation from "@/lib/types/TailwindGradientOrientation";
import {
  ArrowDown,
  ArrowDownLeft,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpLeft,
  ArrowUpRight,
  Shuffle,
} from "lucide-react";
import { ReactElement } from "react";

const orientations: {
  angle: TailwindGradientOrientation | null;
  icon: ReactElement;
}[] = [
  { angle: 135, icon: <ArrowDownRight className="size-4" /> },
  { angle: 180, icon: <ArrowDown className="size-4" /> },
  { angle: 225, icon: <ArrowDownLeft className="size-4" /> },
  { angle: 90, icon: <ArrowRight className="size-4" /> },
  { angle: null, icon: <Shuffle className="size-4" /> },
  { angle: 270, icon: <ArrowLeft className="size-4" /> },
  { angle: 45, icon: <ArrowUpRight className="size-4" /> },
  { angle: 0, icon: <ArrowUp className="size-4" /> },
  { angle: 315, icon: <ArrowUpLeft className="size-4" /> },
];

const TailwindGradientOrientationPicker = () => {
  const orientation = useImageGeneratorStore(
    (s) => s.settings.background.tailwindGradient.orientation
  );
  const setOrientation = useImageGeneratorStore(
    (s) => s.setTailwindGradientOrientation
  );

  const generateRandomOrientation = () => {
    const currentOrientation = orientation;

    const validOrientations = orientations.filter(
      (orientation) =>
        orientation.angle !== null && orientation.angle !== currentOrientation
    ) as { angle: TailwindGradientOrientation }[];

    const randomIndex = Math.floor(Math.random() * validOrientations.length);

    setOrientation(validOrientations[randomIndex].angle);
  };

  return (
    <div className="flex flex-col gap-1">
      {orientations
        .reduce((rows, { angle, icon }, index) => {
          if (index % 3 === 0) rows.push([]);
          rows[rows.length - 1].push(
            <Button
              key={angle ?? "shuffle"}
              disabled={orientation === angle}
              variant="outline"
              size="icon"
              onClick={() => {
                if (angle === null) {
                  generateRandomOrientation();
                } else {
                  setOrientation(angle);
                }
              }}
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
