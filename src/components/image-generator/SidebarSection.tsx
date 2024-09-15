import { RotateCcw } from "lucide-react";
import { ReactElement, ReactNode } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface ISidebarSectionProps {
  title: string;
  icon: ReactElement;
  disabled?: boolean;
  reset?: () => void;
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
    <div className="flex w-full flex-col gap-2">
      <p className="flex items-center gap-2 text-left text-sm font-medium uppercase text-primary/60">
        {icon}
        {title}
        {reset ? (
          <Button
            disabled={disabled}
            variant="outline"
            size="icon-sm"
            onClick={reset}
          >
            <RotateCcw className="size-4" />
          </Button>
        ) : (
          <></>
        )}
      </p>
      {children}
      <Separator className="mt-2" />
    </div>
  );
};

export default SidebarSection;
