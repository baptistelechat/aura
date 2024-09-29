import { Hotkey } from "../types/Hotkey";
import generateImage from "../utils/image-generator/generateImage";

export const hotkeys: Hotkey[] = [
  {
    id:"copyToClipboard",
    name: "Copy to Clipboard",
    description: "Copy image to clipboard",
    key: {
      default: "ctrl+c",
      mac:"meta+c"
    },
    action: ()=> generateImage({action: "clipboard"}),
  }
];
