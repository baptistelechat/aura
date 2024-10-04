import CustomAccordionItem from "@/components/CustomAccordionItem";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { WandSparkles } from "lucide-react";

const MagicColor = () => {
  const backgroundColor = useImageGeneratorStore(
    (s) => s.settings.background.backgroundColor
  );
  const gradient = useImageGeneratorStore(
    (s) => s.settings.background.gradient
  );
  const magicColor = useImageGeneratorStore(
    (s) => s.settings.background.magicColor
  );

  const setBackgroundColor = useImageGeneratorStore(
    (s) => s.setBackgroundColor
  );
  const resetBackground = useImageGeneratorStore((s) => s.resetBackground);
  const defaultBackgroundSettings = defaultImageGeneratorSettings.background;

  return (
    <CustomAccordionItem
      title={"Magic Color"}
      icon={<WandSparkles className="size-4" />}
      disabled={
        backgroundColor === defaultBackgroundSettings.backgroundColor &&
        gradient.orientation ===
          defaultBackgroundSettings.gradient.orientation &&
        gradient.from === defaultBackgroundSettings.gradient.from &&
        gradient.via === defaultBackgroundSettings.gradient.via &&
        gradient.to === defaultBackgroundSettings.gradient.to
      }
      reset={resetBackground}
    >
      {magicColor.length > 0 ? (
        <div className="flex gap-1">
          {magicColor.map((color, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className="flex size-5 cursor-pointer rounded"
                  onClick={() => setBackgroundColor(color)}
                  style={{
                    backgroundColor: color,
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{color}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      ) : (
        <p>Load an image to get magic colors</p>
      )}
    </CustomAccordionItem>
  );
};

export default MagicColor;
