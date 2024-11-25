import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { toast } from "sonner";

export const uploadImage = (
  file: File | undefined,
  mode: "image" | "background"
) => {
  const imageGeneratorStore = useImageGeneratorStore.getState();
  const setImage = imageGeneratorStore.setImage;
  const setBackground = imageGeneratorStore.setBackground;

  if (file) {
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type. Please upload an image.");
      return;
    }

    const reader = new FileReader();

    toast.promise(
      new Promise<void>((resolve, reject) => {
        reader.onload = (e) => {
          const src = e.target?.result as string;

          const img = new Image();
          img.onload = () => {
            const imageWidth = img.naturalWidth;
            const imageHeight = img.naturalHeight;

            if (mode === "image") {
              setImage({
                src,
                visibility: true,
                width: imageWidth,
                height: imageHeight,
              });
            } else if (mode === "background") {
              setBackground({
                backgroundColor:
                  defaultImageGeneratorSettings.background.backgroundColor,
                backgroundImage: src,
              });
            }
            resolve();
          };

          img.onerror = (error) => {
            reject(error);
          };

          img.src = src;
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsDataURL(file);
      }),
      {
        loading: "Uploading image...",
        success:
          mode === "image"
            ? "Image uploaded successfully!"
            : "Background image uploaded successfully!",
        error: "Failed to upload image.",
      }
    );
  }
};
