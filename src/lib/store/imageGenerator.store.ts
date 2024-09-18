import { create } from "zustand";

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

type BackgroundUpdate = {
  backgroundColor?: string;
  tailwindColor?: string;
};

type ColorMode = "custom" | "tailwind";

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
    colorMode: ColorMode;
    backgroundColor: string;
    tailwindColor: string;
  };
};

export type ImageGeneratorStoreType = {
  settings: ImageGeneratorSettings;
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
  setBackground: (update: BackgroundUpdate) => void;
  setColorMode: (colorMode: ColorMode) => void;
  setBackgroundColor: (backgroundColor: string) => void;
  setTailwindColor: (tailwindColor: string) => void;
  // Reset
  resetSettings: () => void;
  resetImageBorderRadius: () => void;
  resetImageShadow: () => void;
  resetImageScale: () => void;
  resetBackground: () => void;
  resetBackgroundColor: () => void;
  resetTailwindColor: () => void;
};

export const defaultSettings: ImageGeneratorSettings = {
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
    colorMode: "custom",
    backgroundColor: "#ffffff",
    tailwindColor: "",
  },
};

const useImageGeneratorStore = create<ImageGeneratorStoreType>((set) => ({
  settings: defaultSettings,

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

  setColorMode: (colorMode: ColorMode) => {
    set((state) => ({
      settings: {
        ...state.settings,
        background: {
          ...state.settings.background,
          colorMode,
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

  // Reset
  resetSettings: () => {
    set({
      settings: defaultSettings,
    });
  },

  resetImageBorderRadius: () => {
    set((state) => ({
      settings: {
        ...state.settings,
        image: {
          ...state.settings.image,
          borderRadius: defaultSettings.image.borderRadius,
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
          shadow: defaultSettings.image.shadow,
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
          scale: defaultSettings.image.scale,
        },
      },
    }));
  },

  resetBackground: () => {
    set((state) => ({
      settings: {
        ...state.settings,
        background: defaultSettings.background,
      },
    }));
  },

  resetBackgroundColor: () => {
    set((state) => ({
      settings: {
        ...state.settings,
        backgroundColor: defaultSettings.background.backgroundColor,
      },
    }));
  },

  resetTailwindColor: () => {
    set((state) => ({
      settings: {
        ...state.settings,
        tailwindColor: defaultSettings.background.tailwindColor,
      },
    }));
  },
}));

export default useImageGeneratorStore;
