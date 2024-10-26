import { cn } from "@/lib/utils";
import { gugi } from "@/lib/utils/fonts";
import Image from "next/image";

const StartLoader = () => {
  return (
    <div className="absolute left-0 top-0 z-50 flex size-full items-center justify-center bg-gradient-to-bl from-[#0E4598] to-[#1573FE] p-4">
      <div className="flex size-full flex-col items-center justify-center gap-4 rounded-xl bg-background">
        <div className="flex flex-col items-center justify-center gap-4">
          <Image src="/Logo.svg" alt="Logo" width={125} height={125} className="animate-bounce-slow" />
          <p className={cn("text-5xl font-bold text-primary", gugi.className)}>
            AURA
          </p>
        </div>
        <p className="text-2xl font-semibold text-[#1573FE]">Create, Share, Inspire</p>
      </div>
    </div>
  );
};

export default StartLoader;
