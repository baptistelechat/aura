import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";

export const updatePreviewSize = () => {
  const imageGeneratorStore = useImageGeneratorStore.getState();
  const containerRef = imageGeneratorStore.previewRefs.containerRef;
  const previewRef = imageGeneratorStore.previewRefs.previewRef;
  const watermarkRef = imageGeneratorStore.previewRefs.watermarkRef;

  const width = imageGeneratorStore.settings.dimension.width;
  const height = imageGeneratorStore.settings.dimension.height;

  const image = imageGeneratorStore.settings.image;
  const setImage = imageGeneratorStore.setImage;

  if (containerRef?.current && previewRef?.current) {
    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;

    const imageAspectRatio = width / height;
    const containerAspectRatio = containerWidth / containerHeight;

    let scale;

    if (containerAspectRatio > imageAspectRatio) {
      // If container is wider (ratio is larger), adjust height
      scale = containerHeight / height; // Scale based on height
    } else {
      // If container is narrower (ratio is smaller), adjust width
      scale = containerWidth / width; // Scale based on width
    }

    const scaledWidth = width * scale;
    const scaledHeight = height * scale;

    const translateX = (containerWidth - scaledWidth) / 2;
    const translateY = (containerHeight - scaledHeight) / 2;

    previewRef.current.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;

    if (watermarkRef?.current) {
      const watermarkHeight = height * 0.05;
      const watermarkScale = watermarkHeight / 54;

      watermarkRef.current.style.scale = String(watermarkScale);
    }

    const coef =
      image.width > image.height ? width / image.width : height / image.height;

    setImage({
      coef,
    });
  }
};
