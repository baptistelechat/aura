"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { cn } from "@/lib/utils";
import { getHotkeyById } from "@/lib/utils/hotkey/getHotkeyById";
import { generateImage } from "@/lib/utils/image-generator/generateImage";
import { ClipboardCopy } from "lucide-react";
import Shortcut from "../../../components/keyboard/Shortcut";

interface ICopyToClipboardProps {
  extraStyle?: string;
}

const CopyToClipboard = ({ extraStyle }: ICopyToClipboardProps) => {
  const isDownloading = useImageGeneratorStore((s) => s.general.isDownloading);
  const hotkey = getHotkeyById("copyToClipboard");

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          disabled={isDownloading}
          className={cn("px-2", extraStyle)}
          size="icon"
          onClick={() =>
            generateImage({
              action: "clipboard",
            })
          }
        >
          <ClipboardCopy className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <div className="flex flex-col items-center gap-2">
          <p>{hotkey.name}</p>
          <Shortcut hotkey={hotkey.key} />
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default CopyToClipboard;
