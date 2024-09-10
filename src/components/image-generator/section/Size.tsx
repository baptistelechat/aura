import useImageGeneratorStore, {
  defaultSettings,
} from "@/lib/store/imageGenerator.store";
import { Proportions } from "lucide-react";
import Control from "../Control";
import SidebarSection from "../SidebarSection";

const Size = () => {
  const image = useImageGeneratorStore((s) => s.settings.image);
  const setScale = useImageGeneratorStore((s) => s.setImageScale);
  const resetScale = useImageGeneratorStore((s) => s.resetImageScale);

  return (
    <SidebarSection
      title={"Size"}
      icon={<Proportions className="size-4" />}
      disabled={image.scale === defaultSettings.image.scale}
      reset={resetScale}
    >
      <Control
        title={"scale"}
        value={image.scale}
        setValue={setScale}
        min={0}
        max={1}
        step={0.05}
      />
    </SidebarSection>
  );
};

export default Size;
