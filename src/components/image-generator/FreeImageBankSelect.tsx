"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { ImageCollection } from "@/lib/types/ImageCollection";
import { PixabayApiResponse } from "@/lib/types/PixabayApiResponse";
import { UnsplashApiResponse } from "@/lib/types/UnsplashApiResponse";
import { Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
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

const MAX_SEARCH_VALUE_LENGTH = 100;
const MIN_SEARCH_VALUE_LENGTH = 3;

const searchSchema = z.object({
  searchValue: z
    .string()
    .max(MAX_SEARCH_VALUE_LENGTH, {
      message: "Search value must be less than 100 characters",
    })
    .min(MIN_SEARCH_VALUE_LENGTH, {
      message: "Search value must be at least 3 characters",
    }),
});

const FreeImageBankSelect = ({
  imageBank,
  mode,
  variant = "default",
}: IFreeImageBankSelectProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageCollection>();

  const freeImageBank = useImageGeneratorStore(
    (s) => s.settings.background.freeImageBank
  );

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

  const validateSearchValue = (searchValue: string) => {
    try {
      searchSchema.parse({ searchValue });
      setErrorMessage("");
      return true;
    } catch (error: any) {
      const errorMessage = error.errors[0].message;
      toast.error(errorMessage);
      setErrorMessage(errorMessage);
      return false;
    }
  }

  const handleSearch = (
    searchValue: string,
    imageBank: "unsplash" | "pixabay",
    mode: "background" | "image"
  ) => {
    // console.log("Searching for images:", searchValue);
    
    if(!validateSearchValue(searchValue)) {
      return
    }
    
    setIsLoading(true);

    if (imageBank === "unsplash") {
      fetch(`/api/images/unsplash?query=${searchValue}&per_page=16`)
        .then((res) => res.json())
        .then((data) => {
          const response = data as UnsplashApiResponse;
          if (response.status === "error") {
            toast.error(response.message);
            return;
          }
          const images: ImageCollection = [
            ...response.images.map((image) => ({
              id: image.id,
              thumbnail: image.urls.thumb,
              original: image.urls.raw,
            })),
          ];
          setImages(images);
          setIsLoading(false);
          if (mode === "background") {
            setBackground({
              freeImageBank: {
                ...freeImageBank,
                unsplash: { searchValue, images },
              },
            });
          }
          return;
        });
    }

    if (imageBank === "pixabay") {
      fetch(`/api/images/pixabay?query=${searchValue}&per_page=16`)
        .then((res) => res.json())
        .then((data) => {
          const response = data as PixabayApiResponse;
          if (response.status === "error") {
            toast.error(response.message);
            return;
          }
          const images: ImageCollection = [
            ...response.images.map((image) => ({
              id: String(image.id),
              thumbnail: image.previewURL,
              original: image.largeImageURL,
            })),
          ];
          setImages(images);
          setIsLoading(false);
          if (mode === "background") {
            setBackground({
              freeImageBank: {
                ...freeImageBank,
                pixabay: { searchValue, images },
              },
            });
          }
          return;
        });
    }
  };

  useEffect(() => {
    if (mode === "background" && freeImageBank) {
      if (imageBank === "unsplash") {
        const data = freeImageBank.unsplash;
        setSearchValue(data.searchValue);
        setImages(data.images);
      }
      if (imageBank === "pixabay") {
        const data = freeImageBank.pixabay;
        setSearchValue(data.searchValue);
        setImages(data.images);
      }
    }
  }, []);

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
          <Button
            size="icon"
            onClick={() => handleSearch(searchValue, imageBank, mode)}
          >
            <Search className="size-4" />
          </Button>
        </div>
        {errorMessage && (
          <p className="text-left text-sm text-red-500">{errorMessage}</p>
        )}
        {images && images.length > 0 ? (
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
