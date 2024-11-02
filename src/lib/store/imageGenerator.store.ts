import { create } from "zustand";
import { defaultImageGeneratorSettings } from "../constant/defaultImageGeneratorSettings";
import {
  BackgroundSettings,
  DimensionSettings,
  ImageGeneratorSettings,
  ImageSettings,
  OverlaySettings,
  WatermarkSettings,
} from "../types/ImageGeneratorSettings";
import { TabNames } from "../types/TabNames";

type DimensionUpdate = Partial<DimensionSettings>;
export type ImageUpdate = Partial<ImageSettings>;
export type BackgroundUpdate = Partial<BackgroundSettings>;
export type OverlayUpdate = Partial<OverlaySettings>;
export type WatermarkUpdate = Partial<WatermarkSettings>;

export type ImageGeneratorStoreType = {
  general: {
    hotkeySet: "default" | "mac";
    tab: TabNames;
    isDownloading: boolean;
  };
  settings: ImageGeneratorSettings;
  // General
  setTab: (tab: TabNames) => void;
  setIsDownloading: (isDownloading: boolean) => void;
  // Refs
  previewRefs: {
    containerRef: React.RefObject<HTMLDivElement> | null;
    previewRef: React.RefObject<HTMLDivElement> | null;
    backgroundRef: React.RefObject<HTMLDivElement> | null;
    imageRef: React.RefObject<HTMLImageElement> | null;
    watermarkRef: React.RefObject<HTMLDivElement> | null;
  };
  setPreviewRefs: (refs: {
    containerRef: React.RefObject<HTMLDivElement>;
    previewRef: React.RefObject<HTMLDivElement>;
    backgroundRef: React.RefObject<HTMLDivElement>;
    imageRef: React.RefObject<HTMLImageElement>;
    watermarkRef: React.RefObject<HTMLDivElement>;
  }) => void;
  // Dimension
  setDimensions: (update: DimensionUpdate) => void;
  // Image
  setImage: (update: ImageUpdate) => void;
  setImageVisibility: (visibility: boolean) => void;
  // Background
  setBackground: (update: BackgroundUpdate) => void;
  // Overlay
  setOverlay: (update: OverlayUpdate) => void;
  // Watermark
  setWatermark: (update: WatermarkUpdate) => void;
  // Reset
  resetSettings: () => void;
  resetImageBorderRadius: () => void;
  resetImageShadow: () => void;
  resetImageScale: () => void;
  resetImageRotate: () => void;
  resetBackground: () => void;
  resetBackgroundBlur: () => void;
  resetBackgroundNoise: () => void;
  resetBackgroundColor: () => void;
  resetOverlay: () => void;
  resetWatermark: () => void;
};

const userAgent =
  typeof window !== "undefined" ? window.navigator.userAgent : "";

const hotkeySet = userAgent.includes("Mac") ? "mac" : "default";

