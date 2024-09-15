import useImageGeneratorStore, {
  defaultSettings,
} from "@/lib/store/imageGenerator.store";
import { ImageIcon, ImageDown, ImageUp, Proportions } from "lucide-react";
import Control from "../Control";
import SidebarSection from "../SidebarSection";

const Size = () => {
  const scale = useImageGeneratorStore((s) => s.settings.image.scale);
  const setScale = useImageGeneratorStore((s) => s.setImageScale);
  const resetScale = useImageGeneratorStore((s) => s.resetImageScale);

  return (
    <SidebarSection
      title={"Size"}
      icon={<Proportions className="size-4" />}
      disabled={scale === defaultSettings.image.scale}
      reset={resetScale}
    >
      <Control
        title={"scale"}
        value={scale}
        setValue={setScale}
        min={0}
        max={1}
        step={0.05}
        minIcon={<ImageDown className="size-5" />}
        middleIcon={<ImageIcon className="size-5" />}
        maxIcon={<ImageUp className="size-5" />}
      />
    </SidebarSection>
  );
};

export default Size;
