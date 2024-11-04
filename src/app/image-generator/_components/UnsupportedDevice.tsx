"use client";
import { browsers } from "@/lib/constant/browsers";
import { PreviewVariants } from "@/lib/utils/framer-motion/variants";
import { motion } from "framer-motion";
import { MonitorSmartphone } from "lucide-react";
import Image from "next/image";

const UnsupportedDevice = () => {
  return (
    <motion.div
      variants={PreviewVariants}
      initial="hidden"
      animate="visible"
      className="relative flex size-full gap-8 p-8"
    >
      <div className="flex size-full flex-col items-center justify-center gap-4">
        <MonitorSmartphone className="size-40" />
        <p className="text-center text-3xl font-bold">
          For the best experience, please use Aura on a desktop browser
        </p>
        <p className="text-center text-lg text-muted-foreground">
          Mobile and small devices are not supported, and some browsers are not
          yet compatible.
        </p>
        <p className="text-center text-lg text-muted-foreground">
          Meanwhile, we recommend using one of the desktop browsers suggested
          below.
        </p>
        <div className="flex items-center justify-center gap-4">
          {browsers.map((browser) => (
            <div
              key={browser.name.toLowerCase()}
              className="flex flex-col items-center justify-center gap-2"
            >
              <Image
                src={browser.logo}
                alt={browser.name}
                width={40}
                height={40}
              />
              <p
                className="text-sm font-medium"
                style={{ color: browser.color }}
              >
                {browser.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default UnsupportedDevice;
