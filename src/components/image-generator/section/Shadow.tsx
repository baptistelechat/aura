import useImageGeneratorStore, {
  defaultSettings,
} from "@/lib/store/imageGenerator.store";
import { LampDesk, Moon, Sun, SunMoon } from "lucide-react";
import Control from "../Control";
import SidebarSection from "../SidebarSection";

const Shadow = () => {
  const shadow = useImageGeneratorStore((s) => s.settings.image.shadow);
  const setShadow = useImageGeneratorStore((s) => s.setImageShadow);
  const resetShadow = useImageGeneratorStore((s) => s.resetImageShadow);

  return (
    <SidebarSection
      title={"Shadow"}
      icon={<LampDesk className="size-4" />}
      disabled={shadow === defaultSettings.image.shadow}
      reset={resetShadow}
    >
      <Control
        title={"opacity"}
        value={shadow}
        setValue={setShadow}
        min={0}
        max={1}
        step={0.05}
        minIcon={<Moon className="size-5" />}
        middleIcon={<SunMoon className="size-5" />}
        maxIcon={<Sun className="size-5" />}
      />
    </SidebarSection>
  );
};

export default Shadow;
