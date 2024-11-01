import { cn } from "@/lib/utils";
import { uploadImage } from "@/lib/utils/image-generator/uploadImage";
import { ImageDown, ImagePlus } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const DropZone: React.FC = () => {
  const [isHover, setIsHover] = useState(false);

  const onDrop = useCallback((files: File[]) => {
    uploadImage(files[0], "image");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "cursor-pointer rounded-xl border px-8 py-4 transition-all duration-200  flex items-center justify-center size-1/2 drop-shadow-2xl",
        isDragActive
          ? "border-primary text-primary bg-blue-100"
          : "border-slate-300 text-muted-foreground bg-slate-200"
      )}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <input {...getInputProps()} accept="image/*" />
      {isHover ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <ImagePlus className="size-12" />
          <p className="text-lg">Add an image</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <ImageDown className="size-12" />
          <p className="text-lg">Drop or Paste</p>
        </div>
      )}
    </div>
  );
};

export default DropZone;
