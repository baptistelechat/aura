import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";

export const updatePreviewSize = () => {
  const imageGeneratorStore = useImageGeneratorStore.getState();
  const containerRef = imageGeneratorStore.previewRefs.containerRef;
  const previewRef = imageGeneratorStore.previewRefs.previewRef;
  // const imageRef = imageGeneratorStore.previewRefs.imageRef;
  // const watermarkRef = imageGeneratorStore.previewRefs.watermarkRef;

  const width = imageGeneratorStore.settings.dimension.width;
  const height = imageGeneratorStore.settings.dimension.height;
  // const imageScale = imageGeneratorStore.settings.image.scale;

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

    previewRef.current.style.transform = `scale(${scale})`;

    // if (imageRef?.current) {
    //   imageRef.current.style.transform = `scale(${imageScale})`;
    // }

    // if (watermarkRef?.current) {
    //   watermarkRef.current.style.scale = `${(scale * 0.05) / 60}`;
    // }
  }
};
