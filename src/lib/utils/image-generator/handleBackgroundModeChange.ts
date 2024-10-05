import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";


export const handleBackgroundModeChange = () => {
  const imageGeneratorStore = useImageGeneratorStore.getState();

  const backgroundMode = imageGeneratorStore.settings.background.backgroundMode;
  const setBackgroundMode = imageGeneratorStore.setBackgroundMode;
  const resetBackground = imageGeneratorStore.resetBackground;

    if (backgroundMode === "gradient") {
      setBackgroundMode("solid");
    } else {
      setBackgroundMode("gradient");
    }
    resetBackground();
}