export type Hotkey = {
  id: string;
  name: string;
  description: string;
  key: {
    default: string;
    mac: string;
  };
  action: () => void;
};
