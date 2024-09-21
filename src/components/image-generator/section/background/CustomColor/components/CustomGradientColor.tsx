import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import defaultImageGeneratorSettings from "@/lib/constant/defaultImageGeneratorSettings";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import { RotateCcw } from "lucide-react";
import GradientOrientationContainer from "../../components/gradient/GradientOrientationContainer";
import RandomGradient from "../../components/gradient/RandomGradient";
import CustomColorPicker from "./CustomColorPicker";

const CustomGradientColor = () => {
  const from = useImageGeneratorStore(
    (s) => s.settings.background.gradient.from
  );
  const via = useImageGeneratorStore((s) => s.settings.background.gradient.via);
  const to = useImageGeneratorStore((s) => s.settings.background.gradient.to);
  const setVia = useImageGeneratorStore((s) => s.setGradientVia);

  return (
    <>
      <RandomGradient variant={"custom"} />
      <GradientOrientationContainer />
      <Label className="text-primary/40">
        From - {from.hex !== "" ? from.hex : "Transparent"}
      </Label>
      <CustomColorPicker action={"gradient-from"} />
      <div className="flex items-center gap-2">
        <Button
          disabled={
            via.hex ===
            defaultImageGeneratorSettings.background.gradient.via.hex
          }
          variant="outline"
          size="icon-sm"
          onClick={() => {
            setVia(defaultImageGeneratorSettings.background.gradient.via);
          }}
        >
          <RotateCcw className="size-4" />
        </Button>
        <Label className="text-primary/40">
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
