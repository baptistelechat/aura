import {
  ArrowDown,
  ArrowDownLeft,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpLeft,
  ArrowUpRight,
  Circle,
  Dot,
} from "lucide-react";
import { ReactElement } from "react";
import {
  LinearGradientOrientation,
  RadialGradientOrientation,
} from "../types/gradientOrientation";

const gradientOrientations: {
  linear: {
    angle: LinearGradientOrientation | RadialGradientOrientation | null;
    icon: ReactElement;
  }[];
    radial: {
    angle: string;
    icon: ReactElement;
  }[];
} = {
  linear: [
    { angle: 135, icon: <ArrowDownRight className="size-4" /> },
    { angle: 180, icon: <ArrowDown className="size-4" /> },
    { angle: 225, icon: <ArrowDownLeft className="size-4" /> },
    { angle: 90, icon: <ArrowRight className="size-4" /> },
    { angle: null, icon: <Dot className="size-4" /> },
    { angle: 270, icon: <ArrowLeft className="size-4" /> },
    { angle: 45, icon: <ArrowUpRight className="size-4" /> },
    { angle: 0, icon: <ArrowUp className="size-4" /> },
    { angle: 315, icon: <ArrowUpLeft className="size-4" /> },
  ],
  radial: [
    {
      angle: "circle at top left",
      icon: <ArrowDownRight className="size-4" />,
    },
    { angle: "circle at top", icon: <ArrowDown className="size-4" /> },
    {
      angle: "circle at top right",
      icon: <ArrowDownLeft className="size-4" />,
    },
    { angle: "circle at left", icon: <ArrowRight className="size-4" /> },
    { angle: "circle at center", icon: <Circle className="size-4" /> },
    { angle: "circle at right", icon: <ArrowLeft className="size-4" /> },
    {
      angle: "circle at bottom left",
      icon: <ArrowUpRight className="size-4" />,
    },
    { angle: "circle at bottom", icon: <ArrowUp className="size-4" /> },
    {
      angle: "circle at bottom right",
      icon: <ArrowUpLeft className="size-4" />,
    },
  ],
};

export default gradientOrientations;
