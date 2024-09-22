import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import GradientOrientationContainer from "../../components/gradient/GradientOrientationContainer";
import RandomGradient from "../../components/gradient/RandomGradient";
import CustomColorPicker from "./CustomColorPicker";

const CustomGradientColor = () => {
  const useVia = useImageGeneratorStore((s) => s.settings.background.gradient.useVia);
  const from = useImageGeneratorStore(
    (s) => s.settings.background.gradient.from
  );
  const via = useImageGeneratorStore((s) => s.settings.background.gradient.via);
  const to = useImageGeneratorStore((s) => s.settings.background.gradient.to);
  const setUseVia = useImageGeneratorStore((s) => s.setUseVia);


  return (
    <>
      <RandomGradient variant={"custom"} />
      <GradientOrientationContainer />
      <Label className="text-primary/40">
        From - {from.hex !== "" ? from.hex : "Transparent"}
      </Label>
      <CustomColorPicker action={"gradient-from"} />
      <div className="flex items-center gap-2">
        <Checkbox
          id="custom-color-via"
          checked={useVia}
          onCheckedChange={() => setUseVia(!useVia)}
        />
        <Label id="custom-color-via" className="text-primary/40">
          Via (Optional) - {via.hex !== "" ? via.hex : "Transparent"}
        </Label>
      </div>
      <CustomColorPicker action={"gradient-via"} />
      <Label className="text-primary/40">
        To - {to.hex !== "" ? to.hex : "Transparent"}
      </Label>
      <CustomColorPicker action={"gradient-to"} />
    </>
  );
};

export default CustomGradientColor;
