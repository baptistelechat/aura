import { cn } from "@/lib/utils";
import FreeImageBankSelect from "./FreeImageBankSelect";

interface IFreeImageBankProps {
  mode: "image" | "background";
  variant?: "default" | "icon";
}

const FreeImageBank = ({ mode, variant = "default" }: IFreeImageBankProps) => {
  return (
    <div className={cn("flex gap-2")}>
      <FreeImageBankSelect
        imageBank="unsplash"
        mode={mode}
        variant={variant}
      />
      <FreeImageBankSelect imageBank="pixabay" mode={mode} variant={variant} />
    </div>
  );
};

export default FreeImageBank;
