import { Hotkey } from "../types/Hotkey";
import generateImage from "../utils/image-generator/generateImage";

const openHotkeyHelper = () => {
  const hotkeyHelperButton = document.getElementById("hotkeyHelperButton");
  if (hotkeyHelperButton) {
    hotkeyHelperButton.click();
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
      default: "ctrl+h",
      mac: "meta+h",
    },
    action: () => openHotkeyHelper(),
  },
];
