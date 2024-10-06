import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { toast } from "sonner"; // Import de toast

export const uploadImage = (
  event: React.ChangeEvent<HTMLInputElement>,
  mode: "image" | "background"
) => {
  const imageGeneratorStore = useImageGeneratorStore.getState();
  const setImageSrc = imageGeneratorStore.setImageSrc;
  const setBackgroundImage = imageGeneratorStore.setBackgroundImage;
  const setImageVisibility = imageGeneratorStore.setImageVisibility;

  const file = event.target.files?.[0];

  if (file) {
    const reader = new FileReader();

    toast.promise(
      new Promise<void>((resolve, reject) => {
        reader.onload = (e) => {
          const imageSrc = e.target?.result as string;

          if (mode === "image") {
            setImageSrc(imageSrc);
            setImageVisibility(true);
            resolve();
          } else if (mode === "background") {
            if (imageSrc) {
              setBackgroundImage(imageSrc);
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
