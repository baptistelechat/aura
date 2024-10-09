import { Eye, ImageIcon, PaintbrushVertical, Shapes, Sparkle, Tag } from "lucide-react";
import { ReactElement } from "react";
import { TabOptions } from "../store/imageGenerator.store";

export const tabs: { name: TabOptions; icon: ReactElement }[] = [
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
      name: "annotations",
      icon: <Shapes className="size-4" />,
    },
    {
      name: "watermark",
      icon: <Tag className="size-4" />,
    },
    {
      name: "visibility",
      icon: <Eye className="size-4" />,
    },
  ];