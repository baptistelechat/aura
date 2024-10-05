import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { Palette } from "lucide-react";
import TailwindColorPicker from "./components/TailwindColorPicker";
import TailwindGradientColor from "./components/TailwindGradientColor";
import CustomAccordionItem from "@/components/CustomAccordionItem";
import { handleBackgroundModeChange } from "@/lib/utils/image-generator/handleBackgroundModeChange";

const TailwindColor = () => {
  const backgroundMode = useImageGeneratorStore(
    (s) => s.settings.background.backgroundMode
  );
  const backgroundColor = useImageGeneratorStore(
    (s) => s.settings.background.backgroundColor
  );
  const gradient = useImageGeneratorStore(
    (s) => s.settings.background.gradient
  );
  const resetBackground = useImageGeneratorStore((s) => s.resetBackground);
  const defaultBackgroundSettings = defaultImageGeneratorSettings.background;

  return (
    <CustomAccordionItem
      title={"Tailwind Color"}
      icon={<Palette className="size-4" />}
      disabled={
        backgroundColor === defaultBackgroundSettings.backgroundColor &&
        gradient.orientation ===
          defaultBackgroundSettings.gradient.orientation &&
        gradient.from === defaultBackgroundSettings.gradient.from &&
        gradient.via === defaultBackgroundSettings.gradient.via &&
        gradient.to === defaultBackgroundSettings.gradient.to
      }
      reset={resetBackground}
    >
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center gap-2">
          <Switch
            id="gradient-color"
            checked={backgroundMode === "gradient"}
            onCheckedChange={handleBackgroundModeChange}
          />
          <Label htmlFor="gradient-color">Gradient color</Label>
        </div>
        {backgroundMode === "gradient" ? (
          <TailwindGradientColor />
        ) : (
          <TailwindColorPicker action={"solid"} />
        )}
      </div>
    </CustomAccordionItem>
  );
};

export default TailwindColor;
