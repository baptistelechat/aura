import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { WatermarkIcon } from "@/lib/types/ImageGeneratorSettings";
import { getSocialIconWatermarkColor } from "@/lib/utils/colors/watermarks/getSocialIconWatermarkColor";
import { useTheme } from "next-themes";
import Image from "next/image";

const icons = [
  "facebook",
  "github",
  "instagram",
  "linkedin",
  "pinterest",
  "snapchat",
  "x",
];

const SocialWatermarkIconSelect = () => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const socialWatermark = useImageGeneratorStore(
    (s) => s.settings.watermark.social
  );

  const setWatermark = useImageGeneratorStore((s) => s.setWatermark);

  return (
    <div className="flex w-full flex-col gap-4">
      {/* <Label>Icon</Label> */}
      <Select
        value={socialWatermark.icon}
        onValueChange={(value) => {
          setWatermark({
            social: {
              ...socialWatermark,
              icon: value as WatermarkIcon,
            },
          });
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a watermark style" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {icons.map((icon) => (
              <SelectItem key={icon} value={icon}>
                <div className="flex items-center gap-2">
                  <Image
                    src={`/images/assets/social/${icon}.svg`}
                    alt={`${icon} icon`}
                    width={16}
                    height={16}
                    style={{
                      filter: getSocialIconWatermarkColor(currentTheme),
                    }}
                  />
                  {icon === "x"
                    ? "Twitter (X)"
                    : icon.charAt(0).toUpperCase() + icon.slice(1)}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SocialWatermarkIconSelect;
