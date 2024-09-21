import { Label } from "@/components/ui/label";
import TailwindColorPicker from "./TailwindColorPicker";
import TailwindGradientOrientation from "./TailwindGradientOrientationPicker";
import RandomTailwindGradient from "./RandomTailwindGradient";

const TailwindGradientColor = () => {
  return (
    <>
      <RandomTailwindGradient />
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <Label className="text-primary/40">Linear</Label>
          <TailwindGradientOrientation variant={"linear"} />
        </div>
        <div className="flex flex-col gap-4">
          <Label className="text-primary/40">Radial</Label>
          <TailwindGradientOrientation variant={"radial"} />
        </div>
      </div>
      <Label className="text-primary/40">From</Label>
      <TailwindColorPicker action={"gradient-from"} />
      <Label className="text-primary/40">Via (Optional)</Label>
      <TailwindColorPicker action={"gradient-via"} />
      <Label className="text-primary/40">To</Label>
      <TailwindColorPicker action={"gradient-to"} />
    </>
  );
};

export default TailwindGradientColor;
