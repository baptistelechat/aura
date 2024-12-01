import { WatermarkBackgroundColor, WatermarkForegroundColor } from "@/lib/types/ImageGeneratorSettings";
import { cn } from "@/lib/utils";
import { getWatermarkBackgroundClass } from "@/lib/utils/colors/watermarks/getWatermarkBackgroundClass";
import { getWatermarkTextClass } from "@/lib/utils/colors/watermarks/getWatermarkTextClass";
import { gugi } from "@/lib/utils/fonts";
import Image from "next/image";

const sizeMapping = { sm: 20, md: 40, lg: 60, watermark: 36 };
const textMapping = {
  sm: 18, //text-lg
  md: 20, //"text-xl"
  lg: 24, //text-2xl
  watermark: 24, //text-2xl
};

interface ILogoProps {
  size?: "sm" | "md" | "lg" | "watermark";
  background?: WatermarkBackgroundColor;
  foreground?: WatermarkForegroundColor;
  orientation?: "horizontal" | "vertical";
}

const Logo = ({
  foreground = "color-dark",
  size = "md",
  orientation = "horizontal",
  background = "transparent",
}: ILogoProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full",
        size === "watermark" && "px-8 py-3",
        getWatermarkBackgroundClass(background),
        orientation === "vertical" ? "flex-col" : "flex-row"
      )}
    >
      {size === "watermark" && (
        <p
          className={cn(getWatermarkTextClass(foreground), gugi.className)}
          style={{
            fontSize: textMapping[size] + "px",
          }}
        >
          Create with
        </p>
      )}
      <Image
        src={
          foreground === "light"
            ? "/images/logo/Logo-light.svg"
            : foreground === "dark"
            ? "/images/logo/Logo-dark.svg"
            : "/images/logo/Logo.svg"
        }
        alt="Logo"
        width={sizeMapping[size]}
        height={sizeMapping[size]}
      />
      <h1
        className={cn(getWatermarkTextClass(foreground), gugi.className)}
        style={{
          fontSize: textMapping[size] + "px",
        }}
      >
        Aura
      </h1>
    </div>
  );
};

export default Logo;
