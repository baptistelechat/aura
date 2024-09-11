import { Circle, Minus, Plus, Scale, Squircle } from "lucide-react";
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

const Control = ({ title, value, setValue, min, max, step, minIcon, middleIcon, maxIcon }: IControlProps) => {
  return (
    <div className="flex gap-2 px-1">
      <div className="flex flex-col w-full items-center gap-3">
        <div className="w-full flex justify-between items-center">
          <Label htmlFor="slider" className="text-primary/40">
            {title}
          </Label>
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-16 h-8 "
            min={min ?? 0}
            max={max ?? 100}
            step={step ?? 1}
          />
        </div>
        <Slider
          value={[value]}
          onValueChange={(newValue) => setValue(newValue[0])}
          min={min ?? 0}
          max={max ?? 100}
          step={step ?? 1}
        />
        <div className="flex w-full justify-between">
          <Button
            disabled={value === min ?? 0}
            variant="outline"
            size="icon"
            onClick={() => setValue(min ?? 0)}
          >
            {minIcon ?? <Minus className="size-5" />}
          </Button>
          <Button
            disabled={value === ((min ?? 0) + (max ?? 100)) / 2}
            variant="outline"
            size="icon"
            onClick={() => setValue(((min ?? 0) + (max ?? 100)) / 2)}
          >
            {middleIcon ?? <Scale className="size-5" />}
          </Button>
          <Button
            disabled={value === max ?? 100}
            variant="outline"
            size="icon"
            onClick={() => setValue(max ?? 100)}
          >
            {maxIcon ?? <Plus className="size-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Control;
