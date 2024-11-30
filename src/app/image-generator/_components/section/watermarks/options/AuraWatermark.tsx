import CustomAccordionItem from "@/components/image-generator/CustomAccordionItem";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { Tag } from "lucide-react";
import WatermarkPositionPicker from "./components/WatermarkPositionPicker";
import AuraWatermarkSelect from "./components/AuraWatermarkSelect";

const AuraWatermark = () => {
  const position = useImageGeneratorStore(
    (s) => s.settings.watermark.aura.position
  );
  const background = useImageGeneratorStore(
    (s) => s.settings.watermark.aura.background
  );
  const foreground = useImageGeneratorStore(
    (s) => s.settings.watermark.aura.foreground
  );

  const setWatermark = useImageGeneratorStore((s) => s.setWatermark);

  const defaultValue = defaultImageGeneratorSettings.watermark.aura;

  return (
    <CustomAccordionItem
      title={"Aura"}
      icon={<Tag className="size-4" />}
      disabled={
        position === defaultValue.position &&
        background === defaultValue.background &&
        foreground === defaultValue.foreground
      }
      reset={() =>
        setWatermark({
          aura: {
            position: defaultValue.position,
            background: defaultValue.background,
            foreground: defaultValue.foreground,
          },
        })
      }
    >
      <div className="flex w-full gap-4">
        <WatermarkPositionPicker />
        <AuraWatermarkSelect />
      </div>
    </CustomAccordionItem>
  );
};

export default AuraWatermark;
