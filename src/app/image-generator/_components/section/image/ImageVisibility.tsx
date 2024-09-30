import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { Eye } from "lucide-react";
import CustomAccordionItem from "@/components/CustomAccordionItem";

const ImageVisibility = () => {
  const visibility = useImageGeneratorStore((s) => s.settings.image.visibility);
  const setVisibility = useImageGeneratorStore((s) => s.setImageVisibility);

  return (
    <CustomAccordionItem title={"Visibility"} icon={<Eye className="size-4" />}>
      <div className="flex flex-col gap-2 px-1">
        <div className="flex items-center space-x-2">
          <Switch
            id="toggle-image"
            checked={visibility}
            onCheckedChange={(value) => setVisibility(value)}
          />
          <Label htmlFor="toggle-image">Show Image</Label>
        </div>
      </div>
    </CustomAccordionItem>
  );
};

export default ImageVisibility;
