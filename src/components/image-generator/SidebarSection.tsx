import { RotateCcw } from "lucide-react";
import { ReactElement, ReactNode } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface ISidebarSectionProps {
  title: string;
  icon: ReactElement;
  disabled: boolean;
  reset: () => void;
  children?: ReactNode;
}

const SidebarSection = ({
  title,
  icon,
  disabled,
  reset,
  children,
}: ISidebarSectionProps) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <p className="font-medium text-sm text-left flex items-center text-primary/60 uppercase gap-2">
        {icon}
        {title}
        <Button
          disabled={disabled}
          variant="outline"
          size="icon-sm"
          onClick={reset}
        >
          <RotateCcw className="size-4" />
        </Button>
      </p>
      {children}
      <Separator className="mt-2"/>
    </div>
  );
};

export default SidebarSection;
