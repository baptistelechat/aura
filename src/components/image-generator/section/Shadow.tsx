import useImageGeneratorStore, {
  defaultSettings,
} from "@/lib/store/imageGenerator.store";
import { LampDesk } from "lucide-react";
import Control from "../Control";
import SidebarSection from "../SidebarSection";

const Shadow = () => {
  const image = useImageGeneratorStore((s) => s.settings.image);
  const setShadow = useImageGeneratorStore((s) => s.setImageShadow);
  const resetImageShadow = useImageGeneratorStore((s) => s.resetImageShadow);

  return (
    <SidebarSection
      title={"Shadow"}
      icon={<LampDesk className="size-4" />}
      disabled={image.shadow === defaultSettings.image.shadow}
      reset={resetImageShadow}
    >
      <Control
        title={"opacity"}
        value={image.shadow}
        setValue={setShadow}
        min={0}
        max={1}
        step={0.05}
      />
    </SidebarSection>
  );
};

export default Shadow;
