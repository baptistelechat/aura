"use client";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { cn } from "@/lib/utils";
import { Library, Plus, RotateCcw } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "./ui/button";

interface IImageSelectProps {
  path: string;
  totalImages: number;
  currentImageName: string | null;
  alt: string;
  mode: "overlay" | "background";
}

type Image = {
  id: number;
  name: string;
  alt: string;
};

const generateShadowImages = (
  start: number,
  end: number,
  alt: string
): Image[] => {
  const images = [];
  for (let i = start; i <= end; i++) {
    images.push({
      id: i,
      name: `${i}.webp`,
      alt: `${alt.toLowerCase().replace(" ", "_")}_${i}`,
    });
  }
  return images.sort((a, b) => a.id - b.id);
};

const ImageSelect = ({
  path,
  totalImages,
  currentImageName,
  alt,
  mode,
}: IImageSelectProps) => {
  const setBackground = useImageGeneratorStore((s) => s.setBackground);
  const setOverlay = useImageGeneratorStore((s) => s.setOverlay);

  const [imagesToShow, setImagesToShow] = useState(12);
  const images = useMemo(() => generateShadowImages(1, totalImages, alt), []);

  const handleClick = (
    path: string,
    imageName: string,
    mode: "background" | "overlay"
  ) => {
    if (mode === "background") {
      setBackground({
        backgroundImage: `${path}/originals/${imageName}`,
      });
    }

    if (mode === "overlay") {
      setOverlay({
        name: `${path}/originals/${imageName}`,
      });
    }

    return;
  };

  const loadMoreImages = () => {
    setImagesToShow((prev) => Math.min(prev + 12, images.length));
  };

  return (
    <div className="flex w-full flex-col place-items-center gap-4">
      <div className="grid grid-cols-3 gap-2">
        {images.slice(0, imagesToShow).map((image) => (
          <div
            key={image.id}
            className={cn(
              "relative cursor-pointer rounded size-24 bg-cover bg-center",
              `${path}/originals/${image.name}` === currentImageName &&
                "outline outline-2 outline-offset-0 outline-primary"
            )}
            style={{
              backgroundImage: `url(${path}/thumbnails/${image.name})`,
            }}
            onClick={() => handleClick(path, image.name, mode)}
          />
        ))}
      </div>
      <p className="w-full text-center text-sm text-muted-foreground">
        ({imagesToShow} of {totalImages})
      </p>
      <div className="flex gap-2">
        <Button
          variant={"outline"}
          onClick={loadMoreImages}
          disabled={imagesToShow >= images.length}
        >
          <Plus className="mr-2 size-4" />
          Show More
        </Button>
        <Button variant={"outline"} onClick={loadMoreImages}>
          <Library className="mr-2 size-4" />
          View all
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => setImagesToShow(12)}
          disabled={imagesToShow <= 12}
        >
          <RotateCcw className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default ImageSelect;
