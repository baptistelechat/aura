import useImageGeneratorStore, {
  defaultSettings,
} from "@/lib/store/imageGenerator.store";
import { BoxSelect, Circle, Square, Squircle } from "lucide-react";
import Control from "../../Control";
import SidebarSection from "../../SidebarSection";

const ImageBorder = () => {
  const borderRadius = useImageGeneratorStore(
    (s) => s.settings.image.borderRadius
  );
  const setBorderRadius = useImageGeneratorStore((s) => s.setImageBorderRadius);
  const resetBorderRadius = useImageGeneratorStore(
    (s) => s.resetImageBorderRadius
  );

  return (
    <SidebarSection
      title={"Border"}
      icon={<BoxSelect className="size-4" />}
      disabled={borderRadius === defaultSettings.image.borderRadius}
      reset={resetBorderRadius}
    >
      <Control
        title={"border-radius"}
        value={borderRadius}
        setValue={setBorderRadius}
        min={0}
        max={48}
        step={1}
        minIcon={<Square className="size-5" />}
        middleIcon={<Squircle className="size-5" />}
        maxIcon={<Circle className="size-5" />}
      />
    </SidebarSection>
  );
};

export default ImageBorder;
