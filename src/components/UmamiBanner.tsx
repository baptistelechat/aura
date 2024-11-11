"use client";
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
import { useEffect, useState } from "react";

const UmamiBanner = () => {
  const [isOpen, setIsOpen] = useState(true);

  const EXPIRATION_TIME = 30 * 24 * 60 * 60 * 1000; // 30 days

  const hasConsentExpired = (timestamp: string | null) => {
    if (!timestamp) return true;

    const currentTime = Date.now();
    const consentTime = parseInt(timestamp, 10);
    return currentTime - consentTime > EXPIRATION_TIME;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const consentTimestamp = localStorage.getItem("umami.consent.timestamp");
      setIsOpen(hasConsentExpired(consentTimestamp));
    }
  }, []);

  const handleAccept = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("umami.disabled");
      localStorage.setItem("umami.consent.timestamp", Date.now().toString());
    }
    setIsOpen(false);
  };

  const handleDecline = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("umami.disabled", "1");
      localStorage.setItem("umami.consent.timestamp", Date.now().toString());
    }
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={() => undefined}>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 font-bold text-primary">
            <ChartSpline className="size-4" />
            <p>Umami Analytics</p>
          </SheetTitle>
          <SheetDescription>
            <div className="mb-2 flex items-center gap-2">
              <Image
                src={"/images/assets/umami.png"}
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
