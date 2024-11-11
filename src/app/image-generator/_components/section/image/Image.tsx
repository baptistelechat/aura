import CustomAccordion from "@/components/image-generator/CustomAccordion";
import ImageBorder from "./options/ImageBorder";
import ImageRotation from "./options/ImageRotation";
import ImageShadow from "./options/ImageShadow";
import ImageSize from "./options/ImageSize";

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
