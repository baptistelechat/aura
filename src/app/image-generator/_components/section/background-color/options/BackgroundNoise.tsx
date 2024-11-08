import CustomAccordionItem from "@/components/image-generator/CustomAccordionItem";
import { defaultImageGeneratorSettings } from "@/lib/constant/defaultImageGeneratorSettings";
import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { Dot, Grip } from "lucide-react";
import Control from "@/components/image-generator/Control";

const BackgroundNoise = () => {
  const noise = useImageGeneratorStore((s) => s.settings.background.noise);
  const setBackground = useImageGeneratorStore((s) => s.setBackground);
  const defaultValue = defaultImageGeneratorSettings.background.noise;

  return (
    <CustomAccordionItem
      title={"Noise"}
      icon={<Grip className="size-4" />}
      disabled={noise === defaultValue}
      reset={() => setBackground({ noise: defaultValue })}
    >
      <Control
        title={"opacity"}
        value={noise}
        setValue={setBackground}
        updateKey={"noise"}
        min={0}
        max={1}
        step={0.05}
        minIcon={<Dot className="size-5" />}
        middleIcon={
          <div className="flex flex-col gap-0.5">
            <div className="flex gap-0.5">
              <div className="size-1 rounded-full bg-slate-900 dark:bg-slate-200" />
              <div className="size-1 rounded-full bg-slate-900 dark:bg-slate-200" />
            </div>
            <div className="flex gap-0.5">
              <div className="size-1 rounded-full bg-slate-900 dark:bg-slate-200" />
              <div className="size-1 rounded-full bg-slate-900 dark:bg-slate-200" />
            </div>
          </div>
        }
        maxIcon={<Grip className="size-5" />}
      />
    </CustomAccordionItem>
  );
};

export default BackgroundNoise;
