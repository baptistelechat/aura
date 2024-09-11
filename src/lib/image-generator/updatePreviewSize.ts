import IUpdatePreview from "../interface/IUpdatePreview";

const updatePreviewSize = ({
  containerRef,
  previewRef,imageGeneratorStore
}: IUpdatePreview) => {
  const width = imageGeneratorStore.settings.dimension.width;
  const height = imageGeneratorStore.settings.dimension.height;

  if (containerRef.current && previewRef.current) {
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
  }
};

export default updatePreviewSize;
