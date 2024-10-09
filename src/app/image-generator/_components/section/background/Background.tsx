import CustomAccordion from "@/components/CustomAccordion";
import BackgroundBlur from "./options/BackgroundBlur";
import BackgroundImage from "./options/BackgroundImage";
import BackgroundNoise from "./options/BackgroundNoise";
import CustomColor from "./options/customColor/CustomColor";
import MagicColor from "./options/magicColor/MagicColor";
import TailwindColor from "./options/tailwindColor/TailwindColor";
import TransparentButton from "./options/TransparentButton";

const Background = () => {
  return (
    <CustomAccordion type="single">
      <CustomColor />
      <TailwindColor />
      <MagicColor />
      <BackgroundImage />
      <BackgroundBlur />
      <BackgroundNoise />
      <TransparentButton />
    </CustomAccordion>
  );
};

export default Background;
