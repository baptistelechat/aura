import { RotateCcw } from "lucide-react";
import { ReactElement, ReactNode } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface ISidebarSectionProps {
  title: string;
  icon: ReactElement;
  reset: () => void;
  children?: ReactNode;
}

const SidebarSection = ({
  title,
  icon,
  reset,
  children,
}: ISidebarSectionProps) => {
  return (
    <div className="flex flex-col w-full gap-4">
      <p className="font-medium text-sm text-left flex items-center text-primary/40 uppercase gap-2">
        {icon}
        {title}
        <Button variant="outline" size="icon-sm" onClick={reset}>
          <RotateCcw className="size-4" />
        </Button>
      </p>
      {children}
      <Separator />
    </div>
  );
};

export default SidebarSection;
