import { transparentBackgroundStyle } from "@/lib/constant/transparentBackgroundStyle";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";

export const updatePreviewStyle = () => {
  const imageGeneratorStore = useImageGeneratorStore.getState();
  const containerRef = imageGeneratorStore.previewRefs.containerRef;
  const previewRef = imageGeneratorStore.previewRefs.previewRef;
  const backgroundRef = imageGeneratorStore.previewRefs.backgroundRef;
  const watermarkRef = imageGeneratorStore.previewRefs.watermarkRef;

  if (previewRef?.current && containerRef?.current && backgroundRef?.current) {

    const height = imageGeneratorStore.settings.dimension.height;
    const imageVisibility = imageGeneratorStore.settings.image.visibility;

    if (!imageVisibility) {
      imageGeneratorStore.setImageVisibility(true);
    }

    containerRef.current.classList.toggle("blur-xl");

    previewRef.current.classList.toggle("border");
    previewRef.current.classList.toggle("border-slate-200");
    previewRef.current.classList.toggle("transition-all");
    previewRef.current.classList.toggle("rounded-3xl");

    if (imageGeneratorStore.settings.background.backgroundColor === "") {
      if (backgroundRef.current.style.backgroundImage === "") {
        backgroundRef.current.style.backgroundImage =
          transparentBackgroundStyle;
      } else {
        backgroundRef.current.style.backgroundImage = "";
      }
    }

    if (watermarkRef?.current) {
      const watermarkHeight = height * 0.05;
      const watermarkScale = watermarkHeight / 54;

      watermarkRef.current.style.scale = String(watermarkScale);
    }
  }
};
