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
import {
  Camera,
  Dribbble,
  Facebook,
  Instagram,
  Linkedin,
  Ruler,
  Twitter,
  UserPen,
  Video,
  Youtube,
} from "lucide-react";

const Icon = (category: string) => {
  if (category === "Custom") return <UserPen className="size-4" />;
  if (category === "Default") return <Ruler className="size-4" />;
  if (category === "Instagram") return <Instagram className="size-4" />;
  if (category === "Twitter (X)") return <Twitter className="size-4" />;
  if (category === "Facebook") return <Facebook className="size-4" />;
  if (category === "TikTok") return <Video className="size-4" />;
  if (category === "Pinterest") return <Camera className="size-4" />;
  if (category === "Linkedin") return <Linkedin className="size-4" />;
  if (category === "Dribble") return <Dribbble className="size-4" />;
  if (category === "Youtube") return <Youtube className="size-4" />;
  return <Ruler className="size-4" />;
};

const DimensionSelect = () => {
  const category = useImageGeneratorStore((s) => s.settings.dimension.category);
  const width = useImageGeneratorStore((s) => s.settings.dimension.width);
  const height = useImageGeneratorStore((s) => s.settings.dimension.height);
  const setDimensions = useImageGeneratorStore((s) => s.setDimensions);

  const handleValueChange = (value: string) => {
    const category = value.split("_")[0];
    const [width, height] = value.split("_")[1].split("x").map(Number);
    setDimensions({ category, width, height });
  };

  return (
    <Select
      value={`${category}_${width}x${height}`}
      onValueChange={(value) => {
        handleValueChange(value);
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a size" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="flex items-center gap-2">
            {Icon("Custom")}
            Custom
          </SelectLabel>
          <SelectItem value={`Custom_${width}x${height}`}>
            <div className="flex items-center gap-2">
              {`${width}x${height}`}
              <Label>Custom</Label>
            </div>
          </SelectItem>
        </SelectGroup>
        {Object.entries(dimensions).map(([category, dims]) => (
          <SelectGroup key={category}>
            <SelectLabel className="flex items-center gap-2">
              {Icon(category)}
              {category}
            </SelectLabel>
            {dims.map((dimension) => (
              <SelectItem
                key={`${category}_${dimension.width}x${dimension.height}`}
                value={`${category}_${dimension.width}x${dimension.height}`}
              >
                <div className="flex items-center gap-2">
                  {`${dimension.width}x${dimension.height} ${
                    dimension.ratio === "" ? "" : `(${dimension.ratio})`
                  }`}
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
