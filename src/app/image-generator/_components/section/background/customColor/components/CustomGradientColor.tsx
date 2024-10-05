import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import GradientOrientationPicker from "../../components/GradientOrientationPicker";
import RandomColor from "../../components/RandomColor";
import CustomColorPicker from "./CustomColorPicker";

const CustomGradientColor = () => {
  const useVia = useImageGeneratorStore(
    (s) => s.settings.background.gradient.useVia
  );
  const from = useImageGeneratorStore(
    (s) => s.settings.background.gradient.from
  );
  const via = useImageGeneratorStore((s) => s.settings.background.gradient.via);
  const to = useImageGeneratorStore((s) => s.settings.background.gradient.to);
  const setVia = useImageGeneratorStore((s) => s.setGradientVia);
  const setUseVia = useImageGeneratorStore((s) => s.setUseVia);

  const handleCheckboxChange = () => {
    if (via.hex === "") {
      setVia({
        name: "",
        hex: defaultImageGeneratorSettings.background.gradient.via.hex,
      });
    }
    setUseVia(!useVia);
  };

  return (
    <>
      <RandomColor variant={"custom-gradient"} />
      <div className="flex justify-between">
        <GradientOrientationPicker variant={"linear"} />
        <GradientOrientationPicker variant={"radial"} />
      </div>
      <Label>
        From - {from.hex !== "" ? from.hex.toUpperCase() : "Transparent"}
      </Label>
      <CustomColorPicker action={"gradient-from"} />
      <div className="flex items-center gap-2">
        <Checkbox
          id="custom-color-via"
          checked={useVia}
          onCheckedChange={() => handleCheckboxChange()}
        />
        <Label id="custom-color-via">
          Via (Optional) -{" "}
          {via.hex !== "" ? via.hex.toUpperCase() : "Transparent"}
        </Label>
      </div>
      <CustomColorPicker action={"gradient-via"} />
      <Label>To - {to.hex !== "" ? to.hex.toUpperCase() : "Transparent"}</Label>
      <CustomColorPicker action={"gradient-to"} />
    </>
  );
};

export default CustomGradientColor;
