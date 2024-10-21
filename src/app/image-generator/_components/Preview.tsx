/* eslint-disable @next/next/no-img-element */
"use client";
import Logo from "@/components/Logo";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { transparentBackgroundStyle } from "@/lib/constant/transparentBackgroundStyle";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import NoiseBackground from "./NoiseBackground";

const Preview = () => {
  const text = useImageGeneratorStore((s) => s.settings.text);
  const background = useImageGeneratorStore((s) => s.settings.background);
  const dimension = useImageGeneratorStore((s) => s.settings.dimension);
  const image = useImageGeneratorStore((s) => s.settings.image);

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

  useEffect(() => {
    setPreviewRefs({
      containerRef,
      previewRef,
      backgroundRef,
      imageRef,
      watermarkRef,
    });
  }, []);

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
      className="flex size-full grow items-center justify-center overflow-hidden"
    >
      <div
        id="preview"
        ref={previewRef}
        className="relative flex items-center justify-center overflow-hidden rounded-xl border border-slate-200 transition-all duration-300 ease-in-out"
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
              className={cn(
                "transition-all duration-300",
                !image.visibility ? "hidden" : ""
              )}
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

        {/* Overlay Shadow */}
        {overlay.name && overlay.name.includes("overlays-shadow") && (
          <div className="">
            <img
              src={`${overlay.name}`}
              alt="Overlay Shadow"
              className="absolute inset-0 z-10 size-full object-cover"
              style={{
                opacity: overlay.opacity,
              }}
            />
          </div>
        )}

        {/* Watermark */}
        <div
          id="watermark-container"
          ref={watermarkRef}
          className={cn(
            "absolute z-20",
            watermarkAngle,
          )}
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
