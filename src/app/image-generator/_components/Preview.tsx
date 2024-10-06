/* eslint-disable @next/next/no-img-element */
import Logo from "@/components/Logo";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { transparentBackgroundStyle } from "@/lib/constant/transparentBackgroundStyle";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { cn } from "@/lib/utils";
import { RefObject } from "react";
import NoiseBackground from "./NoiseBackground";

interface IPreviewProps {
  containerRef: RefObject<HTMLDivElement>;
  previewRef: RefObject<HTMLDivElement>;
  backgroundRef: RefObject<HTMLDivElement>;
  imageRef: RefObject<HTMLImageElement>;
  watermarkRef: RefObject<HTMLDivElement>;
}

const Preview = ({
  containerRef,
  previewRef,
  backgroundRef,
  imageRef,
  watermarkRef,
}: IPreviewProps) => {
  const text = useImageGeneratorStore((s) => s.settings.text);
  const background = useImageGeneratorStore((s) => s.settings.background);
  const dimension = useImageGeneratorStore((s) => s.settings.dimension);
  const image = useImageGeneratorStore((s) => s.settings.image);

  const gradient = useImageGeneratorStore(
    (s) => s.settings.background.gradient
  );

  const watermarkPosition = useImageGeneratorStore(
    (s) => s.settings.watermark.position
  );
  const watermarkBackground = useImageGeneratorStore(
    (s) => s.settings.watermark.background
  );
  const watermarkForeground = useImageGeneratorStore(
    (s) => s.settings.watermark.foreground
  );

  const watermarkAngle =
    watermarkPosition === "top-left"
      ? "top-4 left-4 origin-top-left"
      : watermarkPosition === "top-right"
      ? "top-4 right-4 origin-top-right"
      : watermarkPosition === "bottom-left"
      ? "bottom-4 left-4 origin-bottom-left"
      : "bottom-4 right-4 origin-bottom-right";

  const backgroundStyle =
    gradient.from.hex !==
      defaultImageGeneratorSettings.background.gradient.from.hex ||
    gradient.via.hex !==
      defaultImageGeneratorSettings.background.gradient.via.hex ||
    gradient.to.hex !== defaultImageGeneratorSettings.background.gradient.to.hex
      ? typeof gradient.orientation === "string" &&
        gradient.orientation.includes("circle")
        ? `radial-gradient(${gradient.orientation}, ${gradient.from.hex} 0%, ${
            gradient.useVia ? gradient.via.hex : ""
          } 50%, ${gradient.to.hex} 100%)`
        : `linear-gradient(${gradient.orientation}deg, ${
            gradient.from.hex
          } 0%,  ${gradient.useVia ? gradient.via.hex : ""} 50%, ${
            gradient.to.hex
          } 100%)`
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
        className="relative flex items-center justify-center overflow-hidden rounded-xl border border-slate-200 transition-all duration-300"
        style={{
          position: "relative",
          transition: "all 0.3s ease",
        }}
      >
        {/* Background layer */}
        <div
          ref={backgroundRef}
          className="absolute inset-0 z-0"
          style={{
            background: backgroundStyle,
            filter: `blur(${background.blur}px)`,
            ...(background.backgroundColor === "" && {
              backgroundImage: transparentBackgroundStyle,
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0, 10px 10px",
            }),
          }}
        />
        <NoiseBackground />

        {/* Content layer */}
        <div
          className="relative z-10 flex items-center justify-center"
          style={{
            position: "relative",
            maxHeight: "100%",
            maxWidth: "100%",
          }}
        >
          {image.src && (
            <img
              ref={imageRef}
              src={image.src}
              alt="Selected"
              style={{
                borderRadius: `${image.borderRadius}px`,
                filter: `drop-shadow(0 25px 25px rgb(0 0 0 / ${image.shadow}))`,
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
        </div>

        {/* Watermark */}
        <div ref={watermarkRef} className={cn("absolute", watermarkAngle)}>
          <Logo
            size="watermark"
            background={watermarkBackground}
            foreground={watermarkForeground}
          />
        </div>
      </div>
    </div>
  );
};

export default Preview;
