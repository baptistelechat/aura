import { Button } from "@/components/ui/button";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { Eraser } from "lucide-react";

interface ITransparentButtonProps {
  variant: "background" | "watermark";
}

const TransparentButton = ({ variant }: ITransparentButtonProps) => {
  const setWatermarkBackground = useImageGeneratorStore(
    (s) => s.setWatermarkBackground
  );
  const setBackgroundColor = useImageGeneratorStore(
    (s) => s.setBackgroundColor
  );
  const setTailwindColor = useImageGeneratorStore((s) => s.setTailwindColor);
  const setBackgroundMode = useImageGeneratorStore((s) => s.setBackgroundMode);
  const setUseVia = useImageGeneratorStore((s) => s.setUseVia);
  const resetBackground = useImageGeneratorStore((s) => s.resetBackground);

  const handleClick = () => {
    if (variant === "background") {
      resetBackground();
      setBackgroundMode("solid");
      setBackgroundColor("");
      setTailwindColor("");
      setUseVia(false);
    } else if (variant === "watermark") {
      setWatermarkBackground("transparent");
    }
  };

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={() => handleClick()}
      className="mx-1 w-full"
    >
      <Eraser className="mr-2 size-4" />
      Transparent background
    </Button>
  );
};

export default TransparentButton;
