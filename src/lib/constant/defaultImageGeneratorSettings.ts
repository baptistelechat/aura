import ImageGeneratorSettings from "../types/ImageGeneratorSettings";

const defaultImageGeneratorSettings: ImageGeneratorSettings = {
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
    backgroundColor: "#ffffff",
    tailwindGradient: {
      orientation: 135,
      from: "",
      via: "",
      to: "",
    },
  },
};

export default defaultImageGeneratorSettings;