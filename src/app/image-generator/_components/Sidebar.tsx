import DownloadButton from "@/app/image-generator/_components/DownloadButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { getHotkeyById } from "@/lib/utils/hotkey/getHotkeyById";
import Shortcut from "../../../components/keyboard/Shortcut";
import { Accordion } from "../../../components/ui/accordion";
import { Input } from "../../../components/ui/input";
import CopyToClipboard from "./CopyToClipboard";
import CustomColor from "./section/background/customColor/CustomColor";
import TailwindColor from "./section/background/tailwindColor/TailwindColor";
import TransparentButton from "./section/background/TransparentButton";
import ImageBorder from "./section/image/ImageBorder";
import ImageShadow from "./section/image/ImageShadow";
import ImageSize from "./section/image/ImageSize";
import ImageVisibility from "./section/image/ImageVisibility";

const Sidebar = () => {
  const tab = useImageGeneratorStore((s) => s.general.tab);
  const text = useImageGeneratorStore((s) => s.settings.text);
  const width = useImageGeneratorStore((s) => s.settings.dimension.width);
  const height = useImageGeneratorStore((s) => s.settings.dimension.height);

  const setTab = useImageGeneratorStore((s) => s.setTab);
  const setText = useImageGeneratorStore((s) => s.setText);
  const setDimensions = useImageGeneratorStore((s) => s.setDimensions);
  const setImageSrc = useImageGeneratorStore((s) => s.setImageSrc);
  const setImageVisibility = useImageGeneratorStore(
    (s) => s.setImageVisibility
  );

  const imageHotkey = getHotkeyById("switchToImageTab");
  const backgroundHotkey = getHotkeyById("switchToBackgroundTab");
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

  return (
    <div className="flex h-full w-96 flex-col gap-4">
      <Tabs
        value={tab}
        onValueChange={(value) => setTab(value as "image" | "background")}
        className="flex grow flex-col"
      >
        <TabsList className="mb-4 grid w-full grid-cols-2">
          <TabsTrigger value="image">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="size-full">Image</div>
              </TooltipTrigger>
              <TooltipContent className="mb-2">
                <div className="flex flex-col items-center gap-2 font-normal">
                  <p>{imageHotkey.name}</p>
                  <Shortcut hotkey={imageHotkey.key} />
                </div>
              </TooltipContent>
            </Tooltip>
          </TabsTrigger>
          <TabsTrigger value="background">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="size-full">Background</div>
              </TooltipTrigger>
              <TooltipContent className="mb-2">
                <div className="flex flex-col items-center gap-2 font-normal">
                  <p>{backgroundHotkey.name}</p>
                  <Shortcut hotkey={backgroundHotkey.key} />
                </div>
              </TooltipContent>
            </Tooltip>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="image" className="flex flex-col">
          <ScrollArea className="max-h-[calc(100vh-375px)] grow">
            <Accordion type="multiple">
              <ImageBorder />
              <ImageShadow />
              <ImageSize />
              <ImageVisibility />
              <Input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text"
                className="mx-1"
              />
            </Accordion>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="background" className="flex flex-col">
          <ScrollArea className="max-h-[calc(100vh-375px)] grow">
            <Accordion type="single" collapsible>
                <CustomColor />
                <TailwindColor />
                <TransparentButton />
            </Accordion>
          </ScrollArea>
        </TabsContent>
      </Tabs>
      <div className="space-y-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Input
              id="imageUploadInput"
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleImageChange(e);
              }}
              className="w-full"
            />
          </TooltipTrigger>
          <TooltipContent className="mb-2">
            <div className="flex flex-col items-center gap-2 font-normal">
              <p>{loadImageHotkey.name}</p>
              <Shortcut hotkey={loadImageHotkey.key} />
            </div>
          </TooltipContent>
        </Tooltip>
        <Select
          value={`${width}x${height}`}
          onValueChange={(value) => {
            const [width, height] = value.split("x").map(Number);
            setDimensions({ width, height });
          }}
        >
          <SelectTrigger className="w-full">
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
        <div className="flex w-full items-center gap-2">
          <DownloadButton />
          <CopyToClipboard />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