export const useImageGeneratorStore = create<ImageGeneratorStoreType>(
  (set) => ({
    general: {
      hotkeySet,
      tab: "image",
      isDownloading: false,
    },
    settings: defaultImageGeneratorSettings,

    // General
    setTab: (tab: TabNames) => {
      set((state) => ({
        general: {
          ...state.general,
          tab,
        },
      }));
    },

    setIsDownloading: (isDownloading: boolean) => {
      set((state) => ({
        general: {
          ...state.general,
          isDownloading: isDownloading,
        },
      }));
    },
    // Refs
    previewRefs: {
      containerRef: null,
      previewRef: null,
      backgroundRef: null,
      imageRef: null,
      watermarkRef: null,
    },

    setPreviewRefs: (previewRefs) => {
      set((state) => ({
        previewRefs: {
          ...state.previewRefs,
          ...previewRefs,
        },
      }));
    },

    //Dimension
    setDimensions: (update: DimensionUpdate) => {
      set((state) => ({
        settings: {
          ...state.settings,
          dimension: {
            ...state.settings.dimension,
            ...update,
          },
        },
      }));
    },

    // Image
    setImage: (update: ImageUpdate) => {
      set((state) => ({
        settings: {
          ...state.settings,
          image: {
            ...state.settings.image,
            ...update,
          },
        },
      }));
    },

    setImageVisibility: (visibility: boolean) => {
      set((state) => ({
        settings: {
          ...state.settings,
          image: {
            ...state.settings.image,
            visibility,
          },
        },
      }));
    },

    // Background
    setBackground: (update: BackgroundUpdate) => {
      set((state) => ({
        settings: {
          ...state.settings,
          background: {
            ...state.settings.background,
            ...update,
          },
        },
      }));
    },

    // Overlay
    setOverlay: (update: OverlayUpdate) => {
      set((state) => ({
        settings: {
          ...state.settings,
          overlay: {
            ...state.settings.overlay,
            ...update,
          },
        },
      }));
    },

    // Watermark
    setWatermark: (update: WatermarkUpdate) => {
      set((state) => ({
        settings: {
          ...state.settings,
          watermark: {
            ...state.settings.watermark,
            ...update,
          },
        },
      }));
    },

    // Reset
    resetSettings: () => {
      set({
        settings: defaultImageGeneratorSettings,
      });
    },

    resetImageBorderRadius: () => {
      set((state) => ({
        settings: {
          ...state.settings,
          image: {
            ...state.settings.image,
            borderRadius: defaultImageGeneratorSettings.image.borderRadius,
          },
        },
      }));
    },

    resetImageShadow: () => {
      set((state) => ({
        settings: {
          ...state.settings,
          image: {
            ...state.settings.image,
            shadow: defaultImageGeneratorSettings.image.shadow,
          },
        },
      }));
    },

    resetImageScale: () => {
      set((state) => ({
        settings: {
          ...state.settings,
          image: {
            ...state.settings.image,
            scale: defaultImageGeneratorSettings.image.scale,
          },
        },
      }));
    },

    resetImageRotate: () => {
      set((state) => ({
        settings: {
          ...state.settings,
          image: {
            ...state.settings.image,
            rotateX: defaultImageGeneratorSettings.image.rotateX,
            rotateY: defaultImageGeneratorSettings.image.rotateY,
            rotateZ: defaultImageGeneratorSettings.image.rotateZ,
          },
        },
      }));
    },

    resetBackground: () => {
      set((state) => ({
        settings: {
          ...state.settings,
          background: {
            ...defaultImageGeneratorSettings.background,
            backgroundMode: state.settings.background.backgroundMode,
            magicColor: state.settings.background.magicColor,
          },
        },
      }));
    },

    resetBackgroundBlur: () => {
      set((state) => ({
        settings: {
          ...state.settings,
          background: {
            ...state.settings.background,
            blur: defaultImageGeneratorSettings.background.blur,
          },
        },
      }));
    },

    resetBackgroundNoise: () => {
      set((state) => ({
        settings: {
          ...state.settings,
          background: {
            ...state.settings.background,
            noise: defaultImageGeneratorSettings.background.noise,
          },
        },
      }));
    },

    resetBackgroundColor: () => {
      set((state) => ({
        settings: {
          ...state.settings,
          backgroundColor:
            defaultImageGeneratorSettings.background.backgroundColor,
        },
      }));
    },

    resetOverlay: () => {
      set((state) => ({
        settings: {
          ...state.settings,
          overlay: {
            name: defaultImageGeneratorSettings.overlay.name,
            opacity: defaultImageGeneratorSettings.overlay.opacity,
          },
        },
      }));
    },

    resetWatermark: () => {
      set((state) => ({
        settings: {
          ...state.settings,
          watermark: {
            position: defaultImageGeneratorSettings.watermark.position,
            background: defaultImageGeneratorSettings.watermark.background,
            foreground: defaultImageGeneratorSettings.watermark.foreground,
          },
        },
      }));
    },
  })
);
