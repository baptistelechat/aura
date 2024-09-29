"use client";
import { Button, MotionButton } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { hotkeys } from "@/lib/constant/hotkeys";
import { Hotkey } from "@/lib/types/Hotkey";
import { getHotkeyById } from "@/lib/utils/hotkey/getHotkeyById";
import { Variants } from "framer-motion";
import { Keyboard } from "lucide-react";
import Shortcut from "./Shortcut";

const HotkeyHelperVariants: Variants = {
  hidden: {
    x: 50,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};

const HotkeyHelper = () => {
  const hotkey = getHotkeyById("openHotkeyHelper");

  const openDialog = () => {
    const hotkeyHelperButtonTrigger = document.getElementById(
      "hotkeyHelperButtonTrigger"
    );
    if (hotkeyHelperButtonTrigger) {
      hotkeyHelperButtonTrigger.click();
    }
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <MotionButton
            id="hotkeyHelperButton"
            variant="outline"
            size="icon"
            variants={HotkeyHelperVariants}
            initial="hidden"
            animate="visible"
            onClick={() => openDialog()}
          >
            <Keyboard className="size-5" />
            <span className="sr-only">Show hotkey helper</span>
          </MotionButton>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex flex-col items-center gap-2">
            <p>{hotkey.name}</p>
            <Shortcut hotkey={hotkey.key} />
          </div>
        </TooltipContent>
      </Tooltip>
      <Dialog>
        <DialogTrigger asChild>
          <Button id="hotkeyHelperButtonTrigger" className="hidden">
            Open dialog
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-bold text-primary">
              <Keyboard className="size-4" />
              <p>Available Hotkeys</p>
            </DialogTitle>
            <DialogDescription>
              {
                "Here's a list of all the hotkeys you can use in the app. Use these to quickly perform actions."
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {hotkeys
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((hotkey: Hotkey) => (
                <div
                  key={hotkey.id}
                  className="flex items-center justify-between border-b p-2"
                >
                  <div className="pr-8">
                    <p className="font-semibold">{hotkey.name}</p>
                    <p className="text-sm text-gray-500">
                      {hotkey.description}
                    </p>
                  </div>
                  <Shortcut hotkey={getHotkeyById(hotkey.id).key} />
                </div>
              ))}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Got it!</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HotkeyHelper;
