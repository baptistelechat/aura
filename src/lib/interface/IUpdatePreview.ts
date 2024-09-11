import { RefObject } from "react";
import { ImageGeneratorStoreType } from "../store/imageGenerator.store";

interface IUpdatePreview {
  containerRef: RefObject<HTMLDivElement>;
  previewRef: RefObject<HTMLDivElement>;
  imageRef: RefObject<HTMLDivElement>;
  imageGeneratorStore: ImageGeneratorStoreType;
}

export default IUpdatePreview;
