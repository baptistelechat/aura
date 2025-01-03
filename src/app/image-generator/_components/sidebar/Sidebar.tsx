/* eslint-disable jsx-a11y/alt-text */
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tabOptions } from "@/lib/constant/tabOptions";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { TabNames } from "@/lib/types/TabNames";
import { SidebarVariants } from "@/lib/utils/framer-motion/variants";
import { getHotkeyById } from "@/lib/utils/hotkey/getHotkeyById";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import BackgroundColor from "../section/background-color/BackgroundColor";
import BackgroundEffects from "../section/background-effects/BackgroundEffects";
import Image from "../section/image/Image";
import Overlays from "../section/overlays/Overlays";
import Visibility from "../section/Visibility";
import Watermarks from "../section/watermarks/Watermarks";
import CopyToClipboard from "./components/CopyToClipboard";
import DimensionSelect from "./components/DimensionSelect";
import DownloadButton from "./components/DownloadButton";
import FormatSelect from "./components/FormatSelect";
import ImageInput from "./components/ImageInput";
import BackgroundImage from "../section/background-image/BackgroundImage";

const Sidebar = () => {
  const tab = useImageGeneratorStore((s) => s.general.tab);
  const preview = useImageGeneratorStore((s) => s.previewRefs.previewRef);

  const hotkeySet = useImageGeneratorStore((s) => s.general.hotkeySet);
  const setTab = useImageGeneratorStore((s) => s.setTab);

  const hotkey = getHotkeyById(
    `switchTo${
      tab.charAt(0).toUpperCase() +
      tab.slice(1).replace("-e", "E").replace("-i", "I").replace("-c", "C")
    }Tab`
  );

  const handleTabChange = (value: TabNames) => {
    setTab(value);
    preview?.current?.click();
  };

  return (
    <motion.div
      className="flex h-full flex-col gap-2"
      style={{
        width: "26rem",
      }}
      variants={SidebarVariants}
      initial="hidden"
      animate="visible"
    >
      <Select
        value={tab}
        onValueChange={(value) => handleTabChange(value as TabNames)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a size" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {tabOptions.map((tab) => (
              <SelectItem
                key={tab.name}
                value={tab.name}
                disabled={tab.disabled}
              >
                <div className="flex items-center gap-2">
                  {tab.icon}
                  {tab.name.charAt(0).toUpperCase() +
                    tab.name.slice(1).replace("-", " ")}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {tab === "image" && <Image />}
      {tab === "background-color" && <BackgroundColor />}
      {tab === "background-image" && <BackgroundImage />}
      {tab === "background-effects" && <BackgroundEffects />}
      {tab === "overlays" && <Overlays />}
      {/* { tab === "annotations" && <Annotations /> } */}
      {tab === "watermarks" && <Watermarks />}
      {tab === "visibility" && <Visibility />}

      <p className="mb-1 flex w-full items-center gap-1 text-left text-sm italic text-muted-foreground/80">
        <Lightbulb className="size-4" />
        {hotkey.name} :{" "}
        {hotkeySet === "mac"
          ? hotkey.key.replace("meta", "⌘").replace("alt", "⌥").toUpperCase()
          : hotkey.key.toUpperCase()}
      </p>

      <div className="space-y-2">
        <ImageInput />
        <DimensionSelect />
        <div className="flex w-full items-center gap-2">
          <DownloadButton />
          <CopyToClipboard />
          <FormatSelect />
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
