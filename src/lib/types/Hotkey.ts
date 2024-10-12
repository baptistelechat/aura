import { TabNames } from "./TabNames";

export type HotkeyCategory = "general" | "save" | "navigation" | TabNames;

export type Hotkey = {
  id: string;
  name: string;
  description: string;
  category: HotkeyCategory[];
  key: {
    default: string;
    mac: string;
  };
  action: () => void;
  order?: Partial<Record<HotkeyCategory, number>>;
};
