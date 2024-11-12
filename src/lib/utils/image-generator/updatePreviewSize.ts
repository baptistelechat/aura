import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";

export const updatePreviewSize = () => {
  const imageGeneratorStore = useImageGeneratorStore.getState();
  const containerRef = imageGeneratorStore.previewRefs.containerRef;
  const previewRef = imageGeneratorStore.previewRefs.previewRef;
  const imageRef = imageGeneratorStore.previewRefs.imageRef;
  const watermarkRef = imageGeneratorStore.previewRefs.watermarkRef;

  const width = imageGeneratorStore.settings.dimension.width;
  const height = imageGeneratorStore.settings.dimension.height;

  // const imageScale = imageGeneratorStore.settings.image.scale;

  if (containerRef?.current && previewRef?.current) {
    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;

    const imageAspectRatio = width / height;
    const containerAspectRatio = containerWidth / containerHeight;

    let previewWidth, previewHeight;

    if (containerAspectRatio > imageAspectRatio) {
      previewHeight = containerHeight;
      previewWidth = previewHeight * imageAspectRatio;
    } else {
      previewWidth = containerWidth;
      previewHeight = previewWidth / imageAspectRatio;
    }

    previewRef.current.style.width = `${previewWidth}px`;
    previewRef.current.style.height = `${previewHeight}px`;

    if (imageRef?.current) {
      imageRef.current.style.maxWidth = `${previewWidth}px`;
      imageRef.current.style.maxHeight = `${previewHeight}px`;
    }

    if (watermarkRef?.current) {
      watermarkRef.current.style.scale = `${(previewHeight * 0.05) / 60}`;
    }
  }
};
