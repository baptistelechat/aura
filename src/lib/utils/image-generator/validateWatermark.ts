import { toast } from "sonner";

export const validateWatermark = () => {
  const watermarkContainer = document.querySelector("#watermark-container");

  if (
    !watermarkContainer ||
    watermarkContainer.children.length === 0 ||
    watermarkContainer.children[0].children.length !== 3
  ) {
    toast.error("Watermark missing or altered. Image generation aborted.");
    return false;
  }

  return true;
};
