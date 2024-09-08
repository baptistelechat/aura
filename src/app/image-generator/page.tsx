"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toPng } from "html-to-image";
import { Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ImageGenerator = () => {
  const [text, setText] = useState("Your Text Here");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePreviewSize = () => {
    if (containerRef.current && previewRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      const imageAspectRatio = width / height;
      const containerAspectRatio = containerWidth / containerHeight;

      let previewWidth, previewHeight;

      if (containerAspectRatio > imageAspectRatio) {
        previewHeight = containerHeight;
        previewWidth = previewHeight * imageAspectRatio;
      } else {
        previewWidth = containerWidth;
        previewHeight = previewWidth / imageAspectRatio;
      }

      previewRef.current.style.width = `${previewWidth}px`;
      previewRef.current.style.height = `${previewHeight}px`;
    }
  };

  useEffect(() => {
    updatePreviewSize();
    window.addEventListener("resize", updatePreviewSize);
    return () => window.removeEventListener("resize", updatePreviewSize);
  }, [width, height]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateImage = async () => {
    if (previewRef.current) {
      try {
        const dataUrl = await toPng(previewRef.current, {
          canvasWidth: width,
          canvasHeight: height,
        });

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "social-image.png";
        link.click();
      } catch (error) {
        console.error("Erreur lors de la génération de l'image:", error);
      }
    }
  };

  return (
    <div className="flex flex-col h-full p-8">
      <div className="flex-shrink-0">
        <h1 className="text-2xl font-bold mb-4 text-center">
          🎨 Image Generator
        </h1>
        <div className="flex w-full items-center justify-center space-x-2">
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="max-w-xs"
            placeholder="Enter your text"
          />
          <Input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-12"
          />
          <Select
            value={`${width}x${height}`}
            onValueChange={(value) => {
              const [newWidth, newHeight] = value.split("x").map(Number);
              setWidth(newWidth);
              setHeight(newHeight);
            }}
          >
            <SelectTrigger className="w-[275px]">
              <SelectValue placeholder="Select a size" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1920x1080">1920x1080 (16:9)</SelectItem>
                <SelectItem value="1080x1080">1080x1080 (1:1)</SelectItem>
                <SelectItem value="1080x1920">1080x1920 (9:16)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-72"
          />
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex-grow overflow-hidden flex items-center justify-center p-4 my-4"
      >
        <div
          ref={previewRef}
          style={{
            backgroundColor: bgColor,
            transition: "all 0.3s ease",
            position: "relative",
          }}
          className="relative border border-red-500 overflow-hidden flex items-center justify-center"
        >
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          )}
          {!selectedImage && (
            <span
              className="text-black font-bold text-center break-words p-4"
              style={{
                fontSize: `${Math.max(16, Math.min(width, height) / 20)}px`,
                maxWidth: "100%",
              }}
            >
              {text}
            </span>
          )}
          {/* Ajout des repères visuels pour tester le rendu */}
          <div className="absolute top-0 left-0 p-2 text-xs text-red-500">
            Top Left
          </div>
          <div className="absolute top-0 right-0 p-2 text-xs text-red-500">
            Top Right
          </div>
          <div className="absolute bottom-0 left-0 p-2 text-xs text-red-500">
            Bottom Left
          </div>
          <div className="absolute bottom-0 right-0 p-2 text-xs text-red-500">
            Bottom Right
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <Button onClick={generateImage} className="w-fit">
          <Download className="mr-2 h-4 w-4" />
          Download Image
        </Button>
      </div>
    </div>
  );
};

export default ImageGenerator;
