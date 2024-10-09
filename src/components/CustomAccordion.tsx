import { ReactNode } from "react";
import { Accordion } from "./ui/accordion";
import { ScrollArea } from "./ui/scroll-area";

interface ICustomAccordionProps {
  type: "multiple" | "single";
  children?: ReactNode;
}

const CustomAccordion = ({ type, children }: ICustomAccordionProps) => {
  return (
    <div className="flex flex-col">
      <ScrollArea className="max-h-[calc(100vh-375px)] grow">
        <Accordion type={type} collapsible={type === "single"}>
          {children}
        </Accordion>
      </ScrollArea>
    </div>
  );
};

export default CustomAccordion;
