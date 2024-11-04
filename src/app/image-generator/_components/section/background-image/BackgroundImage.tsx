import CustomAccordion from "@/components/CustomAccordion";
import CustomAccordionItem from "@/components/CustomAccordionItem";
import DropZone from "@/components/DropZone";
import ImageSelect from "@/components/ImageSelect";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { palmtreeIslandSun } from "@lucide/lab";
import { Disc3, Icon } from "lucide-react";
import { ReactElement } from "react";

type BgImage = {
  title: string;
  icon: ReactElement;
  path: string;
  totalImages: number;
};

const BackgroundImage = () => {
  const backgroundImage = useImageGeneratorStore(
    (s) => s.settings.background.backgroundImage
  );
  const setBackground = useImageGeneratorStore((s) => s.setBackground);
  const defaultValue = defaultImageGeneratorSettings.background.backgroundImage;

  const bgImages: BgImage[] = [
    {
      title: "Summer",
      icon: <Icon iconNode={palmtreeIslandSun} className="size-4" />,
      path: "/images/patterns/summer",
      totalImages: 422,
    },
    {
      title: "90s",
      icon: <Disc3 className="size-4" />,
      path: "/images/patterns/90s",
      totalImages: 618,
    },
  ];

  return (
    <CustomAccordion type="single">
      <DropZone mode="background" />
      {bgImages.map((bgImage) => (
        <CustomAccordionItem
          key={bgImage.title.toLowerCase()}
          title={bgImage.title}
          icon={bgImage.icon}
          disabled={backgroundImage === defaultValue}
          reset={() =>
            setBackground({
              backgroundImage: defaultValue,
            })
          }
        >
          <div className="flex w-full flex-col gap-4">
            <ImageSelect
              path={bgImage.path}
              totalImages={bgImage.totalImages}
              currentImageName={backgroundImage}
              alt={bgImage.title}
              mode={"background"}
            />
          </div>
        </CustomAccordionItem>
      ))}
    </CustomAccordion>
  );
};

export default BackgroundImage;
