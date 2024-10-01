import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import GradientOrientationPicker from "../../components/gradient/GradientOrientationPicker";
import RandomColor from "../../RandomColor";
import TailwindColorPicker from "./TailwindColorPicker";

const TailwindGradientColor = () => {
  const useVia = useImageGeneratorStore(
    (s) => s.settings.background.gradient.useVia
  );
  const via = useImageGeneratorStore((s) => s.settings.background.gradient.via);
  const setVia = useImageGeneratorStore((s) => s.setGradientVia);
  const setUseVia = useImageGeneratorStore((s) => s.setUseVia);

  const handleCheckboxChange = () => {
    if (via.hex === "") {
      setVia({
        name: defaultImageGeneratorSettings.background.gradient.via.name,
        hex: defaultImageGeneratorSettings.background.gradient.via.hex,
      });
    }
    setUseVia(!useVia);
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
          checked={useVia}
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
