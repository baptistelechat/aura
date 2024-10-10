import { toast } from "sonner";
import { useImageGeneratorStore } from "../store/imageGenerator.store";
import { Hotkey } from "../types/Hotkey";
import { loadImage } from "../utils/hotkey/action/loadImage";
import { openHotkeyHelper } from "../utils/hotkey/action/openHotkeyHelper";
import { pasteImage } from "../utils/hotkey/action/pasteImage";
import { generateImage } from "../utils/image-generator/generateImage";

const setTab = useImageGeneratorStore.getState().setTab;

export const hotkeys: Hotkey[] = [
  {
    id: "copyToClipboard",
    name: "Copy image to Clipboard",
    description:
      "Copy the generated image directly to your clipboard for easy pasting.",
    category: ["save"],
    key: {
      default: "ctrl+c",
      mac: "meta+c",
    },
    action: () => generateImage({ action: "clipboard" }),
  },
  {
    id: "openHotkeyHelper",
    name: "Open Hotkey Helper",
    description:
      "Access the list of available hotkeys to boost your productivity.",
    category: ["general"],
    key: {
      default: "ctrl+k",
      mac: "meta+k",
    },
    action: () => openHotkeyHelper(),
    order: 1,
  },
  {
    id: "loadImage",
    name: "Load Image",
    description: "Select and import an image file from your local device",
    category: ["general"],
    key: {
      default: "ctrl+o",
      mac: "meta+o",
    },
    action: () => loadImage(),
  },
  {
    id: "pasteImage",
    name: "Paste Image from Clipboard",
    description: "Paste an image directly from your clipboard.",
    category: ["general"],
    key: {
      default: "ctrl+v",
      mac: "meta+v",
    },
    action: () => pasteImage(),
  },
  {
    id: "downloadImage",
    name: "Download Image",
    description: "Download the generated image to your local machine.",
    category: ["save"],
    key: {
      default: "ctrl+s",
      mac: "meta+s",
    },
    action: () => generateImage({ action: "download" }),
  },
  {
    id: "switchToImageTab",
    name: "Switch to Image Tab",
    description: "Navigate to the image settings tab",
    category: ["navigation", "image"],
    key: {
      default: "ctrl+1",
      mac: "meta+1",
    },
    action: () => setTab("image"),
    order: 1,
  },
  {
    id: "switchToBackgroundTab",
    name: "Switch to Background Tab",
    description: "Navigate to the background settings tab",
    category: ["navigation", "background"],
    key: {
      default: "ctrl+2",
      mac: "meta+2",
    },
    action: () => setTab("background"),
    order: 2,
  },
  {
    id: "switchToBackgroundEffectsTab",
    name: "Switch to Background Effects Tab",
    description: "Navigate to the background effects settings tab",
    category: ["navigation", "background-effects"],
    key: {
      default: "ctrl+3",
      mac: "meta+3",
    },
    action: () => setTab("background-effects"),
    order: 3,
  },
  {
    id: "switchToOverlaysTab",
    name: "Switch to Overlays Tab",
    description: "Navigate to the overlays settings tab",
    category: ["navigation", "overlays"],
    key: {
      default: "ctrl+4",
      mac: "meta+4",
    },
    action: () => setTab("overlays"),
    order: 4,
  },
  {
    id: "switchToAnnotationsTab",
    name: "Switch to Annotations Tab",
    description: "Navigate to the annotations settings tab",
    category: ["navigation", "annotations"],
    key: {
      default: "ctrl+5",
      mac: "meta+5",
    },
    // action: () => setTab("annotations"),
    action: () => toast.info("Annotations tab currently in development"),
    order: 5,
  },
  {
    id: "switchToWatermarksTab",
    name: "Switch to Watermarks Tab",
    description: "Navigate to the watermarks settings tab",
    category: ["navigation", "watermarks"],
    key: {
      default: "ctrl+6",
      mac: "meta+6",
    },
    action: () => setTab("watermarks"),
    order: 6,
  },
  {
    id: "switchToVisibilityTab",
    name: "Switch to Visibility Tab",
    description: "Navigate to the visibility settings tab",
    category: ["navigation", "visibility"],
    key: {
      default: "ctrl+7",
      mac: "meta+7",
    },
    action: () => setTab("visibility"),
    order: 7,
  },
];
