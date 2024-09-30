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
    category: "save",
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
    category: "general",
    key: {
      default: "ctrl+k",
      mac: "meta+k",
    },
    action: () => openHotkeyHelper(),
  },
  {
    id: "downloadImage",
    name: "Download Image",
    description: "Download the generated image to your local machine.",
    category: "save",
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
    category:"image",
    key: {
      default: "ctrl+1",
      mac: "meta+1",
    },
    action: () => setTab("image"),
    order:1
  },
  {
    id: "switchToBackgroundTab",
    name: "Switch to Background Tab",
    description: "Navigate to the background settings tab",
    category:"background",
    key: {
      default: "ctrl+2",
      mac: "meta+2",
    },
    action: () => setTab("background"),
  },
  {
    id: "loadImage",
    name: "Load Image",
    description: "Select and import an image file from your local device",
    category:"image",
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
    category:"image",
    key: {
      default: "ctrl+v",
      mac: "meta+v",
    },
    action: () => pasteImage(),
  },
];
