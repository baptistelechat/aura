import { cn } from "@/lib/utils";
import { Gugi } from "next/font/google";
import Image from "next/image";

const gugi = Gugi({ weight: "400", subsets: ["latin"] });

const sizeMapping = { sm: 20, md: 40, lg: 60, watermark: 36 };
const textMapping = {
  sm: 18, //text-lg
  md: 20, //"text-xl"
  lg: 24, //text-2xl
  watermark: 24, //text-2xl
};

const getBackgroundClass = (background: ILogoProps["background"]) => {
  switch (background) {
    case "light":
      return "bg-white";
    case "dark":
      return "bg-black";
    case "color-dark":
      return "bg-[#0E4598]";
    case "color-light":
      return "bg-[#1573FE]";
    default:
      return "bg-transparent";
  }
};

const getTextClass = (variant: ILogoProps["variant"]) => {
  switch (variant) {
    case "light":
      return "text-white";
    case "dark":
      return "text-black";
    case "color-dark":
      return "text-[#0E4598]";
    case "color-light":
      return "text-[#1573FE]";
    default:
      return "";
  }
};

interface ILogoProps {
  variant?: "color-light" | "color-dark" | "light" | "dark";
  size?: "sm" | "md" | "lg" | "watermark";
  orientation?: "horizontal" | "vertical";
  background?: "color-light" | "color-dark" | "light" | "dark";
}

const Logo = ({
  variant = "color-dark",
  size = "md",
  orientation = "horizontal",
  background,
}: ILogoProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full px-8 py-3",
        getBackgroundClass(background),
        orientation === "vertical" ? "flex-col" : "flex-row",
      )}
    >
      {size === "watermark" && (
        <p
          className={cn("font-semibold", getTextClass(variant), gugi.className)}
          style={{
            fontSize: textMapping[size] + "px",
          }}
        >
          Create with
        </p>
      )}
      <Image
        src={
          variant === "light"
            ? "/Logo-light.svg"
            : variant === "dark"
            ? "/Logo-dark.svg"
            : "/Logo.svg"
        }
        alt="Logo"
        width={sizeMapping[size]}
        height={sizeMapping[size]}
      />
      <h1
        className={cn(getTextClass(variant), gugi.className)}
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
