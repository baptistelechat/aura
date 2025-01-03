import CustomAccordion from "@/components/image-generator/CustomAccordion";
import BackgroundBlur from "../background-color/options/BackgroundBlur";
import BackgroundNoise from "../background-color/options/BackgroundNoise";

const BackgroundEffects = () => {
  return (
    <CustomAccordion type="multiple">
      <BackgroundBlur />
      <BackgroundNoise />
    </CustomAccordion>
  );
};

export default BackgroundEffects;
