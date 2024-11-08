"use client";
import { Accordion } from "@/components/ui/accordion";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { hotkeys } from "@/lib/constant/hotkeys";
import { Hotkey, HotkeyCategory } from "@/lib/types/Hotkey";
import { cn } from "@/lib/utils";
import { ActionVariants } from "@/lib/utils/framer-motion/variants";
import { getHotkeyById } from "@/lib/utils/hotkey/getHotkeyById";
import {
  Blend,
  Eye,
  FileImage,
  ImageIcon,
  Keyboard,
  Layout,
  Milestone,
  PaintbrushVertical,
  Save,
  Shapes,
  Sparkle,
  Tags,
} from "lucide-react";
import CustomAccordionItem from "../image-generator/CustomAccordionItem";
import Shortcut from "./Shortcut";

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

  const categoryOrder: HotkeyCategory[] = [
    "general",
    "save",
    "navigation",
    "image",
    "background-color",
    "background-image",
    "background-effects",
    "overlays",
    "annotations",
    "watermarks",
    "visibility",
  ];

  const categoryTitles: Record<string, { title: string; icon: JSX.Element }> = {
    general: { title: "General", icon: <Layout className="size-4" /> },
    save: { title: "Save Image", icon: <Save className="size-4" /> },
    navigation: { title: "Navigation", icon: <Milestone className="size-4" /> },
    image: { title: "Image", icon: <FileImage className="size-4" /> },
    "background-color": {
      title: "Background Color",
      icon: <PaintbrushVertical className="size-4" />,
    },
    "background-image": {
      title: "Background Image",
      icon: <ImageIcon className="size-4" />,
    },
    "background-effects": {
      title: "Background Effects",
      icon: <Sparkle className="size-4" />,
    },
    overlays: { title: "Overlays", icon: <Blend className="size-4" /> },
    annotations: { title: "Annotations", icon: <Shapes className="size-4" /> },
    watermarks: { title: "Watermarks", icon: <Tags className="size-4" /> },
    visibility: { title: "Visibility", icon: <Eye className="size-4" /> },
  };

  const categorizedHotkeys = hotkeys.reduce(
    (acc: Record<string, Hotkey[]>, hotkey: Hotkey) => {
      hotkey.category.forEach((category) => {
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(hotkey);
      });
      return acc;
    },
    {}
  );

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <MotionButton
            id="hotkeyHelperButton"
            variant="outline"
            size="icon"
            variants={ActionVariants}
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
            Open Hotkey Helper dialog
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
          <ScrollArea className="max-h-[calc(100vh-400px)] grow">
            <Accordion type="multiple">
              {categoryOrder.map(
                (category) =>
                  categorizedHotkeys[category] && (
                    <CustomAccordionItem
                      key={category}
                      title={categoryTitles[category].title}
                      icon={categoryTitles[category].icon}
                    >
                      {categorizedHotkeys[category]
                        .sort((a, b) => {
                          const orderA = a.order?.[category] ?? Infinity;
                          const orderB = b.order?.[category] ?? Infinity;
                          return (
                            orderA - orderB || a.name.localeCompare(b.name)
                          );
                        })
                        .map((hotkey: Hotkey) => (
                          <div
                            key={hotkey.id}
                            className={cn(
                              "flex items-center justify-between py-2",
                              categorizedHotkeys[category].length - 1 !==
                                categorizedHotkeys[category].indexOf(hotkey)
                                ? "border-b"
                                : ""
                            )}
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
                    </CustomAccordionItem>
                  )
              )}
            </Accordion>
          </ScrollArea>
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
