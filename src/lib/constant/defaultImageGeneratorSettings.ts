import { ImageGeneratorSettings } from "../types/ImageGeneratorSettings";

export const defaultColor = "#e2e8f0";

export const defaultImageGeneratorSettings: ImageGeneratorSettings = {
  text: "Your Text Here",
  dimension: {
    width: 1920,
    height: 1080,
  },
  image: {
    src: null,
    borderRadius: 24,
    shadow: 0.5,
    scale: 0.5,
    visibility: false,
  },
  background: {
    backgroundMode: "solid",
    blur: 0,
    noise: 0,
    backgroundColor: defaultColor,
    tailwindColor: "Slate-200",
    gradient: {
      useVia: true,
      orientation: 135,
      from: {
        name: "Slate-200",
        hex: defaultColor,
      },
      via: {
        name: "Slate-200",
        hex: defaultColor,
      },
      to: {
        name: "Slate-200",
        hex: defaultColor,
      },
    },
    magicColor: [],
    backgroundImage: null,
  },
  overlay: {
    name: "",
    opacity: 50,
  },
  watermark: {
    position: "bottom-right",
    background: "light",
    foreground: "color-dark",
  },
};
