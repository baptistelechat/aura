import { Minus, Plus, Scale } from "lucide-react";
import { ReactElement } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";

interface IControlProps {
  title: string;
  value: number;
  setValue: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  minIcon?: ReactElement;
  middleIcon?: ReactElement;
  maxIcon?: ReactElement;
}

const Control = ({
  title,
  value,
  setValue,
  min = 0,
  max = 100,
  step = 1,
  minIcon,
  middleIcon,
  maxIcon,
}: IControlProps) => {
  return (
    <div className="flex gap-2 px-1">
      <div className="flex w-full flex-col items-center gap-3">
        <div className="flex w-full items-center justify-between">
          <Label htmlFor="slider" className="text-primary/40">
            {title}
          </Label>
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="h-8 w-16"
            min={min}
            max={max}
            step={step}
          />
        </div>
        <Slider
          value={[value]}
          onValueChange={(newValue) => setValue(newValue[0])}
          min={min}
          max={max}
          step={step}
        />
        <div className="flex w-full justify-between">
          <Button
            disabled={value === min}
            variant="outline"
            size="icon"
            onClick={() => setValue(min)}
          >
            {minIcon ?? <Minus className="size-5" />}
          </Button>
          <Button
            disabled={value === (min + max) / 2}
            variant="outline"
            size="icon"
            onClick={() => setValue((min + max) / 2)}
          >
            {middleIcon ?? <Scale className="size-5" />}
          </Button>
          <Button
            disabled={value === max}
            variant="outline"
            size="icon"
            onClick={() => setValue(max)}
          >
            {maxIcon ?? <Plus className="size-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Control;
