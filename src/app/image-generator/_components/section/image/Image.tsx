import CustomAccordion from "@/components/CustomAccordion";
import { Input } from "@/components/ui/input";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import ImageBorder from "./options/ImageBorder";
import ImageShadow from "./options/ImageShadow";
import ImageSize from "./options/ImageSize";
import ImageVisibility from "./options/ImageVisibility";
import OverlayShadow from "./options/OverlayShadow";
import Watermark from "./options/Watermark";

const Image = () => {
  const text = useImageGeneratorStore((s) => s.settings.text);
  const setText = useImageGeneratorStore((s) => s.setText);

  return (
    <CustomAccordion type="multiple">
      <ImageBorder />
      <ImageShadow />
      <ImageSize />
      <OverlayShadow />
      <Watermark />
      <ImageVisibility />
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text"
        className="mx-1"
      />
    </CustomAccordion>
  );
};

export default Image;
