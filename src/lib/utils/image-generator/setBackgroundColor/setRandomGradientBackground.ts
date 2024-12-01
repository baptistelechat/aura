import { gradientOrientations } from "@/lib/constant/gradientOrientations";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import {
  LinearGradientOrientation,
  RadialGradientOrientation,
} from "@/lib/types/gradientOrientation";
import { getRandomColor } from "../../colors/background-color/getRandomColor";
import { getRandomMagicColor } from "../../colors/background-color/getRandomMagicColor";
import { getRandomTailwindColor } from "../../colors/background-color/getRandomTailwindColor";

export const setRandomGradientBackground = (
  variant: "custom" | "custom-gradient" | "tailwind-gradient" | "magic-gradient"
) => {
  const gradient =
    useImageGeneratorStore.getState().settings.background.gradient;
  const setBackground = useImageGeneratorStore.getState().setBackground;
  const defaultImageGeneratorSettings =
    useImageGeneratorStore.getState().settings;

  const gradientType = ["linear", "radial"][Math.floor(Math.random() * 2)] as
    | "linear"
    | "radial";

  const validOrientations = gradientOrientations[gradientType].filter(
    (o) => o.angle !== null && o.angle !== gradient.orientation
  );
  const randomIndex = Math.floor(Math.random() * validOrientations.length);

  const randomFrom =
    variant === "custom-gradient"
      ? getRandomColor()
      : variant === "tailwind-gradient"
      ? getRandomTailwindColor()
      : getRandomMagicColor();

  const randomTo =
    variant === "custom-gradient"
      ? getRandomColor()
      : variant === "tailwind-gradient"
      ? getRandomTailwindColor()
      : getRandomMagicColor();

  const shouldSetVia = Math.random() > 0.25;

  if (shouldSetVia) {
    const randomVia =
      variant === "custom-gradient"
        ? getRandomColor()
        : variant === "tailwind-gradient"
        ? getRandomTailwindColor()
        : getRandomMagicColor();

    setBackground({
      backgroundMode: "gradient",
      backgroundColor: defaultImageGeneratorSettings.background.backgroundColor,
      backgroundImage: null,
      tailwindColor: "",
      gradient: {
        ...gradient,
        useVia: true,
        orientation: validOrientations[randomIndex].angle as
          | LinearGradientOrientation
          | RadialGradientOrientation,
        from: randomFrom,
        via: randomVia,
        to: randomTo,
      },
    });
  } else {
    setBackground({
      backgroundMode: "gradient",
      backgroundColor: defaultImageGeneratorSettings.background.backgroundColor,
      backgroundImage: null,
      tailwindColor: "",
      gradient: {
        ...gradient,
        useVia: false,
        orientation: validOrientations[randomIndex].angle as
          | LinearGradientOrientation
          | RadialGradientOrientation,
        from: randomFrom,
        via: {
          name: "",
          hex: "",
        },
        to: randomTo,
      },
    });
  }
};
