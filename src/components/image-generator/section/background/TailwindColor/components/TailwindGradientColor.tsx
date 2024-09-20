import { Label } from "@/components/ui/label";
import TailwindColorPicker from "./TailwindColorPicker";
import TailwindGradientOrientation from "./TailwindGradientOrientationPicker";

const TailwindGradientColor = () => {


  return (
    <>
      <Label className="text-primary/40">Orientation</Label>
      <TailwindGradientOrientation />
      <Label className="text-primary/40">From</Label>
      <TailwindColorPicker action={"gradient-from"} />
      <Label className="text-primary/40">Via</Label>
      <TailwindColorPicker action={"gradient-via"} />
      <Label className="text-primary/40">To</Label>
      <TailwindColorPicker action={"gradient-to"} />
    </>
  );
};

export default TailwindGradientColor;
