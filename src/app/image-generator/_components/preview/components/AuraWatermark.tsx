import { forwardRef } from "react";
import Logo from "@/components/Logo";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { cn } from "@/lib/utils";

const AuraWatermark = forwardRef<HTMLDivElement, unknown>((_, ref) => {
  const dimension = useImageGeneratorStore((s) => s.settings.dimension);
  const auraWatermark = useImageGeneratorStore(
    (s) => s.settings.watermark.aura
  );

  const watermarkPosition = 12 * (dimension.height / 500);

  return (
    <div
      id="auraWatermarkContainer"
      ref={ref}
      className={cn("absolute z-20", auraWatermark.position)}
      style={{
        top: auraWatermark.position.includes("top")
          ? `${watermarkPosition}px`
          : "",
        right: auraWatermark.position.includes("right")
          ? `${watermarkPosition}px`
          : "",
        bottom: auraWatermark.position.includes("bottom")
          ? `${watermarkPosition}px`
          : "",
        left: auraWatermark.position.includes("left")
          ? `${watermarkPosition}px`
          : "",
      }}
    >
      <Logo
        size="watermark"
        background={auraWatermark.background}
        foreground={auraWatermark.foreground}
      />
    </div>
  );
});

AuraWatermark.displayName = "AuraWatermark";

export default AuraWatermark;
