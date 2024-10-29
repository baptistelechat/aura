import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { dimensions } from "@/lib/constant/dimensions";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";

const DimensionSelect = () => {
  const category = useImageGeneratorStore((s) => s.settings.dimension.category);
  const width = useImageGeneratorStore((s) => s.settings.dimension.width);
  const height = useImageGeneratorStore((s) => s.settings.dimension.height);
  const setDimensions = useImageGeneratorStore((s) => s.setDimensions);

  return (
    <Select
      value={`${category}_${width}x${height}`}
      onValueChange={(value) => {
        const category = value.split('_')[0];
        const [width, height] = value.split('_')[1].split("x").map(Number);
        setDimensions({category, width, height });
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a size" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(dimensions).map(([category, dims]) => (
          <SelectGroup key={category}>
            <SelectLabel>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </SelectLabel>
            {dims.map((dimension) => (
              <SelectItem
                key={`${category}_${dimension.width}x${dimension.height}`}
                value={`${category}_${dimension.width}x${dimension.height}`}
              >
                <div className="flex items-center gap-2">
                  {`${dimension.width}x${dimension.height} (${dimension.ratio})`}
                  <Label>{dimension.title}</Label>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DimensionSelect;
