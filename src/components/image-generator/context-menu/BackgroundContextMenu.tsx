import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { ReactNode } from "react";
import BackgroundColorContextMenu from "./components/BackgroundColorContextMenu";
import BackgroundEffectsContextMenu from "./components/BackgroundEffectsContextMenu";

interface IImageContextMenuProps {
  children: ReactNode;
}

const BackgroundContextMenu = ({ children }: IImageContextMenuProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <BackgroundColorContextMenu />
        <ContextMenuSeparator />
        <BackgroundEffectsContextMenu />
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default BackgroundContextMenu;
