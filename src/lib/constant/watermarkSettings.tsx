import {
  ArrowDownLeft,
  ArrowDownRight,
  ArrowUpLeft,
  ArrowUpRight,
} from "lucide-react";

export const watermarkSettings = {
  position: [
    { name: "top-left", icon: <ArrowUpLeft className="size-4" /> },
    { name: "top-right", icon: <ArrowUpRight className="size-4" /> },
    { name: "bottom-left", icon: <ArrowDownLeft className="size-4" /> },
    { name: "bottom-right", icon: <ArrowDownRight className="size-4" /> },
  ],
  background: [
    {
      name: "light",
      icon: "white",
    },
    {
      name: "dark",
      icon: "black",
    },
    {
      name: "color-dark",
      icon: "#0E4598",
    },
    {
      name: "color-light",
      icon: "#1573FE",
    },
  ],
  foreground: [
    {
      name: "light",
      icon: "white",
    },
    {
      name: "dark",
      icon: "black",
    },
    {
      name: "color-dark",
      icon: "#0E4598",
    },
    {
      name: "color-light",
      icon: "#1573FE",
    },
  ],
};
