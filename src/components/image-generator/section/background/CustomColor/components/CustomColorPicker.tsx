import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import defaultImageGeneratorSettings from "@/lib/constant/defaultImageGeneratorSettings";
import transparentBackgroundStyle from "@/lib/constant/transparentBackgroundStyle";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import { ChangeEvent } from "react";
import RandomColor from "../../components/RandomColor";

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

  const handleTransparentClick = () => {
    if (action === "gradient-via") {
      setVia(defaultImageGeneratorSettings.background.gradient.via);
      setUseVia(true);
    } else {
      setBackgroundColor(
        defaultImageGeneratorSettings.background.backgroundColor
      );
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {action === "solid" && (
        <Label className="text-primary/40">
          {currentColor === "" ? "Transparent" : currentColor}
        </Label>
      )}
      <div className="flex gap-2">
        <Input
          id={action}
          type="color"
          value={currentColor}
          onChange={(e) => handleColorChange(e)}
          className={`${currentColor === "" ? "hidden" : "flex"} w-full`}
        />
        <div
          className={`${
            currentColor === "" ? "flex" : "hidden"
          } h-10 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm ring-offset-background`}
          onClick={() => handleTransparentClick()}
        >
          <div
            className="size-full border border-input"
            style={{
              backgroundImage: transparentBackgroundStyle,
              backgroundSize: "14px 14px",
              backgroundPosition: "0 0, 7px 7px",
            }}
          />
        </div>
        {action === "solid" && <RandomColor variant={"custom"} icon />}
      </div>
    </div>
  );
};

export default CustomColorPicker;
