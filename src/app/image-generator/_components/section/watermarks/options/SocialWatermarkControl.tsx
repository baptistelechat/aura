import CustomAccordionItem from "@/components/image-generator/CustomAccordionItem";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { Hash } from "lucide-react";
import SocialWatermarkColorSelect from "./components/SocialWatermarkColorSelect";
import SocialWatermarkIconSelect from "./components/SocialWatermarkIconSelect";
import WatermarkPositionPicker from "./components/WatermarkPositionPicker";

const SocialWatermarkControl = () => {
  const socialWatermark = useImageGeneratorStore(
    (s) => s.settings.watermark.social
  );

  const setWatermark = useImageGeneratorStore((s) => s.setWatermark);

  const defaultValue = defaultImageGeneratorSettings.watermark.social;

  return (
    <CustomAccordionItem
      title={"Social"}
      icon={<Hash className="size-4" />}
      disabled={
        socialWatermark.position === defaultValue.position &&
        socialWatermark.foreground === defaultValue.foreground
      }
      reset={() =>
        setWatermark({
          social: {
            position: defaultValue.position,
            foreground: defaultValue.foreground,
            icon: defaultValue.icon,
          },
        })
      }
    >
      <div className="flex w-full gap-4">
        <WatermarkPositionPicker variant="social" />
        <div className="flex w-full flex-col gap-1">
          <SocialWatermarkColorSelect />
          <SocialWatermarkIconSelect />
        </div>
      </div>
    </CustomAccordionItem>
  );
};

export default SocialWatermarkControl;
