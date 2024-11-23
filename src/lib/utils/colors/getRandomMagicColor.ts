import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";

export const getRandomMagicColor = () => {
  const magicColor =
    useImageGeneratorStore.getState().settings.background.magicColor;

  const randomMagicColor =
    magicColor[Math.floor(Math.random() * magicColor.length)];
  return {
    name: "",
    hex: randomMagicColor,
  };
};