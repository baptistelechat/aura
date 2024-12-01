import { WatermarkBackgroundColor } from "@/lib/types/ImageGeneratorSettings";

export const getWatermarkBackgroundClass = (background: WatermarkBackgroundColor) => {
  switch (background) {
    case "light":
      return "bg-white";
    case "dark":
      return "bg-black";
    case "color-dark":
      return "bg-[#0E4598]";
    case "color-light":
      return "bg-[#1573FE]";
    case "transparent":
      return "bg-transparent";
    default:
      return "bg-transparent";
  }
};