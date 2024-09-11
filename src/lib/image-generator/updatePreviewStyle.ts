import IUpdatePreview from "../interface/IUpdatePreview";

const updatePreviewStyle = ({
  containerRef,
  previewRef,
  width,
  height,
  imageVisibility,
  setImageVisibility,
}: IUpdatePreview) => {
  if (previewRef.current && containerRef.current) {
    if (!imageVisibility) {
      setImageVisibility(true);
    }

    containerRef.current.classList.toggle("overflow-hidden");
    containerRef.current.classList.toggle("blur-xl");

    previewRef.current.classList.toggle("border");
    previewRef.current.classList.toggle("border-slate-200");
    previewRef.current.classList.toggle("transition-all");
    previewRef.current.classList.toggle("rounded-xl");

    previewRef.current.style.width = `${width}px`;
    previewRef.current.style.height = `${height}px`;
  }
};

export default updatePreviewStyle;