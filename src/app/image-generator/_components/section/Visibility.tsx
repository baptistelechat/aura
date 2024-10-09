import CustomAccordion from "@/components/CustomAccordion";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";

const Visibility = () => {
  const visibility = useImageGeneratorStore((s) => s.settings.image.visibility);
  const setVisibility = useImageGeneratorStore((s) => s.setImageVisibility);

  return (
    <CustomAccordion type="multiple">
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center gap-2">
          <Switch
            id="toggle-image"
            checked={visibility}
            onCheckedChange={(value) => setVisibility(value)}
          />
          <Label htmlFor="toggle-image">Show Image</Label>
        </div>
      </div>
    </CustomAccordion>
  );
};

export default Visibility;
