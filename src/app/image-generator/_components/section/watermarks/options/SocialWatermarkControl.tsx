import CustomAccordionItem from "@/components/image-generator/CustomAccordionItem";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { Hash } from "lucide-react";
import WatermarkPositionPicker from "./components/WatermarkPositionPicker";

const SocialWatermarkControl = () => {
  const position = useImageGeneratorStore(
    (s) => s.settings.watermark.social.position
  );

  const setWatermark = useImageGeneratorStore((s) => s.setWatermark);

  const defaultValue = defaultImageGeneratorSettings.watermark.social;

  return (
    <CustomAccordionItem
      title={"Social"}
      icon={<Hash className="size-4" />}
      disabled={
        position === defaultValue.position
      }
      reset={() =>
        setWatermark({
          social: {
            position: defaultValue.position,
          },
        })
      }
    >
      <div className="flex w-full gap-4">
        <WatermarkPositionPicker variant="social" />
      </div>
    </CustomAccordionItem>
  );
};

export default SocialWatermarkControl;
