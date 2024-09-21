import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import defaultImageGeneratorSettings from "@/lib/constant/defaultImageGeneratorSettings";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import { Paintbrush } from "lucide-react";
import { useState } from "react";
import SidebarSection from "../../../SidebarSection";
import CustomColorPicker from "./components/CustomColorPicker";
import CustomGradientColor from "./components/CustomGradientColor";

const CustomColor = () => {
  const [gradientColor, setGradientColor] = useState(false);

  const backgroundColor = useImageGeneratorStore(
    (s) => s.settings.background.backgroundColor
  );
  const gradient = useImageGeneratorStore(
    (s) => s.settings.background.gradient
  );
  const resetBackground = useImageGeneratorStore((s) => s.resetBackground);

  const handleCheckedChange = () => {
    setGradientColor(!gradientColor);
    resetBackground();
  };

  return (
    <SidebarSection
      title={"Custom Color"}
      icon={<Paintbrush className="size-4" />}
      disabled={
        backgroundColor ===
          defaultImageGeneratorSettings.background.backgroundColor &&
        gradient.orientation ===
          defaultImageGeneratorSettings.background.gradient.orientation &&
        gradient.from ===
          defaultImageGeneratorSettings.background.gradient.from &&
        gradient.via ===
          defaultImageGeneratorSettings.background.gradient.via &&
        gradient.to === defaultImageGeneratorSettings.background.gradient.to
      }
      reset={resetBackground}
    >
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center gap-2">
          <Switch
            id="gradient-color"
            checked={gradientColor}
            onCheckedChange={handleCheckedChange}
          />
          <Label htmlFor="gradient-color">Gradient color</Label>
        </div>
        {gradientColor ? (
          <CustomGradientColor />
        ) : (
          <CustomColorPicker action={"solid"} />
        )}
      </div>
    </SidebarSection>
  );
};

export default CustomColor;
