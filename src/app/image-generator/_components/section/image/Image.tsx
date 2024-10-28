import CustomAccordion from "@/components/CustomAccordion";
import ImageBorder from "./options/ImageBorder";
import ImageShadow from "./options/ImageShadow";
import ImageSize from "./options/ImageSize";
import ImageRotation from "./options/ImageRotation";

const Image = () => {

  return (
    <CustomAccordion type="multiple">
      <ImageSize />
      <ImageBorder />
      <ImageShadow />
      <ImageRotation />
    </CustomAccordion>
  );
};

export default Image;
