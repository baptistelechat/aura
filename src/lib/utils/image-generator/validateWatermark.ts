import { toast } from "sonner";

const errorMessage = () => {
  const preview = document.getElementById("preview") as HTMLDivElement;
  preview.style.filter = "blur(8px)";

  toast.error(
    "Watermark is partially or completely hidden. Image generation aborted."
  );
  toast.warning(
    "The page will reload in 3 seconds. All settings will be lost."
  );
  if (window?.umami) {
    window.umami.track("watermark-error");
  }
  setTimeout(() => {
    window.location.reload();
  }, 3000);
};

const isElementHidden = (element: HTMLElement | null) => {
  if (!element) return false;

  const style = window.getComputedStyle(element);
  if (
    style.display === "none" ||
    style.visibility === "hidden" ||
    style.opacity !== "1" ||
    style.height === "0px" ||
    style.width === "0px" ||
    style.maxHeight === "0px" ||
    style.maxWidth === "0px" ||
    style.scale === "0"
  ) {
    errorMessage();
    return true;
  }
  return false;
};

export const validateWatermark = () => {
  const watermarkContainer = document.querySelector(
    "#auraWatermarkContainer"
  ) as HTMLDivElement;
  const watermarkLogo = watermarkContainer?.children[0] as HTMLDivElement;
  const watermarkElements = watermarkContainer?.children[0]?.children;

  if (
    !watermarkContainer ||
    !watermarkLogo ||
    watermarkElements?.length !== 3
  ) {
    errorMessage();
    return false;
  }

  if (isElementHidden(watermarkContainer) || isElementHidden(watermarkLogo)) {
    return false;
  }

  for (let i = 0; i < watermarkElements.length; i++) {
    const element = watermarkElements[i] as HTMLElement;
    if (isElementHidden(element)) {
      return false;
    }
  }

  return true;
};
