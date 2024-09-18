import { Label } from "@/components/ui/label";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import TailwindColorPicker from "./TailwindColorPicker";
import TailwindGradientOrientation from "./TailwindGradientOrientation";

const TailwindGradientColor = () => {
  const setFrom = useImageGeneratorStore((s) => s.setTailwindGradientFrom);
  const setVia = useImageGeneratorStore((s) => s.setTailwindGradientVia);
  const setTo = useImageGeneratorStore((s) => s.setTailwindGradientTo);

  return (
    <>
      <Label className="text-primary/40">Orientation</Label>
      <TailwindGradientOrientation />
      <Label className="text-primary/40">From</Label>
      <TailwindColorPicker action={setFrom} />
      <Label className="text-primary/40">Via</Label>
      <TailwindColorPicker action={setVia} />
      <Label className="text-primary/40">To</Label>
      <TailwindColorPicker action={setTo} />
    </>
  );
};

export default TailwindGradientColor;
