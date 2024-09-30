import { toast } from "sonner";
import { useImageGeneratorStore } from "../store/imageGenerator.store";
import { Hotkey } from "../types/Hotkey";
import { generateImage } from "../utils/image-generator/generateImage";

const setTab = useImageGeneratorStore.getState().setTab;
const setImageSrc = useImageGeneratorStore.getState().setImageSrc;
const setImageVisibility = useImageGeneratorStore.getState().setImageVisibility;

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

const pasteImage = async () => {
  try {
    const clipboardItems = await navigator.clipboard.read();
    for (const clipboardItem of clipboardItems) {
      for (const type of clipboardItem.types) {
        if (type.startsWith("image/")) {
          const blobArray = await clipboardItem.getType(type);
          const file = new File([blobArray], "pasted-image.png", { type });
          const reader = new FileReader();

          reader.onload = (e) => {
            setImageSrc(e.target?.result as string);
            setImageVisibility(true);
          };

          reader.readAsDataURL(file);
        }
      }
    }
  } catch (error) {
    console.error("Error pasting image: ", error);
    toast.error("Failed to paste image from clipboard.");
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
  {
    id: "pasteImage",
    name: "Paste Image from Clipboard",
    description: "Paste an image directly from your clipboard.",
    key: {
      default: "ctrl+v",
      mac: "meta+v",
    },
    action: () => pasteImage(),
  },
];
