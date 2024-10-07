import CustomAccordionItem from "@/components/CustomAccordionItem";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { Tag } from "lucide-react";
import WatermarkPositionPicker from "./components/watermark/WatermarkPositionPicker";
import WatermarkSelect from "./components/watermark/WatermarkSelect";

const Watermark = () => {
  const position = useImageGeneratorStore((s) => s.settings.watermark.position);
  const background = useImageGeneratorStore(
    (s) => s.settings.watermark.background
  );
  const foreground = useImageGeneratorStore(
    (s) => s.settings.watermark.foreground
  );

  const resetWatermark = useImageGeneratorStore((s) => s.resetWatermark);
  const defaultWatermarkSettings = defaultImageGeneratorSettings.watermark

  return (
    <CustomAccordionItem
      title={"Watermark"}
      icon={<Tag className="size-4" />}
      disabled={
        position === defaultWatermarkSettings.position &&
        background === defaultWatermarkSettings.background &&
        foreground === defaultWatermarkSettings.foreground
      }
      reset={resetWatermark}
    >
      <div className="flex w-full gap-4">
        <WatermarkPositionPicker />
        <WatermarkSelect />
      </div>
    </CustomAccordionItem>
  );
};

export default Watermark;
