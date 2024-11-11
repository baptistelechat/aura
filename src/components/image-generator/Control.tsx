import {
  BackgroundUpdate,
  ImageUpdate,
  OverlayUpdate,
} from "@/lib/store/imageGenerator.store";
import { cn } from "@/lib/utils";
import { Minus, Plus, Scale } from "lucide-react";
import { ReactElement } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";

interface IControlProps {
  title: string;
  value: number;
  setValue: (
    update: Partial<ImageUpdate & BackgroundUpdate> & OverlayUpdate
  ) => void;
  updateKey: keyof (ImageUpdate & BackgroundUpdate & OverlayUpdate);
  min?: number;
  max?: number;
  step?: number;
  minIcon?: ReactElement;
  middleIcon?: ReactElement;
  maxIcon?: ReactElement;
  normalize?: boolean;
  extraStyle?: string;
}

const Control = ({
  title,
  value,
  setValue,
  updateKey,
  min = 0,
  max = 100,
  step = 1,
  minIcon,
  middleIcon,
  maxIcon,
  normalize = true,
  extraStyle,
}: IControlProps) => {
  const coef = normalize ? 100 / (max - min) : 1;

  return (
    <div className={cn("flex gap-2", extraStyle)}>
      <div className="flex w-full flex-col items-center gap-3">
        <div className="flex w-full items-center justify-between">
          <Label>{title}</Label>
          <Input
            type="number"
            value={(value * coef).toFixed(0)}
            onChange={(e) =>
              setValue({
                [updateKey]: Number(e.target.value) / coef,
              })
            }
            className="h-8 w-16 pr-2"
            min={(min * coef).toFixed(0)}
            max={(max * coef).toFixed(0)}
            step={(step * coef).toFixed(0)}
          />
        </div>
        <Slider
          value={[value]}
          onValueChange={(newValue) => setValue({ [updateKey]: newValue[0] })}
          min={min}
          max={max}
          step={step}
        />
        <div className="flex w-full justify-between">
          <Button
            disabled={value === min}
            variant="outline"
            size="icon"
            onClick={() => setValue({ [updateKey]: min })}
          >
            {minIcon ?? <Minus className="size-5" />}
          </Button>
          <Button
            disabled={value === (min + max) / 2}
            variant="outline"
            size="icon"
            onClick={() => setValue({ [updateKey]: (min + max) / 2 })}
          >
            {middleIcon ?? <Scale className="size-5" />}
          </Button>
          <Button
            disabled={value === max}
            variant="outline"
            size="icon"
            onClick={() => setValue({ [updateKey]: max })}
          >
            {maxIcon ?? <Plus className="size-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Control;
