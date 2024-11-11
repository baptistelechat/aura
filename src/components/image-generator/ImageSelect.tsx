"use client";
import { ImageCollection } from "@/lib/types/ImageCollection";
import { cn } from "@/lib/utils";
import { handleImageClick } from "@/lib/utils/image-generator/handleImageClick";
import { Library, Plus, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import ImageSelectDialog from "./ImageSelectDialog";
import { Button } from "../ui/button";

export interface IImageSelectProps {
  title: string;
  path: string;
  totalImages: number;
  currentImageName: string | null;
  mode: "overlay" | "background";
}

const generateShadowImages = (
  start: number,
  end: number,
  path: string
): ImageCollection => {
  const images = [];
  for (let i = start; i <= end; i++) {
    images.push({
      id: String(i),
      thumbnail: `${path}/thumbnails/${i}.webp`,
      original: `${path}/originals/${i}.webp`,
    });
  }
  return images.sort((a, b) => Number(a.id) - Number(b.id));
};

const ImageSelect = ({
  title,
  path,
  totalImages,
  currentImageName,
  mode,
}: IImageSelectProps) => {
  const [openDialog, setOpenDialog] = useState(false);

  const [imagesToShow, setImagesToShow] = useState(12);
  const images = useMemo(() => generateShadowImages(1, totalImages, path), []);

  const loadMoreImages = () => {
    setImagesToShow((prev) => Math.min(prev + 12, images.length));
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid grid-cols-3 gap-2">
        {images.slice(0, imagesToShow).map((image) => (
          <div
            key={image.id}
            className={cn(
              "relative cursor-pointer rounded w-24 h-16 bg-cover bg-center",
              `${image.original}` === currentImageName &&
                "outline outline-2 outline-offset-0 outline-primary",
              image.original.includes("shadow") && "dark:invert"
            )}
            style={{
              backgroundImage: `url(${image.thumbnail})`,
            }}
            onClick={() => handleImageClick(image.original, mode)}
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
        <Button variant={"outline"} onClick={() => setOpenDialog(true)}>
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
      <ImageSelectDialog
        open={openDialog}
        setOpen={setOpenDialog}
        title={title}
        images={images}
        currentImageName={currentImageName}
        mode={mode}
      />
    </div>
  );
};

export default ImageSelect;
