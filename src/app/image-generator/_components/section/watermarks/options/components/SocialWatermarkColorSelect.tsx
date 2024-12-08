import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { WatermarkForegroundColor } from "@/lib/types/ImageGeneratorSettings";
import { cn } from "@/lib/utils";

const watermarks = ["light", "dark", "color-light", "color-dark"];

const watermarkColor = {
  light: "bg-white",
  dark: "bg-black",
  "color-light": "bg-[#1573FE]",
  "color-dark": "bg-[#0E4598]",
  transparent: "bg-transparent",
};

const SocialWatermarkColorSelect = () => {
  const socialWatermark = useImageGeneratorStore(
    (s) => s.settings.watermark.social
  );

  const setWatermark = useImageGeneratorStore((s) => s.setWatermark);

  return (
    <div className="flex w-full flex-col gap-4">
      <Label>Style</Label>
      <Select
        value={socialWatermark.foreground}
        onValueChange={(value) => {
          setWatermark({
            social: {
              ...socialWatermark,
              foreground: value as
                | "light"
                | "dark"
                | "color-light"
                | "color-dark",
            },
          });
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a watermark style" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {watermarks.map((watermark) => (
              <SelectItem key={watermark} value={watermark}>
                <div
                  className={cn(
                    "h-6 w-28 rounded border border-input",
                    watermarkColor[watermark as WatermarkForegroundColor]
                  )}
                />
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SocialWatermarkColorSelect;
