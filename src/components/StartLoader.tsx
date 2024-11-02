"use client";
import { cn } from "@/lib/utils";
import { gugi } from "@/lib/utils/fonts";
import { LoaderVariants } from "@/lib/utils/framer-motion/variants";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const StartLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const randomImageNumber = Math.floor(Math.random() * 10) + 1;

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!isLoading) {
    return <></>;
  }

  return (
    <div className="absolute left-0 top-0 z-50 flex size-full items-center justify-center bg-gradient-to-bl from-[#0E4598] to-[#1573FE] p-4">
      <div className="flex size-full rounded-xl bg-background">
        <div className="flex h-full w-1/2 flex-col items-center justify-center gap-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <Image
              src="/images/logo/Logo.svg"
              alt="Logo"
              width={150}
              height={150}
              className="animate-bounce-slow"
            />
            <p className={cn("text-6xl text-[#0E4598]", gugi.className)}>
              AURA
            </p>
          </div>
          <p className="text-3xl font-semibold text-[#1573FE]">
            Create, Share, Inspire
          </p>
        </div>
        <div className="flex h-full w-1/2 flex-col items-center justify-center gap-4">
          <motion.div
            className="relative size-full"
            variants={LoaderVariants}
            initial="hidden"
            animate="visible"
          >
            <Image
              src={`/images/og-images/${randomImageNumber}.jpg`}
              alt="Background"
              fill
              className="rounded-r-xl object-cover grayscale"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StartLoader;
