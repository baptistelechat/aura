import { create } from "zustand";
import defaultImageGeneratorSettings from "../constant/defaultImageGeneratorSettings";
import ImageGeneratorSettings from "../types/ImageGeneratorSettings";
import {
  LinearGradientOrientation,
  RadialGradientOrientation,
} from "../types/gradientOrientation";

type DimensionUpdate = {
  width?: number;
  height?: number;
};

type ImageUpdate = {
  src?: string | null;
  borderRadius?: number;
  shadow?: number;
  scale?: number;
  visibility?: boolean;
};

export type ImageGeneratorStoreType = {
  general: {
    hotkeySet: "default" | "mac";
    tab:"image"|"background";
    isDownloading: boolean;
  };
  settings: ImageGeneratorSettings;
  // General
  setTab: (tab: "image" | "background") => void;
  setIsDownloading: (isDownloading: boolean) => void;
  // Refs
  refs: {
    containerRef: React.RefObject<HTMLDivElement> | null;
    previewRef: React.RefObject<HTMLDivElement> | null;
    imageRef: React.RefObject<HTMLImageElement> | null;
  };
  setRefs: (refs: {
    containerRef: React.RefObject<HTMLDivElement>;
    previewRef: React.RefObject<HTMLDivElement>;
    imageRef: React.RefObject<HTMLImageElement>;
  }) => void;
  setText: (text: string) => void;
  // Dimension
  setDimensions: (update: DimensionUpdate) => void;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  // Image
  setImage: (update: ImageUpdate) => void;
  setImageSrc: (src: string) => void;
  setImageBorderRadius: (borderRadius: number) => void;
  setImageShadow: (shadow: number) => void;
  setImageScale: (scale: number) => void;
  setImageVisibility: (visibility: boolean) => void;
  // Background
  setBackgroundMode: (backgroundMode: "solid" | "gradient") => void;
  setBackgroundColor: (backgroundColor: string) => void;
  setTailwindColor: (tailwindColor: string) => void;
  setUseVia: (useVia: boolean) => void;
  setGradientOrientation: (
    orientation: LinearGradientOrientation | RadialGradientOrientation
  ) => void;
  setGradientFrom: (from: { name: string; hex: string }) => void;
  setGradientVia: (via: { name: string; hex: string }) => void;
  setGradientTo: (to: { name: string; hex: string }) => void;
  // Reset
  resetSettings: () => void;
  resetImageBorderRadius: () => void;
  resetImageShadow: () => void;
  resetImageScale: () => void;
  resetBackground: () => void;
  resetBackgroundColor: () => void;
};

const userAgent =
  typeof window !== "undefined" ? window.navigator.userAgent : "";
const hotkeySet = userAgent.includes("Mac") ? "mac" : "default";

const useImageGeneratorStore = create<ImageGeneratorStoreType>((set) => ({
  general : {
    hotkeySet,
    tab: "image",
    isDownloading: false,
  },
  settings: defaultImageGeneratorSettings,

  // General
  setTab: (tab: "image" | "background") => {
    set((state) => ({
      general: {
        ...state.general,
        tab
      }
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
  refs: {
    containerRef: null,
    previewRef: null,
    imageRef: null,
  },

  setRefs: (refs) =>
    set((state) => ({
      refs: {
        ...state.refs,
        ...refs,
      },
    })),

  // Text
  setText: (text: string) => {
    set((state) => ({
      settings: {
        ...state.settings,
        text,
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

  setWidth: (width: number) => {
    set((state) => ({
      settings: {
        ...state.settings,
        dimension: {
          ...state.settings.dimension,
          width,
        },
      },
    }));
  },

  setHeight: (height: number) => {
    set((state) => ({
      settings: {
        ...state.settings,
        dimension: {
          ...state.settings.dimension,
          height,
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

  setImageSrc: (src: string) => {
    set((state) => ({
      settings: {
        ...state.settings,
        image: {
          ...state.settings.image,
          src,
        },
      },
    }));
  },

  setImageBorderRadius: (borderRadius: number) => {
    set((state) => ({
      settings: {
        ...state.settings,
        image: {
          ...state.settings.image,
          borderRadius,
        },
      },
    }));
  },

  setImageShadow: (shadow: number) => {
    set((state) => ({
      settings: {
        ...state.settings,
        image: {
          ...state.settings.image,
          shadow,
        },
      },
    }));
  },

  setImageScale: (scale: number) => {
    set((state) => ({
      settings: {
        ...state.settings,
        image: {
          ...state.settings.image,
          scale,
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
  setBackgroundMode: (backgroundMode: "solid" | "gradient") => {
    set((state) => ({
      settings: {
        ...state.settings,
        background: {
          ...state.settings.background,
          backgroundMode,
        },
      },
    }));
  },

  setBackgroundColor: (backgroundColor: string) => {
    set((state) => ({
      settings: {
        ...state.settings,
        background: {
          ...state.settings.background,
          backgroundColor,
        },
      },
    }));
  },

  setTailwindColor: (tailwindColor: string) => {
    set((state) => ({
      settings: {
        ...state.settings,
        background: {
          ...state.settings.background,
          tailwindColor,
        },
      },
    }));
  },

  setUseVia: (useVia: boolean) => {
    set((state) => ({
      settings: {
        ...state.settings,
        background: {
          ...state.settings.background,
          gradient: {
            ...state.settings.background.gradient,
            useVia,
          },
        },
      },
    }));
  },

  setGradientOrientation: (
    orientation: LinearGradientOrientation | RadialGradientOrientation
  ) => {
    set((state) => ({
      settings: {
        ...state.settings,
        background: {
          ...state.settings.background,
          gradient: {
            ...state.settings.background.gradient,
            orientation,
          },
        },
      },
    }));
  },

  setGradientFrom: (from: { name: string; hex: string }) => {
    set((state) => ({
      settings: {
        ...state.settings,
        background: {
          ...state.settings.background,
          gradient: {
            ...state.settings.background.gradient,
            from,
          },
        },
      },
    }));
  },

  setGradientVia: (via: { name: string; hex: string }) => {
    set((state) => ({
      settings: {
        ...state.settings,
        background: {
          ...state.settings.background,
          gradient: {
            ...state.settings.background.gradient,
            via,
          },
        },
      },
    }));
  },

  setGradientTo: (to: { name: string; hex: string }) => {
    set((state) => ({
      settings: {
        ...state.settings,
        background: {
          ...state.settings.background,
          gradient: {
            ...state.settings.background.gradient,
            to,
          },
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

  resetBackground: () => {
    set((state) => ({
      settings: {
        ...state.settings,
        background: {
          ...defaultImageGeneratorSettings.background,
          backgroundMode: state.settings.background.backgroundMode,
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
}));

export default useImageGeneratorStore;
