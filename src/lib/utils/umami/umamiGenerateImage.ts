import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";

export const umamiGenerateImage = ({
  action,
  method,
}: {
  action?: "download" | "clipboard";
  method?: "button" | "shortcut";
}) => {
  const {
    settings: { dimension, background, overlay },
  } = useImageGeneratorStore.getState();
  const {
    backgroundImage,
    backgroundMode,
    magicColor,
    backgroundColor,
    gradient,
  } = background;

  const isMagicColor = (color: string) => magicColor.includes(color);

  const backgroundModeType = backgroundImage
    ? "image"
    : !backgroundColor
    ? "transparent"
    : backgroundMode === "solid" && isMagicColor(backgroundColor)
    ? "magic-solid"
    : backgroundMode === "gradient" &&
      [gradient.from.hex, gradient.via?.hex, gradient.to.hex].some(isMagicColor)
    ? "magic-gradient"
    : backgroundMode;

  const overlayType = overlay.name.includes("overlays-shadow")
    ? "overlay-shadow"
    : "null";

  if (window?.umami) {
    window.umami.track("generate-image", {
      action: `${action}-${method}`,
      size: `${dimension.width}x${dimension.height}`,
      background: backgroundModeType,
      blur: background.blur !== 0,
      noise: background.noise !== 0,
      overlay: overlayType,
    });
  }
};
