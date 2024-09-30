export type Hotkey = {
  id: string;
  name: string;
  description: string;
  category: "general" | "image" | "background" | "save";
  key: {
    default: string;
    mac: string;
  };
  action: () => void;
  order?: number;
};
