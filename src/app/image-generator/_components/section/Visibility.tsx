import CustomAccordion from "@/components/image-generator/CustomAccordion";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";

const Visibility = () => {
  const settings = useImageGeneratorStore((s) => s.settings);
  const setImageVisibility = useImageGeneratorStore(
    (s) => s.setImageVisibility
  );

  const items = [
    {
      id: "toggle-image",
      label: "Show Image",
      checked: settings.image.visibility,
      onChange: setImageVisibility,
    },
  ];

  return (
    <CustomAccordion type="multiple">
      <div className="mt-2 flex w-full flex-col gap-4">
        {items.map(({ id, label, checked, onChange }) => (
          <div key={id} className="flex items-center gap-2">
            <Switch id={id} checked={checked} onCheckedChange={onChange} />
            <Label htmlFor={id}>{label}</Label>
          </div>
        ))}
      </div>
    </CustomAccordion>
  );
};

export default Visibility;
