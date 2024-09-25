import { cn } from "@/lib/utils";
import { Gugi } from "next/font/google";
import Image from "next/image";

const gugi = Gugi({ weight: "400", subsets: ["latin"] });

interface ILogoProps {
  variant?: "color" | "light" | "dark";
  size?: "sm" | "md" | "lg";
  orientation?: "horizontal" | "vertical";
}

const Logo = ({
  size = "md",
  orientation = "horizontal",
}: ILogoProps) => {
  const sizeMapping = {
    sm: 20,
    md: 40,
    lg: 60,
  };

  const textMapping = {
    sm:"text-xl",
    md:"text-2xl",
    lg: "text-3xl"
  }

  const dimensions = sizeMapping[size];
  const textSize = textMapping[size];

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        orientation === "vertical" ? "flex-col" : "flex-row"
      )}
    >
      <Image
        src="/Logo.svg"
        alt="Logo"
        width={dimensions}
        height={dimensions}
      />
      <h1 className={cn("text-[#0E4598]", textSize, gugi.className)}>Aura</h1>
    </div>
  );
};

export default Logo;
