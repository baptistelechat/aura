import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { getHotkeyByName } from "@/lib/utils/hotkey/getHotkeyByName";
import generateImage from "@/lib/utils/image-generator/generateImage";
import { ClipboardCopy } from "lucide-react";
import Hotkey from "../keyboard/Hotkey";

interface ICopyToClipboardProps {
  extraStyle?: string;
}

const CopyToClipboard = ({ extraStyle }: ICopyToClipboardProps) => {
  const hotkeyString = getHotkeyByName("copyToClipboard");

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
          <p>Copy image to clipboard</p>
          <Hotkey hotkey={hotkeyString} />
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default CopyToClipboard;
