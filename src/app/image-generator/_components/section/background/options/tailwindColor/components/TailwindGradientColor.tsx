import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import GradientOrientationPicker from "../../components/GradientOrientationPicker";
import RandomColor from "../../components/RandomColor";
import TailwindColorPicker from "./TailwindColorPicker";

const TailwindGradientColor = () => {
  const gradient = useImageGeneratorStore(
    (s) => s.settings.background.gradient
  );
  const setBackground = useImageGeneratorStore((s) => s.setBackground);

  const handleCheckboxChange = () => {
    setBackground({
      gradient: {
        ...gradient,
        via:
          gradient.via.hex === ""
            ? defaultImageGeneratorSettings.background.gradient.via
            : gradient.via,
        useVia: !gradient.useVia,
      },
    });
  };

  return (
    <>
      <RandomColor variant={"tailwind-gradient"} />
      <div className="flex justify-between">
        <GradientOrientationPicker variant={"linear"} />
        <GradientOrientationPicker variant={"radial"} />
      </div>
      <Label>From</Label>
      <TailwindColorPicker action={"gradient-from"} />
      <div className="flex items-center gap-2">
        <Checkbox
          id="tailwind-color-via"
          checked={gradient.useVia}
          onCheckedChange={() => handleCheckboxChange()}
        />
        <Label id="tailwind-color-via">Via (Optional)</Label>
      </div>
      <TailwindColorPicker action={"gradient-via"} />
      <Label>To</Label>
      <TailwindColorPicker action={"gradient-to"} />
    </>
  );
};

export default TailwindGradientColor;
