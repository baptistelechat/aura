import CustomAccordion from "@/components/CustomAccordion";
import CustomAccordionItem from "@/components/CustomAccordionItem";
import DropZone from "@/components/DropZone";
import ImageSelect from "@/components/ImageSelect";
import { backgroundImages } from "@/lib/constant/backgroundImages";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";

const BackgroundImage = () => {
  const backgroundImage = useImageGeneratorStore(
    (s) => s.settings.background.backgroundImage
  );
  const setBackground = useImageGeneratorStore((s) => s.setBackground);
  const defaultValue = defaultImageGeneratorSettings.background.backgroundImage;

  return (
    <CustomAccordion type="single">
      <DropZone mode="background" />
      {backgroundImages.map((image) => (
        <CustomAccordionItem
          key={image.title.toLowerCase()}
          title={image.title}
          icon={image.icon}
          disabled={backgroundImage === defaultValue}
          reset={() =>
            setBackground({
              backgroundImage: defaultValue,
            })
          }
        >
          <div className="flex w-full flex-col gap-4">
            <ImageSelect
              title={image.title}
              path={image.path}
              totalImages={image.totalImages}
              currentImageName={backgroundImage}
              mode={"background"}
            />
          </div>
        </CustomAccordionItem>
      ))}
    </CustomAccordion>
  );
};

export default BackgroundImage;
