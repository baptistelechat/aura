import SidebarSection from "@/components/image-generator/SidebarSection";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useImageGeneratorStore, {
  defaultSettings,
} from "@/lib/store/imageGenerator.store";
import { Palette } from "lucide-react";
import { useState } from "react";
import TailwindColorPicker from "./components/TailwindColorPicker";
import TailwindGradientColor from "./components/TailwindGradientColor";

const TailwindColor = () => {
  const [gradientColor, setGradientColor] = useState(false);

  const backgroundColor = useImageGeneratorStore(
    (s) => s.settings.background.backgroundColor
  );
  const setBackgroundColor = useImageGeneratorStore(
    (s) => s.setBackgroundColor
  );
  const resetBackground = useImageGeneratorStore((s) => s.resetBackground);

  return (
    <SidebarSection
      title={"Tailwind Color"}
      icon={<Palette className="size-4" />}
      disabled={backgroundColor === defaultSettings.background.backgroundColor}
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
          <TailwindColorPicker action={setBackgroundColor} />
        )}
      </div>
    </SidebarSection>
  );
};

export default TailwindColor;
