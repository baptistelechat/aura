import { ImageGeneratorSettings } from "../types/ImageGeneratorSettings";

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
    backgroundColor: "#e2e8f0",
    tailwindColor: "Slate-200",
    gradient: {
      useVia: true,
      orientation: 135,
      from: {
        name: "Slate-200",
        hex: "#e2e8f0",
      },
      via: {
        name: "Slate-200",
        hex: "#e2e8f0",
      },
      to: {
        name: "Slate-200",
        hex: "#e2e8f0",
      },
    },
    magicColor: [],
  },
  watermark: {
    position: "bottom-right",
    background: "light",
    foreground: "color-dark",
  },
};
