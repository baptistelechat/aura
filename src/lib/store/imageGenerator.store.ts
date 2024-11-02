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
    isSafari: boolean;
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
  resetBackground: () => void;
};

const userAgent =
  typeof window !== "undefined" ? window.navigator.userAgent : "";

const hotkeySet = userAgent.includes("Mac") ? "mac" : "default";

  const isSafari =
    userAgent.includes("Safari") &&
    !userAgent.includes("Chrome") &&
    !userAgent.includes("Chromium");

export const useImageGeneratorStore = create<ImageGeneratorStoreType>(
  (set) => ({
    general: {
      hotkeySet,
      isSafari,
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
  })
);
