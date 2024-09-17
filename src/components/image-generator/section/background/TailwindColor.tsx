import SidebarSection from "@/components/image-generator/SidebarSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import tailwindColors from "@/lib/constant/tailwindColors";
import useImageGeneratorStore, {
  defaultSettings,
} from "@/lib/store/imageGenerator.store";
import { Palette } from "lucide-react";

const TailwindColor = () => {
  const backgroundColor = useImageGeneratorStore(
    (s) => s.settings.background.backgroundColor
  );
  const setBackgroundColor = useImageGeneratorStore(
    (s) => s.setBackgroundColor
  );
  const setTailwindColor = useImageGeneratorStore((s) => s.setTailwindColor);
  const resetBackground = useImageGeneratorStore((s) => s.resetBackground);

  const handleColorChange = (
    backgroundColor: string,
    tailwindColor: string
  ) => {
    setBackgroundColor(backgroundColor);
    setTailwindColor(tailwindColor);
  };

  return (
    <SidebarSection
      title={"Tailwind Color"}
      icon={<Palette className="size-4" />}
      disabled={backgroundColor === defaultSettings.background.backgroundColor}
      reset={resetBackground}
    >
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            {" "}
            <Label className="mt-2 text-primary/40">Solid color</Label>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-11 gap-1">
              {Object.entries(tailwindColors).map(([colorName, shades]) => {
                if (typeof shades === "object" && shades !== null) {
                  return Object.entries(shades).map(([shade, hex]) => (
                    <Tooltip key={`${colorName}-${shade}`}>
                      <TooltipTrigger>
                        <div
                          className="size-4 cursor-pointer rounded"
                          style={{ backgroundColor: hex }}
                          onClick={() =>
                            handleColorChange(hex, `${colorName}-${shade}`)
                          }
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{`${colorName}-${shade}`}</p>
                      </TooltipContent>
                    </Tooltip>
                  ));
                }
                return null;
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </SidebarSection>
  );
};

export default TailwindColor;
