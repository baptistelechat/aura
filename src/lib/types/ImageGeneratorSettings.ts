import sharp from "sharp";
import {
  LinearGradientOrientation,
  RadialGradientOrientation,
} from "./gradientOrientation";
import { ImageCollection } from "./ImageCollection";

export type DimensionSettings = {
  format: keyof sharp.FormatEnum;
  category: string;
  width: number;
  height: number;
};

export type ImageSettings = {
  src: string | null;
  width: number;
  height: number;
  coef: number;
  borderRadius: number;
  shadow: number;
  scale: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  visibility: boolean;
};

export type BackgroundSettings = {
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
  freeImageBank: {
    unsplash: {
      searchValue: string;
      images: ImageCollection;
    };
    pixabay: {
      searchValue: string;
      images: ImageCollection;
    };
  };
};

export type OverlaySettings = {
  name: string;
  opacity: number;
};

export type WatermarkSettings = {
  position:
    | "origin-top-left"
    | "origin-top-right"
    | "origin-bottom-left"
    | "origin-bottom-right";
  background: "color-light" | "color-dark" | "light" | "dark" | "transparent";
  foreground: "color-light" | "color-dark" | "light" | "dark";
};

export type ImageGeneratorSettings = {
  dimension: DimensionSettings;
  image: ImageSettings;
  background: BackgroundSettings;
  overlay: OverlaySettings;
  watermark: WatermarkSettings;
};
