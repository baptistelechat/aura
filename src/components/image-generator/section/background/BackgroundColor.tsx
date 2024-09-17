import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useImageGeneratorStore, {
  defaultSettings,
} from "@/lib/store/imageGenerator.store";
import { Eraser, Palette } from "lucide-react";
import SidebarSection from "../../SidebarSection";

const BackgroundColor = () => {
  const backgroundColor = useImageGeneratorStore(
    (s) => s.settings.backgroundColor
  );
  const setBackgroundColor = useImageGeneratorStore(
    (s) => s.setBackgroundColor
  );
  const resetBackgroundColor = useImageGeneratorStore(
    (s) => s.resetBackgroundColor
  );

  return (
    <SidebarSection
      title={"Custom Color"}
      icon={<Palette className="size-4" />}
      disabled={backgroundColor === defaultSettings.backgroundColor}
      reset={resetBackgroundColor}
    >
      <div className="flex gap-4">
        <div className="flex w-16 flex-col items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setBackgroundColor("")}
          >
            <Eraser className="size-5" />
          </Button>
          <p className="text-xs font-semibold text-primary/40">Transparent</p>
        </div>
        <div className="flex w-16 flex-col items-center justify-center gap-2">
          <Input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            className="size-10"
          />
          <p className="text-xs font-semibold text-primary/40">
            {backgroundColor === "" ? "-" : backgroundColor}
          </p>
        </div>
      </div>
    </SidebarSection>
  );
};

export default BackgroundColor;
