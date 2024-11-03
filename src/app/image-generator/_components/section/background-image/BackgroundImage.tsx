import CustomAccordion from "@/components/CustomAccordion";
import DropZone from "@/components/DropZone";

const BackgroundImage = () => {
  return (
    <CustomAccordion type="single">
      <DropZone mode="background" />
    </CustomAccordion>
  );
};

export default BackgroundImage;
