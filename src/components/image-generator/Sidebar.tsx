import useImageGeneratorStore from "@/lib/store/imageGenerator.store";
import { Download } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Border from "./section/Border";
import Shadow from "./section/Shadow";

interface ISidebarProps {
  generateImage: () => void;
}

const Sidebar = ({ generateImage }: ISidebarProps) => {
  const settings = useImageGeneratorStore((s) => s.settings);
  const setText = useImageGeneratorStore((s) => s.setText);
  const setBgColor = useImageGeneratorStore((s) => s.setBgColor);
  const setDimensions = useImageGeneratorStore((s) => s.setDimensions);
  const setImageSrc = useImageGeneratorStore((s) => s.setImageSrc);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col w-72 space-y-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        🎨 Image Generator
      </h1>
      <Border />
      <Shadow />
      <Input
        type="text"
        value={settings.text}
        onChange={(e) => setText(e.target.value)}
        className="max-w-xs"
        placeholder="Enter your text"
      />
      <Input
        type="color"
        value={settings.bgColor}
        onChange={(e) => setBgColor(e.target.value)}
        className="w-full"
      />
      <Select
        value={`${settings.dimension.width}x${settings.dimension.height}`}
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
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => {
          handleImageChange(e);
        }}
        className="w-full"
      />
      <Button onClick={generateImage} className="w-full">
        <Download className="mr-2 h-4 w-4" />
        Download Image
      </Button>
    </div>
  );
};

export default Sidebar;
