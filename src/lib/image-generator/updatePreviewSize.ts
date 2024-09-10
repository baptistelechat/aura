import IUpdatePreview from "../interface/IUpdatePreview";

const updatePreviewSize = ({
  containerRef,
  previewRef,
  width,
  height,
}: IUpdatePreview) => {
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
