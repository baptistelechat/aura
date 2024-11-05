import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import GradientOrientationPicker from "../../components/GradientOrientationPicker";
import RandomColor from "../../components/RandomColor";
import CustomColorPicker from "./CustomColorPicker";

const CustomGradientColor = () => {
  const gradient = useImageGeneratorStore(
    (s) => s.settings.background.gradient
  );

  const setBackground = useImageGeneratorStore((s) => s.setBackground);

  const handleCheckboxChange = () => {
    setBackground({
      gradient: {
        ...gradient,
        via:
          gradient.via.hex === ""
            ? {
                name: "",
                hex: defaultImageGeneratorSettings.background.gradient.via.hex,
              }
            : gradient.via,
        useVia: !gradient.useVia,
      },
    });
  };

  return (
    <>
      <RandomColor variant={"custom-gradient"} />
      <div className="flex justify-between">
        <GradientOrientationPicker variant={"linear"} />
        <GradientOrientationPicker variant={"radial"} />
      </div>
      <Label>
        From -{" "}
        {gradient.from.hex !== ""
          ? gradient.from.hex.toUpperCase()
          : "Transparent"}
      </Label>
      <CustomColorPicker action={"gradient-from"} />
      <div className="flex items-center gap-2">
        <Checkbox
          id="custom-color-via"
          checked={gradient.useVia}
          onCheckedChange={() => handleCheckboxChange()}
        />
        <Label id="custom-color-via">
          Via (Optional) -{" "}
          {gradient.via.hex !== ""
            ? gradient.via.hex.toUpperCase()
            : "Transparent"}
        </Label>
      </div>
      <CustomColorPicker action={"gradient-via"} />
      <Label>
        To -{" "}
        {gradient.to.hex !== "" ? gradient.to.hex.toUpperCase() : "Transparent"}
      </Label>
      <CustomColorPicker action={"gradient-to"} />
    </>
  );
};

export default CustomGradientColor;
