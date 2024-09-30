import { Fragment } from "react";
import Keyboard from "./Keyboard";

interface IShortcutProps {
  hotkey: string;
}

const Shortcut = ({ hotkey }: IShortcutProps) => {
  const keys = hotkey.split("+");

  return (
    <div className="flex items-center gap-1">
      {keys.map((key, index) => (
        <Fragment key={index}>
          <Keyboard keyName={key} />
          {index < keys.length - 1 && <span>+</span>}
        </Fragment>
      ))}
    </div>
  );
};

export default Shortcut;
