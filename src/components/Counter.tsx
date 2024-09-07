import useCounterStore from "@/lib/store/counter.store";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";

const Counter = () => {
  const counter = useCounterStore((s) => s.counter);
  const setCounter = useCounterStore((s) => s.setCounter);
  const resetCounter = useCounterStore((s) => s.resetCounter);

  const handleAdd = () => {
    setCounter(counter + 1);
  };

  const handleRemove = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  return (
    <div className="flex gap-4">
      <Button
        variant="outline"
        size="icon"
        className={`${
          counter > 0 ? "" : "cursor-not-allowed text-zinc-500"
        }`}
        onClick={handleRemove}
      >
        <Minus className="size-6" />
      </Button>
      <p className="flex w-2 items-center justify-center text-2xl font-semibold">
        {counter}
      </p>
      <Button
        variant="outline"
        size="icon"
        onClick={handleAdd}
      >
        <Plus className="size-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className={`${
          counter > 0 ? "" : "cursor-not-allowed text-zinc-500"
        }`}
        onClick={resetCounter}
      >
        <RotateCcw className="size-6" />
      </Button>
    </div>
  );
};

export default Counter;
