import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";

export const updatePreviewSize = () => {
  const imageGeneratorStore = useImageGeneratorStore.getState();
  const containerRef = imageGeneratorStore.refs.containerRef;
  const previewRef = imageGeneratorStore.refs.previewRef;
  const imageRef = imageGeneratorStore.refs.imageRef;

  const width = imageGeneratorStore.settings.dimension.width;
  const height = imageGeneratorStore.settings.dimension.height;

  const imageScale = imageGeneratorStore.settings.image.scale;

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
      imageRef.current.style.maxWidth = `${previewWidth * imageScale}px`;
      imageRef.current.style.maxHeight = `${previewHeight * imageScale}px`;
    }
  }
};
