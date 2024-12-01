import CustomAccordionItem from "@/components/image-generator/CustomAccordionItem";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { Tag } from "lucide-react";
import WatermarkPositionPicker from "./components/WatermarkPositionPicker";
import AuraWatermarkSelect from "./components/AuraWatermarkSelect";

const AuraWatermarkControl = () => {
  const auraWatermark = useImageGeneratorStore(
    (s) => s.settings.watermark.aura
  );

  const setWatermark = useImageGeneratorStore((s) => s.setWatermark);

  const defaultValue = defaultImageGeneratorSettings.watermark.aura;

  return (
    <CustomAccordionItem
      title={"Aura"}
      icon={<Tag className="size-4" />}
      disabled={
        auraWatermark.position === defaultValue.position &&
        auraWatermark.background === defaultValue.background &&
        auraWatermark.foreground === defaultValue.foreground
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
        <WatermarkPositionPicker variant="aura" />
        <AuraWatermarkSelect />
      </div>
    </CustomAccordionItem>
  );
};

export default AuraWatermarkControl;
