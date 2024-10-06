"use client"
import CustomAccordionItem from "@/components/CustomAccordionItem";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { uploadImage } from "@/lib/utils/image-generator/uploadImage";
import { useRef } from "react";

const BackgroundImage = () => {
  const backgroundImage = useImageGeneratorStore(
    (s) => s.settings.background.backgroundImage
  );  const inputRef = useRef<HTMLInputElement | null>(null);

  const setBackgroundColor = useImageGeneratorStore((s) => s.setBackgroundColor);

  const handleResetBackground = () => {
    setBackgroundColor(defaultImageGeneratorSettings.background.backgroundColor);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <CustomAccordionItem
      title={"Background Image"}
      icon={<ImageIcon className="size-4" />}
      disabled={
        backgroundImage ===
        defaultImageGeneratorSettings.background.backgroundImage
      }
      reset={handleResetBackground}
    >
      <div className="flex w-full flex-col gap-4">
        <Input
          id="backgroundUploadInput"
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            uploadImage(e, "background");
          }}
          className="w-full hover:cursor-pointer"
        />
      </div>
    </CustomAccordionItem>
  );
};

export default BackgroundImage;
