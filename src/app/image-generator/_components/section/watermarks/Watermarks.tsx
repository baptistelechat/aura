import CustomAccordion from "@/components/image-generator/CustomAccordion";
import AuraWatermarkControl from "./options/AuraWatermarkControl";
import SocialWatermarkControl from "./options/SocialWatermarkControl";

const Watermarks = () => {
  return (
    <CustomAccordion type="multiple">
      <AuraWatermarkControl />
      <SocialWatermarkControl/>
    </CustomAccordion>
  );
};

export default Watermarks;
