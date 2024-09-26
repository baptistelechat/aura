import { Button } from "@/components/ui/button";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import { cn } from "@/lib/utils";
import generateImage from "@/lib/utils/image-generator/generateImage";
import { Download } from "lucide-react";

interface IDownloadButtonProps {
  extraStyle?: string;
}

const DownloadButton = ({ extraStyle }: IDownloadButtonProps) => {
  return (
    <div className="flex w-full gap-2">
      <Button
        onClick={() =>
          generateImage({
            imageGeneratorStore: useImageGeneratorStore.getState(),
          })
        }
        className={cn("w-full", extraStyle)}
      >
        <Download className="mr-2 size-4" />
        Download Image
      </Button>
      
    </div>
  );
};

export default DownloadButton;
