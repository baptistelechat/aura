"use client";
import { Button, MotionButton } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { changelogData } from "@/lib/constant/changelogData";
import { ActionVariants } from "@/lib/utils/framer-motion/variants";
import { Newspaper } from "lucide-react";
import { useEffect, useState } from "react";

const WhatsNews = () => {
  const [hasNewUpdates, setHasNewUpdates] = useState(false);

  const openSheet = () => {
    const buttonTrigger = document.getElementById("whatsNewsButtonTrigger");
    buttonTrigger?.click();
    localStorage.setItem("aura.whatsNews", changelogData.length.toString());
    setHasNewUpdates(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUpdateCount = localStorage.getItem("aura.whatsNews");
      const currentUpdateCount = changelogData.length;

      if (storedUpdateCount) {
        setHasNewUpdates(storedUpdateCount !== currentUpdateCount.toString());
      } else {
        localStorage.setItem("aura.whatsNews", "0");
      }
    }
  }, []);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <MotionButton
            id="whatsNewsButton"
            variant="outline"
            size="icon"
            variants={ActionVariants}
            initial="hidden"
            animate="visible"
            onClick={openSheet}
            showPing={hasNewUpdates}
          >
            <Newspaper className="size-5" />
            <span className="sr-only">What&apos;s news</span>
          </MotionButton>
        </TooltipTrigger>
        <TooltipContent>
          <p>What&apos;s news</p>
        </TooltipContent>
      </Tooltip>
      <Sheet>
        <SheetTrigger asChild>
          <Button id="whatsNewsButtonTrigger" className="hidden">
            Open What&apos;s news sheet
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 font-bold text-primary">
              <Newspaper className="size-4" />
              <p>What&apos;s news in Aura</p>
            </SheetTitle>
            <SheetDescription>
              Stay tuned for the latest updates and improvements to our
              application. Check this section regularly for new features and bug
              fixes.
            </SheetDescription>
            <div className="flex h-full flex-col">
              <ScrollArea className="h-[calc(100vh-150px)] grow pr-4">
                <div className="mt-4 space-y-4">
                  {changelogData.map((entry, index) => (
                    <div key={index} className="flex w-full gap-2">
                      <div className="flex w-32 flex-col text-lg font-bold text-primary">
                        <p>{entry.date.month}</p>
                        <p>
                          {String(entry.date.day).padStart(2, "0")},
                          {entry.date.year}
                        </p>
                      </div>
                      <div className="w-full border-l border-primary pl-2">
                        {entry.content}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default WhatsNews;
