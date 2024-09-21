import tailwindColors from "@/lib/constant/tailwindColors";

// Typage explicite des nuances de couleur
type TailwindColorShades = Record<string, string>;

const getRandomTailwindColor = () => {
  const colorKeys = Object.keys(
    tailwindColors
  ) as (keyof typeof tailwindColors)[];

  const randomColorKey =
    colorKeys[Math.floor(Math.random() * colorKeys.length)];

  const colorShades = tailwindColors[randomColorKey] as TailwindColorShades;

  const shades = Object.keys(colorShades);

  const randomShade = shades[Math.floor(Math.random() * shades.length)];

  return {
    name: `${randomColorKey}-${randomShade}`,
    hex: colorShades[randomShade],
  };
};

export default getRandomTailwindColor;
