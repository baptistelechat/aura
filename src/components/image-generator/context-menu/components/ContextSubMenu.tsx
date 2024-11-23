import {
  ContextMenuItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "@/components/ui/context-menu";
import { ReactNode } from "react";

interface IContextSubMenuProps {
  label: string;
  logo?: ReactNode;
  currentValue: number;
  defaultValue: number;
  options: { label: string; value: number }[];
  onClick: (value: number) => void;
}

const ContextSubMenu = ({
  label,
  logo,
  currentValue,
  defaultValue,
  options,
  onClick,
}: IContextSubMenuProps) => (
  <ContextMenuSub>
    <ContextMenuSubTrigger>
      <span className="flex items-center gap-1.5">
        {logo}
        {label}
      </span>
    </ContextMenuSubTrigger>
    <ContextMenuSubContent>
      <ContextMenuRadioGroup value={String(currentValue)}>
        {options.map(({ label, value }) => (
          <ContextMenuRadioItem
            key={label}
            onClick={() => onClick(value)}
            value={String(value)}
          >
            {label}
          </ContextMenuRadioItem>
        ))}
      </ContextMenuRadioGroup>

      <ContextMenuSeparator />
      <ContextMenuItem
        onClick={() => onClick(defaultValue)}
        disabled={currentValue === defaultValue}
      >
        Reset
      </ContextMenuItem>
    </ContextMenuSubContent>
  </ContextMenuSub>
);

export default ContextSubMenu;
