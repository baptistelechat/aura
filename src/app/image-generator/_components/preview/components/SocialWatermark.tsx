import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const SocialWatermark = forwardRef<HTMLDivElement, unknown>((_, ref) => {
  const dimension = useImageGeneratorStore((s) => s.settings.dimension);
  const position = useImageGeneratorStore(
    (s) => s.settings.watermark.social.position
  );

  const watermarkPosition = 12 * (dimension.height / 500);

  return (
    <div
      id="socialWatermarkContainer"
      ref={ref}
      className={cn("absolute z-20", position)}
      style={{
        top: position.includes("top") ? `${watermarkPosition}px` : "",
        right: position.includes("right") ? `${watermarkPosition}px` : "",
        bottom: position.includes("bottom") ? `${watermarkPosition}px` : "",
        left: position.includes("left") ? `${watermarkPosition}px` : "",
      }}
    >
      <div
        className={cn(
          "flex flex-col gap-1",
          position.includes("left") ? "items-start" : "items-end"
        )}
      >
        <p className="font-semibold">Baptiste LECHAT</p>
        <p>@baptistelechat</p>
      </div>
    </div>
  );
});

SocialWatermark.displayName = "SocialWatermark";

export default SocialWatermark;
