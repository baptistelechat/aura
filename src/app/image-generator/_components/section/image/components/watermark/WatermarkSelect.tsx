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

const watermarks: {
  background: "light" | "dark" | "color-light" | "color-dark" | "transparent";
  foreground: "light" | "dark" | "color-light" | "color-dark";
}[] = [
  { background: "light", foreground: "dark" },
  { background: "light", foreground: "color-dark" },
  { background: "light", foreground: "color-light" },
  { background: "dark", foreground: "light" },
  { background: "dark", foreground: "color-light" },
  { background: "color-dark", foreground: "light" },
  { background: "color-light", foreground: "light" },
  { background: "color-light", foreground: "dark" },
  { background: "transparent", foreground: "light" },
  { background: "transparent", foreground: "dark" },
  { background: "transparent", foreground: "color-light" },
  { background: "transparent", foreground: "color-dark" },
];

const WatermarkSelect = () => {
  const background = useImageGeneratorStore(
    (s) => s.settings.watermark.background
  );
  const foreground = useImageGeneratorStore(
    (s) => s.settings.watermark.foreground
  );

  const setBackground = useImageGeneratorStore((s) => s.setWatermarkBackground);
  const setForeground = useImageGeneratorStore((s) => s.setWatermarkForeground);

  return (
    <div className="flex w-full flex-col gap-4">
      <Label>Variant</Label>
      <Select
        value={`${background}/${foreground}`}
        onValueChange={(value) => {
          const [background, foreground] = value.split("/");
          setBackground(
            background as
              | "light"
              | "dark"
              | "color-light"
              | "color-dark"
              | "transparent"
          );
          setForeground(
            foreground as "light" | "dark" | "color-light" | "color-dark"
          );
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a size" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {watermarks.map((watermark) => (
              <SelectItem
                key={watermark.background + watermark.foreground}
                value={`${watermark.background}/${watermark.foreground}`}
              >
                {watermark.background}/{watermark.foreground}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default WatermarkSelect;
