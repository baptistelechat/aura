import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { getRandomMagicColor } from "../../colors/getRandomMagicColor";

export const setRandomMagicBackground = () => {
  const setBackground = useImageGeneratorStore.getState().setBackground;
  const magicColor =
    useImageGeneratorStore.getState().settings.background.magicColor;
  const defaultBackgroundSettings = defaultImageGeneratorSettings.background;

  const randomColor = getRandomMagicColor();
  setBackground({
    ...defaultBackgroundSettings,
    backgroundColor: randomColor.hex,
    magicColor,
  });
};
