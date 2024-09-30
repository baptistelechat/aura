import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { Paintbrush } from "lucide-react";
import CustomColorPicker from "./components/CustomColorPicker";
import CustomGradientColor from "./components/CustomGradientColor";
import CustomAccordionItem from "@/components/CustomAccordionItem";

const CustomColor = () => {
  const backgroundMode = useImageGeneratorStore(
    (s) => s.settings.background.backgroundMode
  );
  const backgroundColor = useImageGeneratorStore(
    (s) => s.settings.background.backgroundColor
  );
  const gradient = useImageGeneratorStore(
    (s) => s.settings.background.gradient
  );
  const setBackgroundMode = useImageGeneratorStore((s) => s.setBackgroundMode);
  const resetBackground = useImageGeneratorStore((s) => s.resetBackground);

  const handleCheckedChange = () => {
    if (backgroundMode === "gradient") {
      setBackgroundMode("solid");
    } else {
      setBackgroundMode("gradient");
    }
    resetBackground();
  };

  return (
    <CustomAccordionItem
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
            checked={backgroundMode === "gradient"}
            onCheckedChange={handleCheckedChange}
          />
          <Label htmlFor="gradient-color">Gradient color</Label>
        </div>
        {backgroundMode === "gradient" ? (
          <CustomGradientColor />
        ) : (
          <CustomColorPicker action={"solid"} />
        )}
      </div>
    </CustomAccordionItem>
  );
};

export default CustomColor;
