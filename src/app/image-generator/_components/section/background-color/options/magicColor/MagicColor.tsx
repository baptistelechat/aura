import CustomAccordionItem from "@/components/image-generator/CustomAccordionItem";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { handleBackgroundModeChange } from "@/lib/utils/image-generator/handleBackgroundModeChange";
import { WandSparkles } from "lucide-react";
import MagicColorPicker from "./components/MagicColorPicker";
import MagicGradientColor from "./components/MagicGradientColor";
import { loadImage } from "@/lib/utils/hotkey/action/loadImage";

const MagicColor = () => {
  const backgroundMode = useImageGeneratorStore(
    (s) => s.settings.background.backgroundMode
  );
  const magicColor = useImageGeneratorStore(
    (s) => s.settings.background.magicColor
  );

  return (
    <CustomAccordionItem
      title={"Magic Color"}
      icon={<WandSparkles className="size-4" />}
      disabled={
        magicColor === defaultImageGeneratorSettings.background.magicColor
      }
      reset={loadImage}
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
