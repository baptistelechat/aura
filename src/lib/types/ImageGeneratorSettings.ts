import TailwindGradientOrientation from "./TailwindGradientOrientation";

type ImageGeneratorSettings = {
  text: string;
  dimension: {
    width: number;
    height: number;
  };
  image: {
    src: string | null;
    borderRadius: number;
    shadow: number;
    scale: number;
    visibility: boolean;
  };
  background: {
    backgroundColor: string;
    tailwindGradient: {
      orientation: TailwindGradientOrientation;
      from: string;
      via: string;
      to: string;
    };
  };
};

export default ImageGeneratorSettings;