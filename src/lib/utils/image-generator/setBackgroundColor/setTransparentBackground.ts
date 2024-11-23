import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";

export const setTransparentBackground = () => {
  const imageGeneratorStore = useImageGeneratorStore.getState();

  const gradient = imageGeneratorStore.settings.background.gradient;
  
  const setBackground = imageGeneratorStore.setBackground;
  const setDimensions = imageGeneratorStore.setDimensions;

  const resetBackground = imageGeneratorStore.resetBackground;

  resetBackground();
  setDimensions({ format: "png" });
  setBackground({
    backgroundMode: "solid",
    backgroundColor: "",
    tailwindColor: "",
    gradient: {
      ...gradient,
      useVia: false,
    },
  });
};
