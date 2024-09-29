import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import generateImage from "@/lib/utils/image-generator/generateImage";
import { Download } from "lucide-react";

interface IDownloadButtonProps {
  extraStyle?: string;
}

const DownloadButton = ({ extraStyle }: IDownloadButtonProps) => {
  return (
    <Button
      onClick={() => generateImage()}
      className={cn("w-full", extraStyle)}
    >
      <Download className="mr-2 size-4" />
      Download Image
    </Button>
  );
};

export default DownloadButton;
