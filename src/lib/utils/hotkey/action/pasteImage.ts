import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { toast } from "sonner";

const setImageSrc = useImageGeneratorStore.getState().setImageSrc;
const setImageVisibility = useImageGeneratorStore.getState().setImageVisibility;

export const pasteImage = async () => {
  try {
    const clipboardItems = await navigator.clipboard.read();
    for (const clipboardItem of clipboardItems) {
      for (const type of clipboardItem.types) {
        if (type.startsWith("image/")) {
          const blobArray = await clipboardItem.getType(type);
          const file = new File([blobArray], "pasted-image.png", { type });
          const reader = new FileReader();

          reader.onload = (e) => {
            setImageSrc(e.target?.result as string);
            setImageVisibility(true);
          };

          reader.readAsDataURL(file);
        }
      }
    }
  } catch (error) {
    console.error("Error pasting image: ", error);
    toast.error("Failed to paste image from clipboard.");
  }
};