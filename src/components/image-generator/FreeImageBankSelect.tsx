"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { ImageCollection } from "@/lib/types/ImageCollection";
import { UnsplashApiResponse } from "@/lib/types/UnsplashApiResponse";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Loader, { LoaderEnum } from "../Loader";
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
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageCollection>();

  const setTab = useImageGeneratorStore((s) => s.setTab);
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
      setTab("image");
      return;
    }
  };

  const handleSearch = (searchValue: string) => {
    console.log("Searching for images:", searchValue);
    setIsLoading(true);

    fetch(`/api/images/unsplash?query=${searchValue}&per_page=12`)
      .then((res) => res.json())
      .then((data) => {
        const response = data as UnsplashApiResponse;
        const images: ImageCollection = [
          ...response.images.map((image) => ({
            id: image.id,
            thumbnail: image.urls.thumb,
            original: image.urls.raw,
          })),
        ];
        setImages(images);
        setIsLoading(false);
      });
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
            width={variant === "icon" ? 25 : 95}
            height={variant === "icon" ? 25 : 80}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="ml-4 flex flex-col gap-4">
        <div className="flex w-full items-center gap-2">
          <Input
            type="text"
            placeholder="Search for images"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button size="icon" onClick={() => handleSearch(searchValue)}>
            <Search className="size-4" />
          </Button>
        </div>
        {images ? (
          <div className="grid grid-cols-4 place-items-center gap-2">
            {images.map((image) => (
              <div key={image.id} className="flex items-center gap-2">
                <div
                  key={image.id}
                  className={
                    "relative size-14 cursor-pointer rounded bg-cover bg-center"
                  }
                  style={{
                    backgroundImage: `url(${image.thumbnail})`,
                  }}
                  onClick={() => handleImageClick(image.original, mode)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-44 items-center justify-center">
            {isLoading ? (
              <Loader loader={LoaderEnum.REULEAUX} color="#2563eb" />
            ) : (
              <p className="w-full text-center text-sm text-muted-foreground">
                No results found
              </p>
            )}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default FreeImageBankSelect;
