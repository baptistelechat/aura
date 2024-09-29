import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { getHotkeyById } from "@/lib/utils/hotkey/getHotkeyById";
import generateImage from "@/lib/utils/image-generator/generateImage";
import { ClipboardCopy } from "lucide-react";
import Shortcut from "../keyboard/Shortcut";

interface ICopyToClipboardProps {
  extraStyle?: string;
}

const CopyToClipboard = ({ extraStyle }: ICopyToClipboardProps) => {
  const hotkey = getHotkeyById("copyToClipboard");

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={() =>
            generateImage({
              action: "clipboard",
            })
          }
          className={cn("px-2", extraStyle)}
          size="icon"
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
