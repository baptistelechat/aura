import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import GradientOrientationContainer from "../../components/gradient/GradientOrientationContainer";
import RandomGradient from "../../components/gradient/RandomGradient";
import TailwindColorPicker from "./TailwindColorPicker";

const TailwindGradientColor = () => {
  const useVia = useImageGeneratorStore(
    (s) => s.settings.background.gradient.useVia
  );
  const setUseVia = useImageGeneratorStore((s) => s.setUseVia);

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
          onCheckedChange={() => setUseVia(!useVia)}
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
