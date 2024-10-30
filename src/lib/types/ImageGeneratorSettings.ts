import {
  LinearGradientOrientation,
  RadialGradientOrientation,
} from "./gradientOrientation";

export type ImageGeneratorSettings = {
  dimension: {
    category: string;
    width: number;
    height: number;
  };
  image: {
    src: string | null;
    borderRadius: number;
    shadow: number;
    scale: number;
    rotateX: number;
    rotateY: number;
    rotateZ: number;
    visibility: boolean;
  };
  background: {
    backgroundMode: "solid" | "gradient";
    blur: number;
    noise: number;
    backgroundColor: string;
    tailwindColor: string;
    gradient: {
      useVia: boolean;
      orientation: LinearGradientOrientation | RadialGradientOrientation;
      from: {
        name: string;
        hex: string;
      };
      via: {
        name: string;
        hex: string;
      };
      to: {
        name: string;
        hex: string;
      };
    };
    magicColor: string[];
    backgroundImage: string | null;
  };
  overlay: {
    name: string;
    opacity: number;
  };
  watermark: {
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    background: "color-light" | "color-dark" | "light" | "dark" | "transparent";
    foreground: "color-light" | "color-dark" | "light" | "dark";
  };
};
