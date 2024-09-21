import SidebarSection from "@/components/image-generator/SidebarSection";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import defaultImageGeneratorSettings from "@/lib/constant/defaultImageGeneratorSettings";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import { Palette } from "lucide-react";
import { useState } from "react";
import TailwindColorPicker from "./components/TailwindColorPicker";
import TailwindGradientColor from "./components/TailwindGradientColor";

const TailwindColor = () => {
  const [gradientColor, setGradientColor] = useState(false);

  const backgroundColor = useImageGeneratorStore(
    (s) => s.settings.background.backgroundColor
  );
  const tailwindGradient = useImageGeneratorStore(
    (s) => s.settings.background.tailwindGradient
  );
  const resetBackground = useImageGeneratorStore((s) => s.resetBackground);

  return (
    <SidebarSection
      title={"Tailwind Color"}
      icon={<Palette className="size-4" />}
      disabled={
        backgroundColor ===
          defaultImageGeneratorSettings.background.backgroundColor &&
        tailwindGradient.orientation ===
          defaultImageGeneratorSettings.background.tailwindGradient
            .orientation &&
        tailwindGradient.from ===
          defaultImageGeneratorSettings.background.tailwindGradient.from &&
        tailwindGradient.via ===
          defaultImageGeneratorSettings.background.tailwindGradient.via &&
        tailwindGradient.to ===
          defaultImageGeneratorSettings.background.tailwindGradient.to
      }
      reset={resetBackground}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="gradient-color"
            checked={gradientColor}
            onCheckedChange={() => setGradientColor(!gradientColor)}
          />
          <Label htmlFor="gradient-color">Gradient color</Label>
        </div>
        {gradientColor ? (
          <TailwindGradientColor />
        ) : (
          <TailwindColorPicker action={"solid"} />
        )}
      </div>
    </SidebarSection>
  );
};

export default TailwindColor;
