import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import GradientOrientationContainer from "../../components/gradient/GradientOrientationContainer";
import RandomGradient from "../../components/gradient/RandomGradient";
import TailwindColorPicker from "./TailwindColorPicker";
import defaultImageGeneratorSettings from "@/lib/constant/defaultImageGeneratorSettings";

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
      <RandomGradient variant={"tailwind"} />
      <GradientOrientationContainer />
      <Label className="text-primary/40">From</Label>
      <TailwindColorPicker action={"gradient-from"} />
      <div className="flex items-center gap-2">
        <Checkbox
          id="tailwind-color-via"
          checked={useVia}
          onCheckedChange={() => handleCheckboxChange()}
        />
        <Label id="tailwind-color-via" className="text-primary/40">
          Via (Optional)
        </Label>
      </div>
      <TailwindColorPicker action={"gradient-via"} />
      <Label className="text-primary/40">To</Label>
      <TailwindColorPicker action={"gradient-to"} />
    </>
  );
};

export default TailwindGradientColor;
