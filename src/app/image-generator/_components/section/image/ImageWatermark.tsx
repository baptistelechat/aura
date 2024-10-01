import CustomAccordionItem from "@/components/CustomAccordionItem";
import TransparentButton from "@/components/TransparentButton";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { Tag } from "lucide-react";
import WatermarkSettingsPicker from "./components/watermark/WatermarkSettingsPicker";

const ImageWatermark = () => {
  const position = useImageGeneratorStore((s) => s.settings.watermark.position);
  const background = useImageGeneratorStore(
    (s) => s.settings.watermark.background
  );
  const foreground = useImageGeneratorStore(
    (s) => s.settings.watermark.foreground
  );

  const resetWatermark = useImageGeneratorStore((s) => s.resetWatermark);

  return (
    <CustomAccordionItem
      title={"Watermark"}
      icon={<Tag className="size-4" />}
      disabled={
        position === defaultImageGeneratorSettings.watermark.position &&
        background === defaultImageGeneratorSettings.watermark.background &&
        foreground === defaultImageGeneratorSettings.watermark.foreground
      }
      reset={resetWatermark}
    >
      <div className="flex flex-col gap-4">
        <div className="flex w-full justify-between">
          <WatermarkSettingsPicker variant={"position"} />
          <WatermarkSettingsPicker variant={"background"} />
          <WatermarkSettingsPicker variant={"foreground"} />
        </div>
        <TransparentButton variant="watermark" />
      </div>
    </CustomAccordionItem>
  );
};

export default ImageWatermark;
