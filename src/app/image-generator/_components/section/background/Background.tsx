import CustomAccordion from "@/components/CustomAccordion";
import BackgroundImage from "./options/BackgroundImage";
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
      <TransparentButton />
    </CustomAccordion>
  );
};

export default Background;
