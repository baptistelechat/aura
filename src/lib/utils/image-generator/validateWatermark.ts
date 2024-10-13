import { toast } from "sonner";

export const validateWatermark = () => {
  const watermarkContainer = document.querySelector(
    "#watermark-container"
  ) as HTMLDivElement;
  const watermarkLogo = watermarkContainer?.children[0];
  const watermarkElements = watermarkContainer?.children[0]?.children;

  if (
    !watermarkContainer ||
    !watermarkLogo ||
    watermarkElements?.length !== 3
  ) {
    toast.error("Watermark missing or altered. Image generation aborted.");
    return false;
  }

  const containerStyle = window.getComputedStyle(watermarkContainer);
  const logoStyle = window.getComputedStyle(watermarkLogo);

  if (
    containerStyle.display === "none" ||
    containerStyle.visibility === "hidden" ||
    containerStyle.opacity !== "1" ||
    logoStyle.display === "none" ||
    logoStyle.visibility === "hidden" || 
    logoStyle.opacity !== "1"
  ) {
    toast.error(
      "Watermark is partially or completely hidden. Image generation aborted."
    );
    return false;
  }

  for (let i = 0; i < watermarkElements.length; i++) {
    const element = watermarkElements[i] as HTMLElement;
    const elementStyle = window.getComputedStyle(element);
    if (
      elementStyle.display === "none" ||
      elementStyle.visibility === "hidden" ||
      elementStyle.opacity !== "1"
    ) {
      toast.error(
        "Watermark is partially or completely hidden. Image generation aborted."
      );
      return false;
    }
  }

  return true;
};
