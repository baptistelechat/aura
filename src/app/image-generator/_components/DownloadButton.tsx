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
import { Download } from "lucide-react";
import Shortcut from "../../../components/keyboard/Shortcut";

interface IDownloadButtonProps {
  extraStyle?: string;
}

const DownloadButton = ({ extraStyle }: IDownloadButtonProps) => {
  const isDownloading = useImageGeneratorStore((s) => s.general.isDownloading);
  const hotkey = getHotkeyById("downloadImage");

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          disabled={isDownloading}
          className={cn("w-full", extraStyle)}
          onClick={() => generateImage({ action: "download", method: "button" })}
        >
          <Download className="mr-2 size-4" />
          Download Image
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

export default DownloadButton;
