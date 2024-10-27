export const loadImage = () => {
  const loadImageInput = document.getElementById(
    "imageUploadInput"
  ) as HTMLInputElement;
  if (loadImageInput) {
    loadImageInput.click();
  }
};