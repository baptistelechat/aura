import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { getRandomColor } from "../../colors/getRandomColor";

export const setRandomCustomBackground = () => {
  const setBackground = useImageGeneratorStore.getState().setBackground;
  const magicColor =
    useImageGeneratorStore.getState().settings.background.magicColor;
  const defaultBackgroundSettings = defaultImageGeneratorSettings.background;

  const randomColor = getRandomColor();
  setBackground({
    ...defaultBackgroundSettings,
    backgroundColor: randomColor.hex,
    magicColor
  });
};
