import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";

const setBackground = useImageGeneratorStore.getState().setBackground;
const setOverlay = useImageGeneratorStore.getState().setOverlay;

export const handleImageClick = (
  path: string,
  mode: "background" | "overlay"
) => {
  if (mode === "background") {
    setBackground({
      backgroundImage: path,
    });
  }

  if (mode === "overlay") {
    setOverlay({
      name: path,
    });
  }

  return;
};
