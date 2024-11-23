"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { ImageCollection } from "@/lib/types/ImageCollection";
import { PixabayApiResponse } from "@/lib/types/PixabayApiResponse";
import { UnsplashApiResponse } from "@/lib/types/UnsplashApiResponse";
import { Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import Loader, { LoaderEnum } from "../../../Loader";
import { Input } from "../../../ui/input";
import FreeImageBankColor from "./FreeImageBankColor";
import FreeImageBankOrientation from "./FreeImageBankOrientation";

type Orientation = "all" | "landscape" | "portrait";

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

const FreeImageBankSelect = ({
  imageBank,
  mode,
  variant = "default",
}: IFreeImageBankSelectProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [orientation, setOrientation] = useState<Orientation>("all");
  const [color, setColor] = useState<string>("all_colors");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [images, setImages] = useState<ImageCollection>();

  const freeImageBank = useImageGeneratorStore(
    (s) => s.settings.background.freeImageBank
  );

  const setTab = useImageGeneratorStore((s) => s.setTab);
  const setImage = useImageGeneratorStore((s) => s.setImage);
  const setBackground = useImageGeneratorStore((s) => s.setBackground);

  const handleImageClick = async (
    data: { path: string; width: number; height: number },
    mode: "background" | "image"
  ) => {
    const base64Image = await fetchImageAsBase64(data.path);
    if (mode === "background") {
      setBackground({ backgroundImage: base64Image });
      return;
    }

    if (mode === "image") {
      setImage({ src: base64Image, width: data.width, height: data.height });
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
  };

  const handleSearch = (
    searchValue: string,
    orientation: Orientation,
    color: string,
    imageBank: "unsplash" | "pixabay",
    mode: "background" | "image"
  ) => {
    // console.log("Searching for images:", searchValue);

    if (!validateSearchValue(searchValue)) {
      return;
    }

    setIsLoading(true);

    if (imageBank === "unsplash") {
      fetch(
        `/api/images/unsplash?query=${searchValue}&per_page=18&orientation=${orientation}&color=${color}`
      )
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
              author: image.user.name,
              width: image.width,
              height: image.height,
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
      fetch(
        `/api/images/pixabay?query=${searchValue}&per_page=18&orientation=${orientation}&color=${color}`
      )
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
              author: image.user,
              width: image.imageWidth,
              height: image.imageHeight,
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
            className="dark:invert"
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(searchValue, orientation, color, imageBank, mode);
              }
            }}
          />
          <Button
            size="icon"
            onClick={() =>
              handleSearch(searchValue, orientation, color, imageBank, mode)
            }
          >
            <Search className="size-4" />
          </Button>
        </div>
        {errorMessage && (
          <p className="text-left text-sm text-red-500">{errorMessage}</p>
        )}
        <FreeImageBankOrientation
          orientation={orientation}
          setOrientation={setOrientation}
        />
        <FreeImageBankColor
          imageBank={imageBank}
          color={color}
          setColor={setColor}
        />
        <Separator />
        {images && images.length > 0 ? (
          <ScrollArea className="h-[256px]">
            <div className="grid grid-cols-3 place-items-center gap-2">
              {images.map((image) => (
                <div key={image.id} className="flex items-center gap-2">
                  <div
                    className="group relative size-20 cursor-pointer overflow-hidden rounded bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${image.thumbnail})`,
                    }}
                    onClick={() =>
                      handleImageClick(
                        {
                          path: image.original,
                          width: image.width,
                          height: image.height,
                        },
                        mode
                      )
                    }
                  >
                    <p className="absolute bottom-0 left-0 w-full break-words bg-primary/50 p-1 text-center text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      {image.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex h-64 items-center justify-center">
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
