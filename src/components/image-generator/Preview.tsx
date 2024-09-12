import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import { RefObject } from "react";

interface IPreviewProps {
  containerRef: RefObject<HTMLDivElement>;
  previewRef: RefObject<HTMLDivElement>;
  imageRef: RefObject<HTMLImageElement>;
}

const Preview = ({ containerRef, previewRef, imageRef }: IPreviewProps) => {
  const { text, bgColor, dimension, image } = useImageGeneratorStore(
    (s) => s.settings
  );

  return (
    <div
      ref={containerRef}
      className="flex-grow flex items-center justify-center p-4 ml-4 overflow-hidden"
    >
      <div
        ref={previewRef}
        style={{
          backgroundColor: bgColor,
          transition: "all 0.3s ease",
          position: "relative",
        }}
        className="relative border border-slate-200 overflow-hidden flex items-center justify-center transition-all duration-300 rounded-xl"
      >
        {image.src && (
          <img
            ref={imageRef}
            src={image.src}
            alt="Selected"
            style={{
              borderRadius: `${image.borderRadius}px`,
              // boxShadow: `0 25px 50px -12px rgb(0 0 0 /${image.shadow})`,
              filter: `drop-shadow(0 25px 25px rgb(0 0 0 / ${image.shadow}))`,
              // transform: `scale(${image.scale})`,
              maxHeight: `${
                Number(previewRef.current?.style.height.replace("px", "")) *
                image.scale
              }px`,
              maxWidth: `${
                Number(previewRef.current?.style.width.replace("px", "")) *
                image.scale
              }px`,
            }}
            className={`${
              !image.visibility ? "hidden" : ""
            } transition-all duration-300`}
          />
        )}
        {!image.src && (
          <span
            className="text-black font-bold text-center break-words p-4"
            style={{
              fontSize: `${Math.max(
                16,
                Math.min(dimension.width, dimension.height) / 20
              )}px`,
              maxWidth: "100%",
            }}
          >
            {text}
          </span>
        )}
        {/* <div className="absolute top-0 left-0 p-2 text-xs text-red-500">
          Top Left
        </div>
        <div className="absolute top-0 right-0 p-2 text-xs text-red-500">
          Top Right
        </div>
        <div className="absolute bottom-0 left-0 p-2 text-xs text-red-500">
          Bottom Left
        </div>
        <div className="absolute bottom-0 right-0 p-2 text-xs text-red-500">
          Bottom Right
        </div> */}
      </div>
    </div>
  );
};

export default Preview;
