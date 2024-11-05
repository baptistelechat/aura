import { cocktail, flowerRoseSingle, palmtreeIslandSun } from "@lucide/lab";
import {
  Brush,
  Citrus,
  Cloud,
  Coffee,
  Disc3,
  Earth,
  Flame,
  Flower,
  Heart,
  Icon,
  Lollipop,
  PenTool,
  Shield,
  ShipWheel,
  Skull,
  TreePalm,
  Users,
} from "lucide-react";
import { ReactElement } from "react";

type BgImage = {
  title: string;
  icon: ReactElement;
  path: string;
  totalImages: number;
};

export const backgroundImages: BgImage[] = [
  {
    title: "Summer",
    icon: <Icon iconNode={palmtreeIslandSun} className="size-4" />,
    path: "/images/patterns/summer",
    totalImages: 422,
  },
  {
    title: "Spring",
    icon: <Flower className="size-4" />,
    path: "/images/patterns/spring",
    totalImages: 598,
  },
  {
    title: "Flower",
    icon: <Icon iconNode={flowerRoseSingle} className="size-4" />,
    path: "/images/patterns/flower",
    totalImages: 574,
  },
  {
    title: "Watercolor",
    icon: <Brush className="size-4" />,
    path: "/images/patterns/watercolor",
    totalImages: 1053,
  },
  {
    title: "Jungle",
    icon: <TreePalm className="size-4" />,
    path: "/images/patterns/jungle",
    totalImages: 573,
  },
  {
    title: "Cloud",
    icon: <Cloud className="size-4" />,
    path: "/images/patterns/cloud",
    totalImages: 429,
  },
  {
    title: "Feminine",
    icon: <Users className="size-4" />,
    path: "/images/patterns/feminine",
    totalImages: 621,
  },
  {
    title: "Doodle",
    icon: <PenTool className="size-4" />,
    path: "/images/patterns/doodle",
    totalImages: 573,
  },
  {
    title: "80s",
    icon: <Disc3 className="size-4" />,
    path: "/images/patterns/80s",
    totalImages: 545,
  },
  {
    title: "90s",
    icon: <Disc3 className="size-4" />,
    path: "/images/patterns/90s",
    totalImages: 618,
  },
  {
    title: "Japanese",
    icon: <Earth className="size-4" />,
    path: "/images/patterns/japanese",
    totalImages: 551,
  },
  {
    title: "African",
    icon: <Earth className="size-4" />,
    path: "/images/patterns/african",
    totalImages: 728,
  },
  {
    title: "Fruit",
    icon: <Citrus className="size-4" />,
    path: "/images/patterns/fruit",
    totalImages: 1053,
  },
  {
    title: "Cocktails",
    icon: <Icon iconNode={cocktail} className="size-4" />,
    path: "/images/patterns/cocktails",
    totalImages: 555,
  },
  {
    title: "Coffee",
    icon: <Coffee className="size-4" />,
    path: "/images/patterns/coffee",
    totalImages: 518,
  },
  {
    title: "Candy",
    icon: <Lollipop className="size-4" />,
    path: "/images/patterns/candy",
    totalImages: 501,
  },
  {
    title: "Heart",
    icon: <Heart className="size-4" />,
    path: "/images/patterns/heart",
    totalImages: 1016,
  },
  {
    title: "Fire",
    icon: <Flame className="size-4" />,
    path: "/images/patterns/fire",
    totalImages: 457,
  },
  {
    title: "Camouflage",
    icon: <Shield className="size-4" />,
    path: "/images/patterns/camouflage",
    totalImages: 416,
  },
  {
    title: "Pirate",
    icon: <ShipWheel className="size-4" />,
    path: "/images/patterns/pirate",
    totalImages: 1020,
  },
  {
    title: "Skull",
    icon: <Skull className="size-4" />,
    path: "/images/patterns/skull",
    totalImages: 1034,
  },
];
