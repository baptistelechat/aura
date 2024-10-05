import CustomAccordionItem from "@/components/CustomAccordionItem";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { WandSparkles } from "lucide-react";
import MagicColorPicker from "./components/MagicColorPicker";

const MagicColor = () => {
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
      <MagicColorPicker action={"solid"} />
    </CustomAccordionItem>
  );
};

export default MagicColor;
