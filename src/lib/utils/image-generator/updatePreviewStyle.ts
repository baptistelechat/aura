import { transparentBackgroundStyle } from "@/lib/constant/transparentBackgroundStyle";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";

export const updatePreviewStyle = () => {
  const imageGeneratorStore = useImageGeneratorStore.getState();
  const containerRef = imageGeneratorStore.previewRefs.containerRef;
  const previewRef = imageGeneratorStore.previewRefs.previewRef;
  const backgroundRef = imageGeneratorStore.previewRefs.backgroundRef;
  const imageRef = imageGeneratorStore.previewRefs.imageRef;
  const watermarkRef = imageGeneratorStore.previewRefs.watermarkRef;

  if (previewRef?.current && containerRef?.current && backgroundRef?.current) {
    const width = imageGeneratorStore.settings.dimension.width;
    const height = imageGeneratorStore.settings.dimension.height;

    const imageVisibility = imageGeneratorStore.settings.image.visibility;
    const imageScale = imageGeneratorStore.settings.image.scale;

    const watermarkVisibility =
      imageGeneratorStore.settings.watermark.visibility;

    if (!imageVisibility) {
      imageGeneratorStore.setImageVisibility(true);
    }

    if (!watermarkVisibility) {
      imageGeneratorStore.setWatermarkVisibility(true);
    }

    containerRef.current.classList.toggle("size-full");
    containerRef.current.classList.toggle("overflow-hidden");
    containerRef.current.classList.toggle("blur-xl");

    previewRef.current.classList.toggle("border");
    previewRef.current.classList.toggle("border-slate-200");
    previewRef.current.classList.toggle("transition-all");
    previewRef.current.classList.toggle("rounded-xl");

    if (imageGeneratorStore.settings.background.backgroundColor === "") {
      if (backgroundRef.current.style.backgroundImage === "") {
        backgroundRef.current.style.backgroundImage =
          transparentBackgroundStyle;
      } else {
        backgroundRef.current.style.backgroundImage = "";
      }
    }

    previewRef.current.style.width = `${width}px`;
    previewRef.current.style.height = `${height}px`;

    if (imageRef?.current) {
      imageRef.current.style.maxWidth = `${width * imageScale}px`;
      imageRef.current.style.maxHeight = `${height * imageScale}px`;
    }

    if (watermarkRef?.current) {
      watermarkRef.current.style.scale = `${(height * 0.05) / 60}`;
    }
  }
};
