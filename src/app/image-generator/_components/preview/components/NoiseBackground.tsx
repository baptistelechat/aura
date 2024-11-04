import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { useEffect, useRef } from "react";

const generateNoise = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");
  const { width, height } = canvas;
  const imageData = ctx!.createImageData(width, height);

  for (let i = 0; i < imageData.data.length; i += 4) {
    const value = Math.random() * 255;
    imageData.data[i] = value;
    imageData.data[i + 1] = value;
    imageData.data[i + 2] = value;
    imageData.data[i + 3] = 100;
  }

  ctx!.putImageData(imageData, 0, 0);
};

const NoiseBackground = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const noise = useImageGeneratorStore((s) => s.settings.background.noise);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const dimensions = useImageGeneratorStore((s) => s.settings.dimension);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && isDesktop) {
      console.log([canvas.offsetWidth, canvas.offsetHeight]);
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      generateNoise(canvas);
    }
  }, [isDesktop]); 

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 size-full"
      style={{ opacity: noise }}
    />
  );
};

export default NoiseBackground;
