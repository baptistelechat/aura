import { hotkeys } from "@/lib/constant/hotkeys";
import useImageGeneratorStore from "@/lib/store/imageGenerator.store";

export const getHotkeyById = (hotkeyId: string) => {
  const hotkeySet = useImageGeneratorStore.getState().hotkeySet;
  const hotkey = hotkeys.find((hotkey) => hotkey.id === hotkeyId);
  if (hotkey) {
    const hotkeyString = hotkey.key[hotkeySet];
    return { name: hotkey?.name || "", key: hotkeyString || "" };
  }

  return {
    name: "",
    key: "",
  };
};
