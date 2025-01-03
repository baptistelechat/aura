import CustomAccordionItem from "@/components/image-generator/CustomAccordionItem";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { Tag } from "lucide-react";
import WatermarkPositionPicker from "./components/WatermarkPositionPicker";
import WatermarkSelect from "./components/WatermarkSelect";

const AuraWatermark = () => {
  const position = useImageGeneratorStore((s) => s.settings.watermark.position);
  const background = useImageGeneratorStore(
    (s) => s.settings.watermark.background
  );
  const foreground = useImageGeneratorStore(
    (s) => s.settings.watermark.foreground
  );

  const setWatermark = useImageGeneratorStore((s) => s.setWatermark);

  const defaultValue = defaultImageGeneratorSettings.watermark;

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
          position: defaultValue.position,
          background: defaultValue.background,
          foreground: defaultValue.foreground,
        })
      }
    >
      <div className="flex w-full gap-4">
        <WatermarkPositionPicker />
        <WatermarkSelect />
      </div>
    </CustomAccordionItem>
  );
};

export default AuraWatermark;
