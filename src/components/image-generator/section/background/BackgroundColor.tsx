import { Input } from "@/components/ui/input";
import useImageGeneratorStore, {
  defaultSettings,
} from "@/lib/store/imageGenerator.store";
import { Palette } from "lucide-react";
import SidebarSection from "../../SidebarSection";

const BackgroundColor = () => {
  const backgroundColor = useImageGeneratorStore((s) => s.settings.backgroundColor);
  const setBackgroundColor = useImageGeneratorStore((s) => s.setBackgroundColor);
  const resetBackgroundColor = useImageGeneratorStore((s) => s.resetBackgroundColor);

  return (
    <SidebarSection
      title={"Color"}
      icon={<Palette className="size-4" />}
      disabled={backgroundColor === defaultSettings.backgroundColor}
      reset={resetBackgroundColor}
    >
      <Input
        type="color"
        value={backgroundColor}
        onChange={(e) => setBackgroundColor(e.target.value)}
        className="w-full"
      />
    </SidebarSection>
  );
};

export default BackgroundColor;
