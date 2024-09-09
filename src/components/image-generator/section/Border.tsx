import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import { Circle, Square, Squircle } from "lucide-react";
import SidebarSection from "../SidebarSection";

const Border = () => {
  const image = useImageGeneratorStore((s) => s.settings.image);
  const setBorderRadius = useImageGeneratorStore((s) => s.setImageBorderRadius);
  const resetBorderRadius = useImageGeneratorStore(
    (s) => s.resetImageBorderRadius
  );

  return (
    <SidebarSection
      title={"Border"}
      icon={<Squircle className="size-4" />}
      reset={resetBorderRadius}
    >
      <div className="flex gap-4">
        <Slider
          value={[image.borderRadius]}
          min={0}
          max={48}
          step={1}
          onValueChange={(value) => setBorderRadius(value[0])}
        />
        <Input
          type="number"
          value={image.borderRadius}
          onChange={(e) => setBorderRadius(Number(e.target.value))}
          className="w-14"
        />
      </div>
      <div className="flex gap-2">
        <Button
          disabled={image.borderRadius === 0}
          variant="outline"
          size="icon"
          onClick={() => setBorderRadius(0)}
        >
          <Square className="size-5" />
        </Button>
        <Button
          disabled={image.borderRadius === 24}
          variant="outline"
          size="icon"
          onClick={() => setBorderRadius(24)}
        >
          <Squircle className="size-5" />
        </Button>
        <Button
          disabled={image.borderRadius === 48}
          variant="outline"
          size="icon"
          onClick={() => setBorderRadius(48)}
        >
          <Circle className="size-5" />
        </Button>
      </div>
    </SidebarSection>
  );
};

export default Border;
