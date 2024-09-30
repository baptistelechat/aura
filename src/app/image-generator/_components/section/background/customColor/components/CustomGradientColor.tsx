import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import GradientOrientationContainer from "../../components/gradient/GradientOrientationContainer";
import RandomColor from "../../RandomColor";
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
      <GradientOrientationContainer />
      <Label>From - {from.hex !== "" ? from.hex : "Transparent"}</Label>
      <CustomColorPicker action={"gradient-from"} />
      <div className="flex items-center gap-2">
        <Checkbox
          id="custom-color-via"
          checked={useVia}
          onCheckedChange={() => handleCheckboxChange()}
        />
        <Label id="custom-color-via">
          Via (Optional) - {via.hex !== "" ? via.hex : "Transparent"}
        </Label>
      </div>
      <CustomColorPicker action={"gradient-via"} />
      <Label>To - {to.hex !== "" ? to.hex : "Transparent"}</Label>
      <CustomColorPicker action={"gradient-to"} />
    </>
  );
};

export default CustomGradientColor;
