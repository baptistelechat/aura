import { RotateCcw } from "lucide-react";
import { ReactElement, ReactNode } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";

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
    <AccordionItem value={title.replaceAll(" ", "-").toLowerCase()}>
      <AccordionTrigger>
        <p className="flex items-center gap-2 text-left text-sm font-medium uppercase text-primary/60">
          {icon}
          {title}
          {reset ? (
            <Button
              disabled={disabled}
              variant="outline"
              size="icon-sm"
              onClick={(e) => {
                e.stopPropagation();
                reset();
              }}
            >
              <RotateCcw className="size-4" />
            </Button>
          ) : (
            <></>
          )}
        </p>
      </AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
};

export default SidebarSection;
