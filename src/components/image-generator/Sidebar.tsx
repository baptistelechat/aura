import DownloadButton from "@/components/image-generator/DownloadButton";
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
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import { Accordion } from "../ui/accordion";
import { Input } from "../ui/input";
import CustomColor from "./section/background/CustomColor";
import TailwindColor from "./section/background/TailwindColor/TailwindColor";
import ImageBorder from "./section/image/ImageBorder";
import ImageShadow from "./section/image/ImageShadow";
import ImageSize from "./section/image/ImageSize";
import ImageVisibility from "./section/image/ImageVisibility";
import TransparentButton from "./section/background/TransparentButton";

interface ISidebarProps {
  generateImage: () => void;
}

const Sidebar = ({ generateImage }: ISidebarProps) => {
  const text = useImageGeneratorStore((s) => s.settings.text);
  const width = useImageGeneratorStore((s) => s.settings.dimension.width);
  const height = useImageGeneratorStore((s) => s.settings.dimension.height);
  const imageVisibility = useImageGeneratorStore(
    (s) => s.settings.image.visibility
  );

  const setText = useImageGeneratorStore((s) => s.setText);
  const setDimensions = useImageGeneratorStore((s) => s.setDimensions);
  const setImageSrc = useImageGeneratorStore((s) => s.setImageSrc);
  const setImageVisibility = useImageGeneratorStore(
    (s) => s.setImageVisibility
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      if (!imageVisibility) {
        setImageVisibility(true);
      }
    }
  };

  return (
    <div className="flex h-full w-96 flex-col gap-4">
      <Tabs defaultValue="image" className="flex grow flex-col">
        <TabsList className="mb-4 grid w-full grid-cols-2">
          <TabsTrigger value="image">Image</TabsTrigger>
          <TabsTrigger value="background">Background</TabsTrigger>
        </TabsList>
        <TabsContent value="image" className="flex flex-col">
          <ScrollArea className="max-h-[calc(100vh-375px)] grow">
            <Accordion type="multiple">
              <div className="flex flex-col gap-4 pr-4">
                <ImageBorder />
                <ImageShadow />
                <ImageSize />
                <ImageVisibility />
                <Input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter your text"
                />
              </div>
            </Accordion>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="background" className="flex flex-col">
          <ScrollArea className="max-h-[calc(100vh-375px)] grow">
            <Accordion type="single" collapsible>
              <div className="flex flex-col gap-4 pr-4">
                <CustomColor />
                <TailwindColor />
               <TransparentButton/>
              </div>
            </Accordion>
          </ScrollArea>
        </TabsContent>
      </Tabs>
      <div className="space-y-2">
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            handleImageChange(e);
          }}
          className="w-full"
        />
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
        <DownloadButton generateImage={generateImage} />
      </div>
    </div>
  );
};

export default Sidebar;
