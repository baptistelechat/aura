import IUpdatePreview from "../interface/IUpdatePreview";

const updatePreviewStyle = ({
  containerRef,
  previewRef,
  imageRef,
  imageGeneratorStore,
}: IUpdatePreview) => {
  if (previewRef.current && containerRef.current && imageRef.current) {
    const width = imageGeneratorStore.settings.dimension.width;
    const height = imageGeneratorStore.settings.dimension.height;

    const imageVisibility = imageGeneratorStore.settings.image.visibility;
    const imageScale = imageGeneratorStore.settings.image.scale;

    if (!imageVisibility) {
      imageGeneratorStore.setImageVisibility(true);
    }

    containerRef.current.classList.toggle("overflow-hidden");
    containerRef.current.classList.toggle("blur-xl");

    previewRef.current.classList.toggle("border");
    previewRef.current.classList.toggle("border-slate-200");
    previewRef.current.classList.toggle("transition-all");
    previewRef.current.classList.toggle("rounded-xl");

    previewRef.current.style.width = `${width}px`;
    previewRef.current.style.height = `${height}px`;

    imageRef.current.style.width = `${width * imageScale}px`;
    imageRef.current.style.height = `${height * imageScale}px`;
  }
};

export default updatePreviewStyle;
