import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import { ChangeEvent } from "react";

interface ICustomColorPickerProps {
  action: "solid" | "gradient-from" | "gradient-via" | "gradient-to";
}

const CustomColorPicker = ({ action }: ICustomColorPickerProps) => {
  const backgroundColor = useImageGeneratorStore(
    (s) => s.settings.background.backgroundColor
  );
  const from = useImageGeneratorStore(
    (s) => s.settings.background.gradient.from
  );
  const via = useImageGeneratorStore((s) => s.settings.background.gradient.via);
  const to = useImageGeneratorStore((s) => s.settings.background.gradient.to);

  const setBackgroundColor = useImageGeneratorStore(
    (s) => s.setBackgroundColor
  );
  const setTailwindColor = useImageGeneratorStore((s) => s.setTailwindColor);
  const setUseVia = useImageGeneratorStore((s) => s.setUseVia);
  const setFrom = useImageGeneratorStore((s) => s.setGradientFrom);
  const setVia = useImageGeneratorStore((s) => s.setGradientVia);
  const setTo = useImageGeneratorStore((s) => s.setGradientTo);

  const currentColor =
    {
      solid: backgroundColor,
      "gradient-from": from.hex,
      "gradient-via": via.hex,
      "gradient-to": to.hex,
    }[action] || "";

  const setGradientColor = {
    "gradient-from": setFrom,
    "gradient-via": setVia,
    "gradient-to": setTo,
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (action === "solid") {
      setBackgroundColor(e.target.value);
      setTailwindColor("");
    } else {
      if (action === "gradient-via") {
        setUseVia(true);
      }
      setGradientColor[action]?.({ name: "", hex: e.target.value });
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {action === "solid" && (
        <Label className="text-primary/40">
          {currentColor}
        </Label>
      )}
      <Input
        type="color"
        value={currentColor}
        onChange={(e) => handleColorChange(e)}
        className="w-full"
      />
    </div>
  );
};

export default CustomColorPicker;
