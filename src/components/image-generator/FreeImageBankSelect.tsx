import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { mockUnsplash } from "@/lib/constant/mockUnsplash";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { Search } from "lucide-react";
import Image from "next/image";
import { Input } from "../ui/input";

const fetchImageAsBase64 = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

interface IFreeImageBankSelectProps {
  imageBank: "unsplash" | "pixabay";
  mode: "image" | "background";
  variant?: "default" | "icon";
}

const FreeImageBankSelect = ({
  imageBank,
  mode,
  variant = "default",
}: IFreeImageBankSelectProps) => {
  const setImage = useImageGeneratorStore((s) => s.setImage);
  const setBackground = useImageGeneratorStore((s) => s.setBackground);

  const handleImageClick = async (
    path: string,
    mode: "background" | "image"
  ) => {
    const base64Image = await fetchImageAsBase64(path);
    if (mode === "background") {
      setBackground({ backgroundImage: base64Image });
      return;
    }

    if (mode === "image") {
      setImage({ src: base64Image });
      return;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className="w-full">
          <Image
            src={`/images/assets/freeImageBank/${imageBank}-${
              variant === "icon" ? "icon" : "full"
            }.svg`}
            alt={imageBank}
            width={variant === "icon" ? 25: 95}
            height={variant === "icon" ? 25: 80}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="ml-4 flex flex-col gap-4">
        <div className="flex w-full items-center gap-2">
          <Input type="text" placeholder="Search for images" />
          <Button size="icon">
            <Search className="size-4" />
          </Button>
        </div>
        <div className="grid grid-cols-4 place-items-center gap-2">
          {mockUnsplash.images.map((image) => (
            <div key={image.id} className="flex items-center gap-2">
              <div
                key={image.id}
                className={
                  "relative size-14 cursor-pointer rounded bg-cover bg-center"
                }
                style={{
                  backgroundImage: `url(${image.urls.thumb})`,
                }}
                onClick={() => handleImageClick(image.urls.raw, mode)}
              />
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FreeImageBankSelect;
