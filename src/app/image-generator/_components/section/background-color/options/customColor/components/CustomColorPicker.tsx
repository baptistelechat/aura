import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { transparentBackgroundStyle } from "@/lib/constant/transparentBackgroundStyle";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { ChangeEvent } from "react";
import RandomColor from "../../components/RandomColor";

interface ICustomColorPickerProps {
  action: "solid" | "gradient-from" | "gradient-via" | "gradient-to";
}

const CustomColorPicker = ({ action }: ICustomColorPickerProps) => {
  const backgroundColor = useImageGeneratorStore(
    (s) => s.settings.background.backgroundColor
  );
  const gradient = useImageGeneratorStore(
    (s) => s.settings.background.gradient
  );

  const setBackground = useImageGeneratorStore((s) => s.setBackground);

  const currentColor =
    {
      solid: backgroundColor,
      "gradient-from": gradient.from.hex,
      "gradient-via": gradient.via.hex,
      "gradient-to": gradient.to.hex,
    }[action] || "";

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (action === "solid") {
      setBackground({
        backgroundColor: e.target.value,
        backgroundImage: null,
        tailwindColor: "",
      });
    } else {
      const newColor = { name: "", hex: e.target.value };

      setBackground({
        gradient: {
          ...gradient,
          useVia: action === "gradient-via" ? true : gradient.useVia,
          from: action === "gradient-from" ? newColor : gradient.from,
          via: action === "gradient-via" ? newColor : gradient.via,
          to: action === "gradient-to" ? newColor : gradient.to,
        },
      });
    }
  };

  const handleTransparentClick = () => {
    if (action === "gradient-via") {
      setBackground({
        gradient: {
          ...gradient,
          useVia: false,
          via: defaultImageGeneratorSettings.background.gradient.via,
        },
      });
    } else {
      setBackground({
        backgroundColor:
          defaultImageGeneratorSettings.background.backgroundColor,
        backgroundImage: null,
      });
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {action === "solid" && (
        <Label>
          {currentColor === "" ? "Transparent" : currentColor.toUpperCase()}
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
