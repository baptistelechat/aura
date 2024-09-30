import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";

interface IKeyboardProps {
  keyName: string;
}

const Keyboard = ({ keyName }: IKeyboardProps) => {
  const hotkeySet = useImageGeneratorStore((s) => s.general.hotkeySet);

  const keyMap: Record<string, string> = {
    meta: hotkeySet === "mac" ? "⌘" : "WIN",
    alt: hotkeySet === "mac" ? "⌥" : "ALT",
  };

  return (
    <kbd className="rounded-md border border-gray-400 bg-gray-200 px-2 py-1 font-mono text-xs font-semibold uppercase text-gray-800 shadow-md">
      {keyMap[keyName] || keyName}
    </kbd>
  );
};

export default Keyboard;
