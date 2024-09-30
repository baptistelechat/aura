import { useImageGeneratorStore } from "../store/imageGenerator.store";
import { Hotkey } from "../types/Hotkey";
import { generateImage } from "../utils/image-generator/generateImage";

const setTab = useImageGeneratorStore.getState().setTab;

const openHotkeyHelper = () => {
  const hotkeyHelperButton = document.getElementById("hotkeyHelperButton");
  if (hotkeyHelperButton) {
    hotkeyHelperButton.click();
  }
};

const loadImage = () => {
  const loadImageInput = document.getElementById(
    "imageUploadInput"
  ) as HTMLInputElement;
  if (loadImageInput) {
    loadImageInput.click();
  }
};

export const hotkeys: Hotkey[] = [
  {
    id: "copyToClipboard",
    name: "Copy image to Clipboard",
    description:
      "Copy the generated image directly to your clipboard for easy pasting.",
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
    key: {
      default: "ctrl+1",
      mac: "meta+1",
    },
    action: () => setTab("image"),
  },
  {
    id: "switchToBackgroundTab",
    name: "Switch to Background Tab",
    description: "Navigate to the background settings tab",
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
    key: {
      default: "ctrl+o",
      mac: "meta+o",
    },
    action: () => loadImage(),
  },
];
