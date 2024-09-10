import { RefObject } from "react";

interface IUpdatePreview {
  containerRef: RefObject<HTMLDivElement>;
  previewRef: RefObject<HTMLDivElement>;
  width: number;
  height: number;
}

export default IUpdatePreview;
