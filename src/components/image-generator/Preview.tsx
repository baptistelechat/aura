/* eslint-disable @next/next/no-img-element */
import defaultImageGeneratorSettings from "@/lib/constant/defaultImageGeneratorSettings";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import { RefObject } from "react";

interface IPreviewProps {
  containerRef: RefObject<HTMLDivElement>;
  previewRef: RefObject<HTMLDivElement>;
  imageRef: RefObject<HTMLImageElement>;
}

const Preview = ({ containerRef, previewRef, imageRef }: IPreviewProps) => {
  const { text, background, dimension, image } = useImageGeneratorStore(
    (s) => s.settings
  );

  const gradient = useImageGeneratorStore(
    (s) => s.settings.background.gradient
  );

  const backgroundStyle =
    gradient.from.hex !== defaultImageGeneratorSettings.background.gradient.from.hex ||
    gradient.via.hex !== defaultImageGeneratorSettings.background.gradient.via.hex ||
    gradient.to.hex !== defaultImageGeneratorSettings.background.gradient.to.hex 
      ? typeof gradient.orientation === "string" &&
        gradient.orientation.includes("circle")
        ? `radial-gradient(${gradient.orientation}, ${gradient.from.hex} 0%, ${gradient.via.hex} 50%, ${gradient.to.hex} 100%)`
        : `linear-gradient(${gradient.orientation}deg, ${gradient.from.hex} 0%, ${gradient.via.hex} 50%, ${gradient.to.hex} 100%)`
      : background.backgroundColor;

  return (
    <div
      id="preview-container"
      ref={containerRef}
      className="flex size-full grow items-center justify-center overflow-hidden"
    >
      <div
        id="preview"
        ref={previewRef}
        style={{
          background: backgroundStyle,
          transition: "all 0.3s ease",
          position: "relative",
        }}
        className="relative flex items-center justify-center overflow-hidden rounded-xl border border-slate-200 transition-all duration-300"
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
            className="break-words p-4 text-center font-bold text-black"
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
