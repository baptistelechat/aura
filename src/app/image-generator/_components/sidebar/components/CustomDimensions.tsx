import { Input } from "@/components/ui/input";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";

const CustomDimensions = () => {
  const dimensions = useImageGeneratorStore((s) => s.settings.dimension);
  const setDimensions = useImageGeneratorStore((s) => s.setDimensions);

  return (
    <div className="flex items-center justify-center gap-2 pb-1">
      <Input
        type="number"
        value={dimensions.width}
        min={1}
        step={5}
        onChange={(e) =>
          setDimensions({
            category: "Custom",
            width: Number(e.target.value) <= 0 ? 1 : Number(e.target.value),
          })
        }
        className="w-20"
      />
      x
      <Input
        type="number"
        value={dimensions.height}
        min={1}
        step={5}
        onChange={(e) =>
          setDimensions({
            category: "Custom",
            height: Number(e.target.value) <= 0 ? 1 : Number(e.target.value),
          })
        }
        className="w-20"
      />
    </div>
  );
};

export default CustomDimensions;
