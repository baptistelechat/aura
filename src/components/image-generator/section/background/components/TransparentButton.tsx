import { Button } from "@/components/ui/button";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import { Eraser } from "lucide-react";

const TransparentButton = () => {
  const setBackgroundColor = useImageGeneratorStore(
    (s) => s.setBackgroundColor
  );
  const setTailwindColor = useImageGeneratorStore((s) => s.setTailwindColor);
  const setBackgroundMode = useImageGeneratorStore((s) => s.setBackgroundMode);
  const setUseVia = useImageGeneratorStore((s) => s.setUseVia);
  const resetBackground = useImageGeneratorStore((s) => s.resetBackground);

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={() => {
        resetBackground();
        setBackgroundMode("solid");
        setBackgroundColor("Transparent");
        setTailwindColor("");
        setUseVia(false);
      }}
    >
      <Eraser className="mr-2 size-5" />
      Transparent
    </Button>
  );
};

export default TransparentButton;
