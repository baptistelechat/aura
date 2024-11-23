import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { CircleDotDashed, Grip, Sparkles } from "lucide-react";
import { ReactNode } from "react";
import ContextSubMenu from "./components/ContextSubMenu";

interface IImageContextMenuProps {
  children: ReactNode;
}

const BackgroundContextMenu = ({ children }: IImageContextMenuProps) => {
  const background = useImageGeneratorStore((s) => s.settings.background);
  const setBackground = useImageGeneratorStore((s) => s.setBackground);

  const defaultValue = defaultImageGeneratorSettings.background;
  const maxBlur = 64;

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>
          <span className="flex items-center gap-1.5">
            <Sparkles className="size-4" />
            Background Effects
          </span>
        </ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextSubMenu
          label="Blur"
          logo={<CircleDotDashed className="size-4" />}
          currentValue={background.blur}
          defaultValue={defaultValue.blur}
          options={[
            { label: "25%", value: maxBlur * 0.25 },
            { label: "50%", value: maxBlur * 0.5 },
            { label: "75%", value: maxBlur * 0.75 },
            { label: "100%", value: maxBlur },
          ]}
          onClick={(blur) => setBackground({ blur })}
        />
        <ContextSubMenu
          label="Noise"
          logo={<Grip className="size-4" />}
          currentValue={background.noise}
          defaultValue={defaultValue.noise}
          options={[
            { label: "25%", value: 0.25 },
            { label: "50%", value: 0.5 },
            { label: "75%", value: 0.75 },
            { label: "100%", value: 1 },
          ]}
          onClick={(noise) => setBackground({ noise })}
        />
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default BackgroundContextMenu;
