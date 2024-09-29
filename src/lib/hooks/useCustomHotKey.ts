import { useHotkeys } from "react-hotkeys-hook";
import useImageGeneratorStore from "../store/imageGenerator.store";
import { Hotkey } from "../types/Hotkey";
import { getHotkeyString } from "../utils/hotkey/getHotkeyString";

const useCustomHotKey = (hotkeys: Hotkey[]) => {
  const hotkeySet = useImageGeneratorStore.getState().hotkeySet;
  const shortcutKeys = hotkeys.map((hotkey) => hotkey.key[hotkeySet]);

  useHotkeys(shortcutKeys, (event, handler) => {
    const hotkeyString = getHotkeyString(handler);
    // console.log(`Shortcut pressed: ${hotkeyString}`);

    const foundHotkey = hotkeys.find(
      (hotkey) => hotkey.key[hotkeySet] === hotkeyString
    );

    if (foundHotkey && foundHotkey.action) {
      event.preventDefault();
      foundHotkey.action();
    }
  });
};

export default useCustomHotKey;
