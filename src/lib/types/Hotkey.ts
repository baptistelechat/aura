import { TabNames } from "./TabNames";

export type Hotkey = {
  id: string;
  name: string;
  description: string;
  category: ("general" | "save" | "navigation" | TabNames)[];
  key: {
    default: string;
    mac: string;
  };
  action: () => void;
  order?: number;
};
