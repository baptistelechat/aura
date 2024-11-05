import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { backgroundImages } from "@/lib/constant/backgroundImages";
import { ImageCollection } from "@/lib/types/ImageCollection";
import { cn } from "@/lib/utils";
import { handleImageClick } from "@/lib/utils/image-generator/handleImageClick";
import { Ghost } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

interface IImageSelectDialog {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  images: ImageCollection;
  currentImageName: string | null;
  mode: "overlay" | "background";
}

const ImageSelectDialog = ({
  open,
  setOpen,
  title,
  images,
  currentImageName,
  mode,
}: IImageSelectDialog) => {
  const category = backgroundImages.find((image) => image.title === title);

  const handleClick = (path: string, mode: "background" | "overlay") => {
    handleImageClick(path, mode);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {title.includes("Shadow") ? (
              <Ghost className="size-4" />
            ) : (
              category?.icon
            )}
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="flex w-full flex-col gap-4">
          <ScrollArea className="h-[calc(100vh-250px)] grow pr-4">
            <div className="grid grid-cols-4 place-items-center gap-2">
              {images.map((image) => (
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
                  onClick={() => handleClick(image.original, mode)}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
        <DialogFooter>
          <Button type="submit">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageSelectDialog;
