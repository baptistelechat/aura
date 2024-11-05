import { palmtreeIslandSun } from "@lucide/lab";
import { Disc3, Icon, ImageIcon } from "lucide-react";
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
    title: "90s",
    icon: <Disc3 className="size-4" />,
    path: "/images/patterns/90s",
    totalImages: 618,
  },
  {
    title: "80s",
    icon: <ImageIcon className="size-4" />,
    path: "/images/patterns/80s",
    totalImages: 545,
  },
  {
    title: "African",
    icon: <ImageIcon className="size-4" />,
    path: "/images/patterns/african",
    totalImages: 728,
  },
  {
    title: "Camouflage",
    icon: <ImageIcon className="size-4" />,
    path: "/images/patterns/camouflage",
    totalImages: 416,
  },
  {
    title: "Candy",
    icon: <ImageIcon className="size-4" />,
    path: "/images/patterns/candy",
    totalImages: 501,
  },
  {
    title: "Cloud",
    icon: <ImageIcon className="size-4" />,
    path: "/images/patterns/cloud",
    totalImages: 429,
  },
  {
    title: "Cocktails",
    icon: <ImageIcon className="size-4" />,
    path: "/images/patterns/cocktails",
    totalImages: 555,
  },
  {
    title: "Coffee",
    icon: <ImageIcon className="size-4" />,
    path: "/images/patterns/coffee",
    totalImages: 518,
  },
  {
    title: "Doodle",
    icon: <ImageIcon className="size-4" />,
    path: "/images/patterns/doodle",
    totalImages: 573,
  },
  {
    title: "Feminine",
    icon: <ImageIcon className="size-4" />,
    path: "/images/patterns/feminine",
    totalImages: 621,
  },
  {
    title: "Fire",
    icon: <ImageIcon className="size-4" />,
    path: "/images/patterns/fire",
    totalImages: 457,
  },
  {
    title: "Flower",
    icon: <ImageIcon className="size-4" />,
    path: "/images/patterns/flower",
    totalImages: 574,
  },
  {
    title: "Fruit",
    icon: <ImageIcon className="size-4" />,
    path: "/images/patterns/fruit",
    totalImages: 1053,
  },
  {
    title: "Heart",
    icon: <ImageIcon className="size-4" />,
    path: "/images/patterns/heart",
    totalImages: 1016,
  },
  {
    title: "Japanese",
    icon: <ImageIcon className="size-4" />,
    path: "/images/patterns/japanese",
    totalImages: 551,
  },
  {
    title: "Jungle",
    icon: <ImageIcon className="size-4" />,
    path: "/images/patterns/jungle",
    totalImages: 573,
  },
  {
    title: "Pirate",
    icon: <ImageIcon className="size-4" />,
    path: "/images/patterns/pirate",
    totalImages: 1020,
  },
  {
    title: "Skull",
    icon: <ImageIcon className="size-4" />,
    path: "/images/patterns/skull",
    totalImages: 1034,
  },
  {
    title: "Spring",
    icon: <ImageIcon className="size-4" />,
    path: "/images/patterns/spring",
    totalImages: 598,
  },
  {
    title: "Watercolor",
    icon: <ImageIcon className="size-4" />,
    path: "/images/patterns/watercolor",
    totalImages: 1053,
  },
];
