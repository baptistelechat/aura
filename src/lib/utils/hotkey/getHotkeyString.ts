import { HotkeysEvent } from "react-hotkeys-hook/dist/types";

export const getHotkeyString = (handler: HotkeysEvent) => {
  console.log(handler);

  const keys = [];

  if (handler.ctrl) keys.push("ctrl");
  if (handler.alt) keys.push("alt");
  if (handler.shift) keys.push("shift");
  if (handler.meta) keys.push("meta");

  if (handler.keys) {
    keys.push(...handler.keys);
  }

  return keys.join("+");
};