import { WatermarkForegroundColor } from "@/lib/types/ImageGeneratorSettings";

export const getWatermarkTextClass = (
  foreground: WatermarkForegroundColor
) => {
  switch (foreground) {
    case "light":
      return "text-white";
    case "dark":
      return "text-black";
    case "color-dark":
      return "text-[#0E4598]";
    case "color-light":
      return "text-[#1573FE]";
    default:
      return "";
  }
};
