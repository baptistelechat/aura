"use client";
import FreeImageBank from "@/components/image-generator/freeImageBank/FreeImageBank";
import Shortcut from "@/components/keyboard/Shortcut";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { defaultColor } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { loadImage } from "@/lib/utils/hotkey/action/loadImage";
import { getHotkeyById } from "@/lib/utils/hotkey/getHotkeyById";
import { uploadImage } from "@/lib/utils/image-generator/uploadImage";
import ColorThief from "colorthief";
import { ColorTranslator } from "colortranslator";
import { ImagePlus } from "lucide-react";
import { useEffect } from "react";

const ImageInput = () => {
  const imageSrc = useImageGeneratorStore((s) => s.settings.image.src);
  const imageRef = useImageGeneratorStore((s) => s.previewRefs.imageRef);

  const setBackground = useImageGeneratorStore((s) => s.setBackground);

  const loadImageHotkey = getHotkeyById("loadImage");

  useEffect(() => {
    if (imageRef && imageRef.current) {
      const imgElement = imageRef.current;
      const colorThief = new ColorThief();

      // Add an event listener for the 'load' event
      imgElement.onload = () => {
        const rgbPalette = colorThief.getPalette(imgElement, 11);
        const hexPalette = rgbPalette.map((color) => {
          try {
            return ColorTranslator.toHEX({
              R: color[0],
              G: color[1],
              B: color[2],
            });
          } catch (error: any) {
            return defaultColor;
          }
        });
        setBackground({ magicColor: hexPalette });
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
        setBackground({ magicColor: hexPalette });
      }
    }
  }, [imageSrc]);

  return (
    <div className="flex w-full gap-2">
      <input
        id="imageUploadInput"
        type="file"
        accept="image/*"
        onChange={(e) => {
          uploadImage(e.target.files?.[0], "image");
        }}
        className="hidden"
      />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"outline"}
            className="flex w-1/3 items-center justify-center gap-1"
            onClick={loadImage}
          >
            <ImagePlus className="size-4" />
            Local
          </Button>
        </TooltipTrigger>
        <TooltipContent className="mb-2">
          <div className="flex flex-col items-center gap-2 font-normal">
            <p>{loadImageHotkey.name}</p>
            <Shortcut hotkey={loadImageHotkey.key} />
          </div>
        </TooltipContent>
      </Tooltip>
      <FreeImageBank mode="image" />
    </div>
  );
};

export default ImageInput;
