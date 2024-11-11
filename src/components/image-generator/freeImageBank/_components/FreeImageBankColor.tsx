import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IFreeImageBankColorProps {
  imageBank: "unsplash" | "pixabay";
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

const unsplashColors = [
  "black_and_white",
  "black",
  "white",
  "yellow",
  "orange",
  "red",
  "purple",
  "magenta",
  "green",
  "teal",
  "blue",
];

const pixabayColors = [
  "grayscale",
  "transparent",
  "red",
  "orange",
  "yellow",
  "green",
  "turquoise",
  "blue",
  "lilac",
  "pink",
  "white",
  "gray",
  "black",
  "brown",
];

const FreeImageBankColor = ({
  imageBank,
  color,
  setColor,
}: IFreeImageBankColorProps) => {
  return (
    <Select value={color} onValueChange={(value) => setColor(value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Optional : Filter results by color" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all_colors">All colors</SelectItem>
        <SelectGroup>
          <SelectLabel>Filter results by color</SelectLabel>
          {imageBank === "unsplash"
            ? unsplashColors.map((color) => (
                <SelectItem key={color} value={color}>
                  {color.charAt(0).toUpperCase() +
                    color.slice(1).replaceAll("_", " ")}
                </SelectItem>
              ))
            : pixabayColors.map((color) => (
                <SelectItem key={color} value={color}>
                  {color.charAt(0).toUpperCase() +
                    color.slice(1).replaceAll("_", " ")}
                </SelectItem>
              ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FreeImageBankColor;
