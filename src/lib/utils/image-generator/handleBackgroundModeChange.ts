import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";

export const handleBackgroundModeChange = () => {
  const imageGeneratorStore = useImageGeneratorStore.getState();

  const backgroundMode = imageGeneratorStore.settings.background.backgroundMode;
  const setBackground = imageGeneratorStore.setBackground;
  const resetBackground = imageGeneratorStore.resetBackground;

  if (backgroundMode === "gradient") {
    setBackground({
      backgroundMode: "solid",
    });
  } else {
    setBackground({
      backgroundMode: "gradient",
    });
  }
  resetBackground();
};
