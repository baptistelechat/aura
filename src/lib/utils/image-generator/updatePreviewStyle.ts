import { transparentBackgroundStyle } from "@/lib/constant/transparentBackgroundStyle";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";

export const updatePreviewStyle = () => {
  const imageGeneratorStore = useImageGeneratorStore.getState();
  
  const containerRef = imageGeneratorStore.previewRefs.containerRef;
  const previewRef = imageGeneratorStore.previewRefs.previewRef;
  const backgroundRef = imageGeneratorStore.previewRefs.backgroundRef;
  const auraWatermarkRef = imageGeneratorStore.previewRefs.auraWatermarkRef;
  const socialWatermarkRef = imageGeneratorStore.previewRefs.socialWatermarkRef;

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

    if (imageGeneratorStore.settings.background.backgroundColor === "") {
      if (backgroundRef.current.style.backgroundImage === "") {
        backgroundRef.current.style.backgroundImage =
          transparentBackgroundStyle;
      } else {
        backgroundRef.current.style.backgroundImage = "";
      }
    }

    const watermarkHeight = height * 0.05;
    const watermarkScale = watermarkHeight / 54;
    
    if (auraWatermarkRef?.current) {
      console.log("aura");
      auraWatermarkRef.current.style.scale = String(watermarkScale);
    }

    if (socialWatermarkRef?.current) {
      console.log("social");
      socialWatermarkRef.current.style.scale = String(watermarkScale);
    }
  }
};
