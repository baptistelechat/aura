import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface IDownloadButtonProps {
  generateImage: () => void;
  extraStyle?:string
}

const DownloadButton = ({ generateImage, extraStyle }: IDownloadButtonProps) => {
  return (
    <Button onClick={generateImage} className={`${extraStyle} w-full`}>
      <Download className="mr-2 h-4 w-4" />
      Download Image
    </Button>
  );
};

export default DownloadButton;
