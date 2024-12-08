import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";

export const getSocialIconWatermarkColor = (
  theme?: string
) => {
  const foreground =  
    useImageGeneratorStore.getState().settings.watermark.social.foreground;

  const black =
    "invert(0%) sepia(5%) saturate(0%) hue-rotate(3deg) brightness(101%) contrast(104%)";
  const white =
    "invert(100%) sepia(0%) saturate(7490%) hue-rotate(18deg) brightness(105%) contrast(103%)";
  const dark =
    "invert(16%) sepia(93%) saturate(2096%) hue-rotate(207deg) brightness(98%) contrast(93%)"; //#0E4598
  const light =
    "brightness(0) saturate(100%) invert(37%) sepia(92%) saturate(3015%) hue-rotate(205deg) brightness(97%) contrast(107%)"; //#1573FE

  switch (foreground) {
    case "light":
      return !theme ? white : theme === "dark" ? white : black;
    case "dark":
      return !theme ? black : theme === "dark" ? white : black;
    case "color-dark":
      return dark;
    case "color-light":
      return light;
    default:
      return "";
  }
};
