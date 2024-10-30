import { Button } from "@/components/ui/button";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { Eraser } from "lucide-react";

const TransparentButton = () => {
  const setBackgroundColor = useImageGeneratorStore(
    (s) => s.setBackgroundColor
  );
  const setTailwindColor = useImageGeneratorStore((s) => s.setTailwindColor);
  const setBackgroundMode = useImageGeneratorStore((s) => s.setBackgroundMode);
  const setUseVia = useImageGeneratorStore((s) => s.setUseVia);
  const setDimensions = useImageGeneratorStore((s) => s.setDimensions);

  const resetBackground = useImageGeneratorStore((s) => s.resetBackground);

  const handleClick = () => {
    resetBackground();
    setBackgroundMode("solid");
    setBackgroundColor("");
    setTailwindColor("");
    setUseVia(false);
    setDimensions({ format: "png" });
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
