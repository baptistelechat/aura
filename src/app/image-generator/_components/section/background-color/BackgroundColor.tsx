import CustomAccordion from "@/components/image-generator/CustomAccordion";
import CustomColor from "./options/customColor/CustomColor";
import MagicColor from "./options/magicColor/MagicColor";
import TailwindColor from "./options/tailwindColor/TailwindColor";
import TransparentButton from "./options/TransparentButton";

const BackgroundColor = () => {
  return (
    <CustomAccordion type="single">
      <CustomColor />
      <TailwindColor />
      <MagicColor />
      <TransparentButton />
    </CustomAccordion>
  );
};

export default BackgroundColor;
