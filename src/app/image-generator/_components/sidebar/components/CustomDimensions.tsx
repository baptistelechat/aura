"use client";
import { Input } from "@/components/ui/input";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { useCallback, useEffect, useState } from "react";

const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const CustomDimensions = () => {
  const dimensions = useImageGeneratorStore((s) => s.settings.dimension);
  const setDimensions = useImageGeneratorStore((s) => s.setDimensions);

  const [localWidth, setLocalWidth] = useState(dimensions.width);
  const [localHeight, setLocalHeight] = useState(dimensions.height);

  const debouncedSetDimensions = useCallback(
    debounce((newDimensions: { width?: number; height?: number }) => {
      setDimensions({
        category: "Custom",
        ...newDimensions,
      });
    }, 300),
    [setDimensions]
  );

  const handleWidthChange = (value: number) => {
    setLocalWidth(value);
    debouncedSetDimensions({ width: value });
  };

  const handleHeightChange = (value: number) => {
    setLocalHeight(value);
    debouncedSetDimensions({ height: value });
  };

  useEffect(() => {
    setLocalWidth(dimensions.width);
    setLocalHeight(dimensions.height);
  }, [dimensions]);

  return (
    <div className="flex items-center justify-center gap-2 pb-1">
      <Input
        type="number"
        value={localWidth}
        min={1}
        step={5}
        onChange={(e) =>
          handleWidthChange(
            Number(e.target.value) <= 0 ? 1 : Number(e.target.value)
          )
        }
        className="w-20"
      />
      x
      <Input
        type="number"
        value={localHeight}
        min={1}
        step={5}
        onChange={(e) =>
          handleHeightChange(
            Number(e.target.value) <= 0 ? 1 : Number(e.target.value)
          )
        }
        className="w-20"
      />
    </div>
  );
};

export default CustomDimensions;
