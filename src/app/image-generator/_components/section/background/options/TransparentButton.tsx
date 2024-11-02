import { Button } from "@/components/ui/button";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { Eraser } from "lucide-react";

const TransparentButton = () => {
  const gradient = useImageGeneratorStore(
    (s) => s.settings.background.gradient
  );

  const setBackground = useImageGeneratorStore(
    (s) => s.setBackground
  );
  const setDimensions = useImageGeneratorStore((s) => s.setDimensions);

  const resetBackground = useImageGeneratorStore((s) => s.resetBackground);

  const handleClick = () => {
    resetBackground();
    setDimensions({ format: "png" });
    setBackground({
      backgroundMode: "solid",
      backgroundColor: "",
      tailwindColor: "",
      gradient: {
        ...gradient,
        useVia: false,
      },
    })
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
