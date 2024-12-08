import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { cn } from "@/lib/utils";
import { getSocialIconWatermarkColor } from "@/lib/utils/colors/watermarks/getSocialIconWatermarkColor";
import { getWatermarkTextClass } from "@/lib/utils/colors/watermarks/getWatermarkTextClass";
import Image from "next/image";
import { forwardRef } from "react";

const SocialWatermark = forwardRef<HTMLDivElement, unknown>((_, ref) => {
  const dimension = useImageGeneratorStore((s) => s.settings.dimension);
  const socialWatermark = useImageGeneratorStore(
    (s) => s.settings.watermark.social
  );

  const watermarkPosition = 12 * (dimension.height / 500);

  return (
    <div
      id="socialWatermarkContainer"
      ref={ref}
      className={cn(
        "absolute z-20 flex gap-3 items-center",
        socialWatermark.position.includes("left")
          ? "flex-row"
          : "flex-row-reverse",
        socialWatermark.position
      )}
      style={{
        top: socialWatermark.position.includes("top")
          ? `${watermarkPosition}px`
          : "",
        right: socialWatermark.position.includes("right")
          ? `${watermarkPosition}px`
          : "",
        bottom: socialWatermark.position.includes("bottom")
          ? `${watermarkPosition}px`
          : "",
        left: socialWatermark.position.includes("left")
          ? `${watermarkPosition}px`
          : "",
      }}
    >
      <Image
        src={`/images/assets/social/${socialWatermark.icon}.svg`}
        alt="Social watermark"
        width={50}
        height={50}
        style={{
          filter: getSocialIconWatermarkColor(),
        }}
      />
      <div
        className={cn(
          "flex flex-col gap-1",
          socialWatermark.position.includes("left")
            ? "items-start"
            : "items-end",
          getWatermarkTextClass(socialWatermark.foreground)
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
