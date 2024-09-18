import { Button } from "@/components/ui/button";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import {
  ArrowDown,
  ArrowDownLeft,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpLeft,
  ArrowUpRight,
  Shuffle,
} from "lucide-react";

const TailwindGradientOrientation = () => {
  const setOrientation = useImageGeneratorStore(
    (s) => s.setTailwindGradientOrientation
  );

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setOrientation(315)}
        >
          <ArrowDownRight className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setOrientation(0)}
        >
          <ArrowDown className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setOrientation(45)}
        >
          <ArrowDownLeft className="size-4" />
        </Button>
      </div>
      <div className="flex gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setOrientation(270)}
        >
          <ArrowRight className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setOrientation(0)}>      <Shuffle className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setOrientation(90)}
        >
          <ArrowLeft className="size-4" />
        </Button>
      </div>
      <div className="flex gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setOrientation(225)}
        >
          <ArrowUpRight className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setOrientation(180)}
        >
          <ArrowUp className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setOrientation(135)}
        >
          <ArrowUpLeft className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default TailwindGradientOrientation;
