import CustomAccordionItem from "@/components/CustomAccordionItem";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { handleBackgroundModeChange } from "@/lib/utils/image-generator/handleBackgroundModeChange";
import { WandSparkles } from "lucide-react";
import MagicColorPicker from "./components/MagicColorPicker";
import MagicGradientColor from "./components/MagicGradientColor";

const MagicColor = () => {
  const backgroundMode = useImageGeneratorStore(
    (s) => s.settings.background.backgroundMode
  );
  const backgroundColor = useImageGeneratorStore(
    (s) => s.settings.background.backgroundColor
  );
  const gradient = useImageGeneratorStore(
    (s) => s.settings.background.gradient
  );
  const magicColor = useImageGeneratorStore(
    (s) => s.settings.background.magicColor
  );

  const resetBackground = useImageGeneratorStore((s) => s.resetBackground);
  const defaultBackgroundSettings = defaultImageGeneratorSettings.background;

  return (
    <CustomAccordionItem
      title={"Magic Color"}
      icon={<WandSparkles className="size-4" />}
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
      {magicColor.length > 0 ? (
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
            <MagicGradientColor />
          ) : (
            <MagicColorPicker action={"solid"} />
          )}
        </div>
      ) : (
        <p>Load an image to get magic colors</p>
      )}
    </CustomAccordionItem>
  );
};

export default MagicColor;
