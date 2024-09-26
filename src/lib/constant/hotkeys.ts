interface Hotkey {
  key: string;
  name: string;
  description: string;
  action: string;
}

export const hotkeys: Hotkey[] = [
  {
    key: "ctrl+s",
    name: "Save Document",
    action: "saveDocument",
    description: "Sauvegarder le document",
  },
  {
    key: "ctrl+f",
    name: "Open Find Dialog",
    action: "openFindDialog",
    description: "Ouvrir la boîte de dialogue de recherche",
  },
  {
    key: "ctrl+z",
    name: "Undo Laste Action",
    action: "undoLastAction",
    description: "Annuler la dernière action",
  },
];
