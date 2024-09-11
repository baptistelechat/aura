import { RefObject } from "react";

interface IUpdatePreview {
  containerRef: RefObject<HTMLDivElement>;
  previewRef: RefObject<HTMLDivElement>;
  width: number;
  height: number;
  imageVisibility: boolean;
  setImageVisibility: (visibility: boolean) => void;
}

export default IUpdatePreview;
