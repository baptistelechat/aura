import {
  Blend,
  Eye,
  ImageIcon,
  PaintbrushVertical,
  Shapes,
  Sparkle,
  Tags,
} from "lucide-react";
import { ReactElement } from "react";
import { TabNames } from "../types/TabNames";

export const tabOptions: {
  name: TabNames;
  icon: ReactElement;
  disabled?: boolean;
}[] = [
  {
    name: "image",
    icon: <ImageIcon className="size-4" />,
  },
  {
    name: "background",
    icon: <PaintbrushVertical className="size-4" />,
  },
  {
    name: "background-effects",
    icon: <Sparkle className="size-4" />,
  },
  {
    name : "overlays",
    icon : <Blend className="size-4" />,
  },
  {
    name: "annotations",
    icon: <Shapes className="size-4" />,
    disabled: true,
  },
  {
    name: "watermarks",
    icon: <Tags className="size-4" />,
  },
  {
    name: "visibility",
    icon: <Eye className="size-4" />,
  },
];
