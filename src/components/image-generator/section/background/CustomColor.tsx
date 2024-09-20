import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import defaultImageGeneratorSettings from "@/lib/constant/defaultImageGeneratorSettings";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import { Eraser, Paintbrush } from "lucide-react";
import { ChangeEvent } from "react";
import SidebarSection from "../../SidebarSection";

const CustomColor = () => {
  const backgroundColor = useImageGeneratorStore(
    (s) => s.settings.background.backgroundColor
  );
  const setBackgroundColor = useImageGeneratorStore(
    (s) => s.setBackgroundColor
  );
  const setFrom = useImageGeneratorStore((s) => s.setTailwindGradientFrom);
  const setVia = useImageGeneratorStore((s) => s.setTailwindGradientVia);
  const setTo = useImageGeneratorStore((s) => s.setTailwindGradientTo);
  const resetBackground = useImageGeneratorStore((s) => s.resetBackground);

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBackgroundColor(e.target.value);
    setFrom("");
    setVia("");
    setTo("");
  };

  return (
    <SidebarSection
      title={"Custom Color"}
      icon={<Paintbrush className="size-4" />}
      disabled={
        backgroundColor ===
        defaultImageGeneratorSettings.background.backgroundColor
      }
      reset={resetBackground}
    >
      <div className="flex gap-2">
        <div className="flex w-fit flex-col items-center justify-center gap-2">
          <Label className="text-primary/40">Transparent</Label>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setBackgroundColor("");
            }}
          >
            <Eraser className="size-5" />
          </Button>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <Label className="text-primary/40">{backgroundColor}</Label>
          <Input
            type="color"
            value={backgroundColor}
            onChange={(e) => handleColorChange(e)}
            className="w-full"
          />
        </div>
      </div>
    </SidebarSection>
  );
};

export default CustomColor;
