"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { getHotkeyById } from "@/lib/utils/hotkey/getHotkeyById";
import { generateImage } from "@/lib/utils/image-generator/generateImage";
import { ClipboardCopy } from "lucide-react";
import Shortcut from "../../../components/keyboard/Shortcut";

const CopyToClipboard = () => {
  const isDownloading = useImageGeneratorStore((s) => s.general.isDownloading);
  const hotkey = getHotkeyById("copyToClipboard");

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          disabled={isDownloading}
          className="px-2"
          size="icon"
          onClick={() =>
            generateImage({
              action: "clipboard",
              method: "button",
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
