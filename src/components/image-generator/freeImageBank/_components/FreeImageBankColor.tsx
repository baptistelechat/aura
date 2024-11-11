import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Palette } from "lucide-react";

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
        <SelectItem value="all_colors">
          <div className="flex items-center gap-2">
            <Palette className="size-4" />
            All colors
          </div>
        </SelectItem>
        <SelectGroup>
          <SelectLabel>Filter results by color</SelectLabel>
          {imageBank === "unsplash"
            ? unsplashColors.map((color) => (
                <SelectItem key={color} value={color}>
                  <div className="flex items-center gap-2">
                    <div
                      className="size-4 rounded-full border border-muted-foreground"
                      style={{
                        backgroundColor:
                          color === "black_and_white" ? "lightgrey" : color,
                      }}
                    ></div>
                    {color.charAt(0).toUpperCase() +
                      color.slice(1).replaceAll("_", " ")}
                  </div>
                </SelectItem>
              ))
            : pixabayColors.map((color) => (
                <SelectItem key={color} value={color}>
                  <div className="flex items-center gap-2">
                    <div
                      className="size-4 rounded-full border border-muted-foreground"
                      style={{
                        backgroundColor:
                          color === "grayscale"
                            ? "lightgrey"
                            : color === "lilac"
                            ? "rebeccaPurple"
                            : color,
                      }}
                    ></div>
                    {color.charAt(0).toUpperCase() +
                      color.slice(1).replaceAll("_", " ")}
                  </div>
                </SelectItem>
              ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FreeImageBankColor;
