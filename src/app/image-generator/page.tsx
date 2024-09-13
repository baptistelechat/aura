"use client";
import Preview from "@/components/image-generator/Preview";
import Sidebar from "@/components/image-generator/Sidebar";
import generateImage from "@/lib/image-generator/generateImage";
import updatePreviewSize from "@/lib/image-generator/updatePreviewSize";
import IUpdatePreview from "@/lib/interface/IUpdatePreview";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import { useEffect, useRef } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DownloadButton from "@/lib/image-generator/DownloadButton";

const ImageGenerator = () => {
  const width = useImageGeneratorStore((s) => s.settings.dimension.width);
  const height = useImageGeneratorStore((s) => s.settings.dimension.height);
  const imageGeneratorStore = useImageGeneratorStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const updatePreviewObject: IUpdatePreview = {
    containerRef,
    previewRef,
    imageRef,
    imageGeneratorStore,
  };

  useEffect(() => {
    updatePreviewSize(updatePreviewObject);
    window.addEventListener("resize", () =>
      updatePreviewSize(updatePreviewObject)
    );
    return () =>
      window.removeEventListener("resize", () =>
        updatePreviewSize(updatePreviewObject)
      );
  }, [width, height]);

  return (
    <div className="flex gap-8 size-full p-8">
      <div className="hidden w-full gap-4 md:flex">
        <Sidebar generateImage={() => generateImage(updatePreviewObject)} />
        <Preview
          containerRef={containerRef}
          previewRef={previewRef}
          imageRef={imageRef}
        />
      </div>
      <Tabs
        defaultValue="settings"
        className="h-full flex flex-col w-full md:hidden"
      >
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger
            value="preview"
            onClick={() => updatePreviewSize(updatePreviewObject)}
          >
            Preview
          </TabsTrigger>
        </TabsList>
        <TabsContent value="settings" className="h-full">
          <Sidebar generateImage={() => generateImage(updatePreviewObject)} />
        </TabsContent>
        <TabsContent value="preview" className="h-full relative">
          <DownloadButton
            generateImage={() => generateImage(updatePreviewObject)}
          />
          <Preview
            containerRef={containerRef}
            previewRef={previewRef}
            imageRef={imageRef}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImageGenerator;
