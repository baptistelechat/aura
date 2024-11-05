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
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { cn } from "@/lib/utils";
import { CircleOff } from "lucide-react";

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

const watermarkColor = {
  light: "bg-white",
  dark: "bg-black",
  "color-light": "bg-[#1573FE]",
  "color-dark": "bg-[#0E4598]",
  transparent: "bg-transparent",
};

const WatermarkSelect = () => {
  const background = useImageGeneratorStore(
    (s) => s.settings.watermark.background
  );
  const foreground = useImageGeneratorStore(
    (s) => s.settings.watermark.foreground
  );

  const setWatermark = useImageGeneratorStore((s) => s.setWatermark);

  const groupedWatermarks = watermarks.reduce((groups, watermark) => {
    (groups[watermark.background] = groups[watermark.background] || []).push(
      watermark
    );
    return groups;
  }, {} as Record<string, { background: string; foreground: string }[]>);

  return (
    <div className="flex w-full flex-col gap-4">
      <Label>Style</Label>
      <Select
        value={`${background}/${foreground}`}
        onValueChange={(value) => {
          const [background, foreground] = value.split("/");
          setWatermark({
            background: background as
              | "light"
              | "dark"
              | "color-light"
              | "color-dark"
              | "transparent",
            foreground : foreground as "light" | "dark" | "color-light" | "color-dark",
          });
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a watermark style" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(groupedWatermarks).map(([background, items]) => (
            <SelectGroup key={background}>
              <SelectLabel>
                {background.charAt(0).toUpperCase() + background.slice(1)}
              </SelectLabel>
              {items.map((watermark) => (
                <SelectItem
                  key={`${watermark.background}/${watermark.foreground}`}
                  value={`${watermark.background}/${watermark.foreground}`}
                >
                  <div className="flex gap-1">
                    <div
                      className={cn(
                        "h-6 w-14 rounded border border-input flex items-center justify-center",
                        watermarkColor[
                          watermark.background as
                            | "light"
                            | "dark"
                            | "color-light"
                            | "color-dark"
                            | "transparent"
                        ]
                      )}
                    >
                      {watermark.background === "transparent" && (
                        <CircleOff className="size-4" />
                      )}
                    </div>
                    <div
                      className={cn(
                        "h-6 w-14 rounded border border-input",
                        watermarkColor[
                          watermark.foreground as
                            | "light"
                            | "dark"
                            | "color-light"
                            | "color-dark"
                        ]
                      )}
                    />
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default WatermarkSelect;
