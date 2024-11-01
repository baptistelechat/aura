import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { toast } from "sonner";

export const uploadImage = (
  file: File | undefined,
  mode: "image" | "background"
) => {
  const imageGeneratorStore = useImageGeneratorStore.getState();
  const setImage = imageGeneratorStore.setImage;
  const setBackgroundImage = imageGeneratorStore.setBackgroundImage;

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

          if (mode === "image") {
            setImage({ src, visibility: true });
            resolve();
          } else if (mode === "background") {
            if (src) {
              setBackgroundImage(src);
              resolve();
            } else {
              reject(new Error("Failed to load background image."));
            }
          }
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
