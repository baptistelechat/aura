import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { cn } from "@/lib/utils";
import { Settings2 } from "lucide-react";
import sharp from "sharp";

const FormatSelect = () => {
  const format = useImageGeneratorStore((s) => s.settings.dimension.format);
  const backgroundColor = useImageGeneratorStore(
    (s) => s.settings.background.backgroundColor
  );

  const setDimensions = useImageGeneratorStore((s) => s.setDimensions);

  const formats: (keyof sharp.FormatEnum)[] = [
    "png",
    "jpg",
    "webp",
    "tiff",
    "gif",
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="px-2" size="icon" variant={"outline"}>
          <Settings2 className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit pr-14">
        <RadioGroup
          defaultValue={format}
          onValueChange={(value: string) =>
            setDimensions({ format: value as keyof sharp.FormatEnum })
          }
        >
          <Label className="text-sm text-muted-foreground">Export Format</Label>
          {formats.map((format) => (
            <div key={format} className="flex items-center space-x-2">
              <RadioGroupItem
                value={format}
                id={format}
                disabled={backgroundColor === "" && format !== "png"}
              />
              <p
                className={cn(
                  "text-sm text-muted-foreground",
                  backgroundColor === "" &&
                    format !== "png" &&
                    "text-muted-foreground/60"
                )}
              >
                *.{format}
              </p>
            </div>
          ))}
        </RadioGroup>
      </PopoverContent>
    </Popover>
  );
};

export default FormatSelect;
