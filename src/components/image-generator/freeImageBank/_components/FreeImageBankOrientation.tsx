import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Orientation = "all" | "landscape" | "portrait";

interface IFreeImageBankOrientationProps {
  orientation: Orientation;
  setOrientation: React.Dispatch<React.SetStateAction<Orientation>>;
}

const FreeImageBankOrientation = ({
  orientation,
  setOrientation,
}: IFreeImageBankOrientationProps) => {
  return (
    <RadioGroup
      defaultValue={orientation}
      onValueChange={(value) => setOrientation(value as Orientation)}
      className="flex gap-3"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="all" />
        <Label>All</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="landscape" />
        <Label>Landscape</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="portrait" />
        <Label>Portrait</Label>
      </div>
    </RadioGroup>
  );
};

export default FreeImageBankOrientation;
