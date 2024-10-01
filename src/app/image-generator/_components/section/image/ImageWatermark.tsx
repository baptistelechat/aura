import CustomAccordionItem from "@/components/CustomAccordionItem";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { Tag } from "lucide-react";
import WatermarkPositionPicker from "./components/watermark/WatermarkPositionPicker";

const ImageWatermark = () => {
  const watermarkPosition = useImageGeneratorStore(
    (s) => s.settings.watermark.position
  );
  const resetWatermarkPosition = useImageGeneratorStore(
    (s) => s.resetWatermarkPosition
  );

  return (
    <CustomAccordionItem
      title={"Watermark"}
      icon={<Tag className="size-4" />}
      disabled={
        watermarkPosition === defaultImageGeneratorSettings.watermark.position
      }
      reset={resetWatermarkPosition}
    >
      <WatermarkPositionPicker />
    </CustomAccordionItem>
  );
};

export default ImageWatermark;
