import { Button } from "@/components/ui/button";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import { Eraser } from "lucide-react";

const TransparentButton = () => {
  const setBackgroundColor = useImageGeneratorStore(
    (s) => s.setBackgroundColor
  );
  const setTailwindColor = useImageGeneratorStore((s) => s.setTailwindColor);
  const setFrom = useImageGeneratorStore((s) => s.setTailwindGradientFrom);
  const setVia = useImageGeneratorStore((s) => s.setTailwindGradientVia);
  const setTo = useImageGeneratorStore((s) => s.setTailwindGradientTo);

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={() => {
        setBackgroundColor("");
        setTailwindColor("");
        setFrom({
          name: "",
          hex: "",
        });
        setVia({
          name: "",
          hex: "",
        });
        setTo({
          name: "",
          hex: "",
        });
      }}
    >
      <Eraser className="mr-2 size-5" />
      Transparent
    </Button>
  );
};

export default TransparentButton;
