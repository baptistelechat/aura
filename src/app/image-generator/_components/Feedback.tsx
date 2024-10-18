import Shortcut from "@/components/keyboard/Shortcut";
import Loader, { LoaderEnum } from "@/components/Loader";
import { Button, MotionButton } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getHotkeyById } from "@/lib/utils/hotkey/getHotkeyById";
import { Variants } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { useState } from "react";

const FeedbackVariants: Variants = {
  hidden: {
    x: 50,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};

const Feedback = () => {
  const [isLoading, setIsLoading] = useState(true);
  const hotkey = getHotkeyById("openFeedback");

  const openSheet = () => {
    const feedbackButtonTrigger = document.getElementById(
      "feedbackButtonTrigger"
    );
    if (feedbackButtonTrigger) {
      feedbackButtonTrigger.click();
    }
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <MotionButton
            id="feedbackButton"
            variant="outline"
            size="icon"
            variants={FeedbackVariants}
            initial="hidden"
            animate="visible"
            onClick={() => openSheet()}
          >
            <HelpCircle className="size-5" />
            <span className="sr-only">Feedback & Support</span>
          </MotionButton>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex flex-col items-center gap-2">
            <p>{hotkey.name}</p>
            <Shortcut hotkey={hotkey.key} />
          </div>
        </TooltipContent>
      </Tooltip>
      <Sheet onOpenChange={(open) => setIsLoading(open)}>
        <SheetTrigger asChild>
          <Button id="feedbackButtonTrigger" className="hidden">
            Open Feedback sheet
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 font-bold text-primary">
              <HelpCircle className="size-4" />
              <p>Feedback & Support</p>
            </SheetTitle>
            <SheetDescription>
              Share your thoughts, report an issue, or provide feedback to help
              us improve.
            </SheetDescription>
          </SheetHeader>
          <div className="relative size-full py-4">
            {isLoading && (
              <div className="flex size-full flex-col items-center justify-center gap-4 text-primary">
                <Loader loader={LoaderEnum.REULEAUX} color="#2563eb" />
                <p className="text-xl font-bold text-primary">Loading ...</p>
              </div>
            )}
            <iframe
              src="https://tally.so/r/wAqXpW"
              width="100%"
              height="90%"
              title="Aura - Feedback & Support"
              onLoad={() => setIsLoading(false)}
            ></iframe>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Feedback;
