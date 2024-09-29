interface IKeyboardProps {
  keyName: string;
}

const Keyboard = ({ keyName }: IKeyboardProps) => {
  return (
    <kbd className="rounded-md border border-gray-400 bg-gray-200 px-2 py-1 font-mono text-xs font-semibold uppercase text-gray-800 shadow-md">
      {keyName}
    </kbd>
  );
};

export default Keyboard;
