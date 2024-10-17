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
import { Variants } from "framer-motion";
import { HelpCircle } from "lucide-react";

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
  return (
    <Sheet>
      <SheetTrigger asChild>
        <MotionButton
          id="feedbackButton"
          variant="outline"
          size="icon"
          variants={FeedbackVariants}
          initial="hidden"
          animate="visible"
        >
          <HelpCircle className="size-5" />
          <span className="sr-only">Feedback & Support</span>
        </MotionButton>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Feedback & Support</SheetTitle>
          <SheetDescription>
            Share your thoughts, report an issue, or provide feedback to help us
            improve.
          </SheetDescription>
        </SheetHeader>
        <div className="size-full py-4">
          <iframe
            src="https://tally.so/r/wAqXpW"
            width="100%"
            height="90%"
            title="Aura - Feedback & Support"
          ></iframe>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Feedback;
