import { RotateCcw } from "lucide-react";
import { ReactElement, ReactNode } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface ICustomAccordionItemProps {
  title: string;
  icon: ReactElement;
  disabled?: boolean;
  reset?: () => void;
  children?: ReactNode;
}

const CustomAccordionItem = ({
  title,
  icon,
  disabled,
  reset,
  children,
}: ICustomAccordionItemProps) => {
  return (
    <AccordionItem value={title.replaceAll(" ", "-").toLowerCase()} className="pt-1">
      <div className="flex items-center">
        <AccordionTrigger className="ml-0.5 px-1">
          <p className="flex w-full items-center gap-2 text-left text-sm font-medium uppercase text-muted-foreground/80">
            {icon}
            {title}
          </p>
        </AccordionTrigger>
        {reset ? (
          <Button
            disabled={disabled}
            variant="outline"
            size="icon-sm"
            onClick={(e) => {
              e.stopPropagation();
              reset();
            }}
            className="mr-1"
          >
            <RotateCcw className="size-4" />
          </Button>
        ) : (
          <></>
        )}
      </div>
      <AccordionContent className="px-1 pt-1">{children}</AccordionContent>
    </AccordionItem>
  );
};

export default CustomAccordionItem;
