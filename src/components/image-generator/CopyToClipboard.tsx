import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import { cn } from "@/lib/utils";
import generateImage from "@/lib/utils/image-generator/generateImage";
import { ClipboardCopy } from "lucide-react";

interface ICopyToClipboardProps {
  extraStyle?: string;
}

const CopyToClipboard = ({ extraStyle }: ICopyToClipboardProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={() =>
            generateImage({
              imageGeneratorStore: useImageGeneratorStore.getState(),
              action: "clipboard",
            })
          }
          className={cn("px-2",extraStyle)}
          size="icon"
        >
          <ClipboardCopy className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Copy to clipboard</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default CopyToClipboard;
