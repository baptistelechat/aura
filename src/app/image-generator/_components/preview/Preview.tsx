/* eslint-disable @next/next/no-img-element */
"use client";
import DropZone from "@/components/image-generator/DropZone";
import Logo from "@/components/Logo";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { transparentBackgroundStyle } from "@/lib/constant/transparentBackgroundStyle";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { cn } from "@/lib/utils";
import { uploadImage } from "@/lib/utils/image-generator/uploadImage";
import { useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import NoiseBackground from "./components/NoiseBackground";

const Preview = () => {
  const dimension = useImageGeneratorStore((s) => s.settings.dimension);
  const image = useImageGeneratorStore((s) => s.settings.image);
  const background = useImageGeneratorStore((s) => s.settings.background);

  const gradient = useImageGeneratorStore(
    (s) => s.settings.background.gradient
  );

  const overlay = useImageGeneratorStore((s) => s.settings.overlay);

  const watermark = useImageGeneratorStore((s) => s.settings.watermark);

  const setPreviewRefs = useImageGeneratorStore((s) => s.setPreviewRefs);

  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLImageElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  const onDrop = useCallback((files: File[]) => {
    uploadImage(files[0], "image");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    setPreviewRefs({
      containerRef,
      previewRef,
      backgroundRef,
      imageRef,
      watermarkRef,
    });
  }, []);

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.style.width = `${dimension.width}px`;
      previewRef.current.style.height = `${dimension.height}px`;
    }
  }, [dimension.width, dimension.height]);

  const watermarkAngle =
    watermark.position === "top-left"
      ? "top-4 left-4 origin-top-left"
      : watermark.position === "top-right"
      ? "top-4 right-4 origin-top-right"
      : watermark.position === "bottom-left"
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
      className="relative size-full"
    >
      <div
        id="preview"
        ref={previewRef}
        className="absolute left-0 top-0 flex origin-top-left items-center justify-center overflow-hidden rounded-3xl border border-slate-200 transition-all	duration-700 ease-in-out"
        style={{
          width: `${dimension.width}px`,
          height: `${dimension.height}px`,
        }}
      >
        {/* Background layer */}
        <div
          ref={backgroundRef}
          className="absolute inset-0 z-0"
          style={{
            background: backgroundStyle,
            filter: `blur(${background.blur}px)`,
            ...(background.backgroundImage && {
              background: `url(${background.backgroundImage}) center center / cover`,
            }),
            ...(background.backgroundColor === "" && {
              backgroundImage: transparentBackgroundStyle,
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0, 10px 10px",
            }),
          }}
        />
        <NoiseBackground />

        {/* Content layer */}
        <div className="relative z-10 flex size-full items-center justify-center">
          {image.src ? (
            <div
              className="cursor-pointer transition-all duration-300 hover:brightness-75"
              style={{ perspective: "1500px" }}
            >
              <img
                {...getRootProps()}
                ref={imageRef}
                src={image.src}
                alt="Selected"
                style={{
                  display: "block",
                  borderRadius: `${image.borderRadius* (dimension.height / 500)}px`,
                  filter: `drop-shadow(0 ${
                    20 * (dimension.height / 500) * (1 + image.shadow)
                  }px ${
                    20 * (dimension.height / 500) * (1 + image.shadow)
                  }px rgb(0 0 0 / ${image.shadow})) ${
                    isDragActive ? "brightness(0.75)" : ""
                  }`,
                  width: "100%",
                  height: "100%",
                  scale: image.scale,
                  maxWidth: dimension.width,
                  maxHeight: dimension.height,
                  transform: `rotateX(${image.rotateX}deg) rotateY(${image.rotateY}deg) rotateZ(${image.rotateZ}deg)`,
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                  objectFit: "cover",
                }}
                className={cn(
                  "transition-all duration-300 ease-in-out",
                  !image.visibility ? "hidden" : "",
                  !image.src && "bg-primary/20 p-8"
                )}
              />
            </div>
          ) : (
            <DropZone mode="image" />
          )}
          <input {...getInputProps()} accept="image/*" />
        </div>

        {/* Overlay Shadow */}
        {overlay.name && overlay.name.includes("shadow") && (
          <img
            src={`${overlay.name}`}
            alt="Overlay Shadow"
            className="pointer-events-none absolute inset-0 z-10 size-full object-cover"
            style={{
              opacity: overlay.opacity,
            }}
          />
        )}

        {/* Watermark */}
        <div
          id="watermark-container"
          ref={watermarkRef}
          className={cn("absolute z-20", watermarkAngle)}
        >
          <Logo
            size="watermark"
            background={watermark.background}
            foreground={watermark.foreground}
          />
        </div>
      </div>
    </div>
  );
};

export default Preview;
