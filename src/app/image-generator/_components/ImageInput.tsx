"use client";
import Shortcut from "@/components/keyboard/Shortcut";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { getHotkeyById } from "@/lib/utils/hotkey/getHotkeyById";
import ColorThief from "colorthief";
import { ColorTranslator } from "colortranslator";
import { useEffect } from "react";

const ImageInput = () => {
  const imageSrc = useImageGeneratorStore((s) => s.settings.image.src);
  const imageRef = useImageGeneratorStore((s) => s.refs.imageRef);
  const setImageSrc = useImageGeneratorStore((s) => s.setImageSrc);
  const setImageVisibility = useImageGeneratorStore(
    (s) => s.setImageVisibility
  );
  const setMagicColor = useImageGeneratorStore((s) => s.setMagicColor);

  const loadImageHotkey = getHotkeyById("loadImage");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setImageVisibility(true);
    }
  };

  useEffect(() => {
    if (imageRef && imageRef.current) {
      const imgElement = imageRef.current;
      const colorThief = new ColorThief();

      // Add an event listener for the 'load' event
      imgElement.onload = () => {
        const rgbPalette = colorThief.getPalette(imgElement, 11);
        const hexPalette = rgbPalette.map((color) =>
          ColorTranslator.toHEX({
            R: color[0],
            G: color[1],
            B: color[2],
          })
        );
        setMagicColor(hexPalette);
      };

      // If the image is already fully loaded (e.g., from cache)
      if (imgElement.complete) {
        const rgbPalette = colorThief.getPalette(imgElement, 11);
        const hexPalette = rgbPalette.map((color) =>
          ColorTranslator.toHEX({
            R: color[0],
            G: color[1],
            B: color[2],
          })
        );
        setMagicColor(hexPalette);
      }
    }
  }, [imageSrc]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Input
          id="imageUploadInput"
          type="file"
          accept="image/*"
          onChange={(e) => {
            handleImageChange(e);
          }}
          className="w-full hover:cursor-pointer"
        />
      </TooltipTrigger>
      <TooltipContent className="mb-2">
        <div className="flex flex-col items-center gap-2 font-normal">
          <p>{loadImageHotkey.name}</p>
          <Shortcut hotkey={loadImageHotkey.key} />
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default ImageInput;
