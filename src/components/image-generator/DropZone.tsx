import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { cn } from "@/lib/utils";
import { uploadImage } from "@/lib/utils/image-generator/uploadImage";
import { ImageDown, ImagePlus } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface IDropZoneProps {
  mode: "image" | "background";
}

const DropZone = ({ mode }: IDropZoneProps) => {
  const dimension = useImageGeneratorStore((s) => s.settings.dimension);
  const [isHover, setIsHover] = useState(false);

  const onDrop = useCallback((files: File[]) => {
    uploadImage(files[0], mode);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "cursor-pointer border transition-all duration-200 flex items-center justify-center",
        isDragActive
          ? "border-primary text-primary bg-blue-100"
          : `${
              mode === "background"
                ? "border-input bg-transparent"
                : " border-slate-300 bg-slate-200 text-black"
            }`,
        mode === "background"
          ? "py-5 w-full rounded-md mt-2"
          : "px-8 py-4 size-1/2 drop-shadow-2xl rounded-3xl"
      )}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <input {...getInputProps()} accept="image/*" />
      {isHover ? (
        <div
          className={cn(
            "flex items-center justify-center",
            mode === "background" ? "flex-row gap-2" : "flex-col gap-4"
          )}
          style={{ scale: mode === "image" ? dimension.height / 500 : 1 }}
        >
          <ImagePlus className={mode === "background" ? "size-5" : "size-12"} />
          <p
            className={cn(
              "font-medium text-center",
              mode === "background" ? "text-sm" : "text-xl"
            )}
          >
            Add an image
          </p>
        </div>
      ) : (
        <div
          className={cn(
            "flex items-center justify-center",
            mode === "background" ? "flex-row gap-2" : "flex-col gap-4"
          )}
          style={{ scale: mode === "image" ? dimension.height / 500 : 1 }}
        >
          <ImageDown
            className={mode === "background" ? "size-5" : "size-12"}
          />
          <p
            className={cn(
              "font-medium text-center",
              mode === "background" ? "text-sm" : "text-xl"
            )}
          >
            {mode === "background" ? "Click or Drop" : "Drop or Paste"}
          </p>
        </div>
      )}
    </div>
  );
};

export default DropZone;
