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
import { Variants } from "framer-motion";
import { Newspaper } from "lucide-react";

const ChangelogVariants: Variants = {
  hidden: {
    x: 50,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};

const Changelog = () => {
  const openSheet = () => {
    const changelogButtonTrigger = document.getElementById(
      "changelogButtonTrigger"
    );
    if (changelogButtonTrigger) {
      changelogButtonTrigger.click();
    }
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <MotionButton
            id="changelogButton"
            variant="outline"
            size="icon"
            variants={ChangelogVariants}
            initial="hidden"
            animate="visible"
            onClick={() => openSheet()}
          >
            <Newspaper className="size-5" />
            <span className="sr-only">Changelog & Support</span>
          </MotionButton>
        </TooltipTrigger>
        <TooltipContent>
          <p>Read Changelog</p>
        </TooltipContent>
      </Tooltip>
      <Sheet>
        <SheetTrigger asChild>
          <Button id="changelogButtonTrigger" className="hidden">
            Open Changelog sheet
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 font-bold text-primary">
              <Newspaper className="size-4" />
              <p>Changelog</p>
            </SheetTitle>
            <SheetDescription>
              Stay tuned for the latest updates and improvements to our
              application. Check this section regularly for new features and bug
              fixes.
            </SheetDescription>
            <div className="flex h-full flex-col">
              <ScrollArea className="h-[calc(100vh-150px)] grow">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Asperiores expedita quasi eius obcaecati, laboriosam quam
                  aperiam rem. Quisquam, voluptas nobis similique eum
                  consectetur labore culpa, minima exercitationem dolorem enim
                  architecto?
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Asperiores expedita quasi eius obcaecati, laboriosam quam
                  aperiam rem. Quisquam, voluptas nobis similique eum
                  consectetur labore culpa, minima exercitationem dolorem enim
                  architecto?
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Asperiores expedita quasi eius obcaecati, laboriosam quam
                  aperiam rem. Quisquam, voluptas nobis similique eum
                  consectetur labore culpa, minima exercitationem dolorem enim
                  architecto?
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Asperiores expedita quasi eius obcaecati, laboriosam quam
                  aperiam rem. Quisquam, voluptas nobis similique eum
                  consectetur labore culpa, minima exercitationem dolorem enim
                  architecto?
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Asperiores expedita quasi eius obcaecati, laboriosam quam
                  aperiam rem. Quisquam, voluptas nobis similique eum
                  consectetur labore culpa, minima exercitationem dolorem enim
                  architecto?
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Asperiores expedita quasi eius obcaecati, laboriosam quam
                  aperiam rem. Quisquam, voluptas nobis similique eum
                  consectetur labore culpa, minima exercitationem dolorem enim
                  architecto?
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Asperiores expedita quasi eius obcaecati, laboriosam quam
                  aperiam rem. Quisquam, voluptas nobis similique eum
                  consectetur labore culpa, minima exercitationem dolorem enim
                  architecto?
                </p>
              </ScrollArea>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Changelog;
