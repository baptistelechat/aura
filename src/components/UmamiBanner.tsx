"use client"
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ChartSpline } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const UmamiBanner = () => {
const [isOpen, setIsOpen] = useState(true);

  const handleAccept = () => {
    setIsOpen(false);
  };

  const handleDecline = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 font-bold text-primary">
            <ChartSpline className="size-4" />
            <p>Umami Analytics</p>
          </SheetTitle>
          <SheetDescription>
            <div className="flex items-center gap-2">
              <Image
                src={"/umami.png"}
                alt="Umami Logo"
                width={50}
                height={50}
              />
              <p>
                This website uses Umami Analytics to collect non-personal data,
                such as page views, clicks and device types. This data helps us
                understand user interactions, improve the project and develop
                new tools adapted to user needs. We have no visibility into the
                content created by users and all data collected remains
                anonymous.
              </p>
            </div>
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button
            variant="secondary"
            onClick={handleDecline}
            aria-label="Decline analytics tracking"
          >
            Decline
          </Button>
          <SheetClose asChild>
            <Button
              onClick={handleAccept}
              aria-label="Accept analytics tracking"
            >
              Accept
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default UmamiBanner;
