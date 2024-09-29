import { hotkeys } from "@/lib/constant/hotkeys";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";

export const getHotkeyByName = (hotkeyName: string) => {
  const hotkeySet = useImageGeneratorStore.getState().hotkeySet;
  const hotkey = hotkeys.find((hotkey) => hotkey.id === hotkeyName);
  const hotkeyString = hotkey?.key[hotkeySet];
  
  return hotkeyString || "";
};
