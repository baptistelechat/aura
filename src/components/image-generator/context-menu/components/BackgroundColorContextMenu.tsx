import {
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { setRandomCustomBackground } from "@/lib/utils/image-generator/setBackgroundColor/setRandomCustomBackground";
import { setRandomGradientBackground } from "@/lib/utils/image-generator/setBackgroundColor/setRandomGradientBackground";
import { setRandomMagicBackground } from "@/lib/utils/image-generator/setBackgroundColor/setRandomMagicBackground";
import { setTransparentBackground } from "@/lib/utils/image-generator/setBackgroundColor/setTransparentBackground";
import { Dices, Eraser, PaintbrushVertical, SlidersHorizontal, WandSparkles } from "lucide-react";

const BackgroundColorContextMenu = () => {
  const magicColor = useImageGeneratorStore(
    (s) => s.settings.background.magicColor
  );
  
  const tab = useImageGeneratorStore((s) => s.general.tab);
  const setTab = useImageGeneratorStore((s) => s.setTab);

  return (
    <>
      <ContextMenuLabel>
        <span className="flex items-center gap-1.5">
          <PaintbrushVertical className="size-4" />
          Background Color
        </span>
      </ContextMenuLabel>
      <ContextMenuSeparator />
      <ContextMenuItem onClick={() => setRandomCustomBackground()}>
        <span className="flex items-center gap-1.5">
          <Dices className="size-4" />
          Random color
        </span>
      </ContextMenuItem>
      <ContextMenuItem
        onClick={() => setRandomGradientBackground("custom-gradient")}
      >
        <span className="flex items-center gap-1.5">
          <Dices className="size-4" />
          Random gradient
        </span>
      </ContextMenuItem>
      {magicColor && magicColor.length > 0 && (
        <>
          <ContextMenuItem onClick={() => setRandomMagicBackground()}>
            <span className="flex items-center gap-1.5">
              <WandSparkles className="size-4" />
              Random Magic color
            </span>
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => setRandomGradientBackground("magic-gradient")}
          >
            <span className="flex items-center gap-1.5">
              <WandSparkles className="size-4" />
              Random Magic gradient
            </span>
          </ContextMenuItem>
        </>
      )}
      <ContextMenuItem onClick={() => setTransparentBackground()}>
        <span className="flex items-center gap-1.5">
          <Eraser className="size-4" />
          Transparent background
        </span>
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem
        onClick={() => setTab("background-color")}
        disabled={tab === "background-color"}
      >
        <span className="flex items-center gap-1.5">
          <SlidersHorizontal className="size-4" />
          All settings
        </span>
      </ContextMenuItem>
    </>
  );
};

export default BackgroundColorContextMenu;
