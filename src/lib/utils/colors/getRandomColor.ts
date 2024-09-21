import { ColorTranslator } from "colortranslator";

const getRandomColor = () => {
  const randomRed = Math.floor(Math.random() * 256);
  const randomGreen = Math.floor(Math.random() * 256);
  const randomBlue = Math.floor(Math.random() * 256);

  const randomHexColor = ColorTranslator.toHEX({
    R: randomRed,
    G: randomGreen,
    B: randomBlue,
  });

  console.log(randomHexColor);

  return { name: "", hex: randomHexColor };
};

export default getRandomColor;
