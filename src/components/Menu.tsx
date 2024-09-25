"use client";
import { Button } from "@/components/ui/button";
import { House, ImageIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ReactElement } from "react";
import Logo from "./Logo";

const Menu = () => {
  const pathname = usePathname();
  const router = useRouter();

  const links: {
    name: string;
    path: string;
    icon: ReactElement;
    disabled: boolean;
  }[] = [
    {
      name: "Home",
      path: "/",
      icon: <House className="mr-2 size-4" />,
      disabled: true,
    },
    {
      name: "Image Generator",
      path: "/image-generator",
      icon: <ImageIcon className="mr-2 size-4" />,
      disabled: false,
    },
    // {
    //   name: "Screen Recorder",
    //   path: "/screen-recorder",
    //   icon: <Clapperboard className="mr-2 size-4" />,
    //   disabled: true,
    // },
  ];

  return (
    <nav className="flex w-full justify-center gap-4 px-8 pt-4">
      <div className="flex w-1/3 items-center justify-start">
        <Logo size="md"/>
      </div>
      <div className="flex w-1/3 items-center justify-center">
        {links.map((link) => (
          <Button
            disabled={link.disabled}
            key={link.name}
            variant={pathname === link.path ? "default" : "link"}
            onClick={() => router.push(link.path)}
          >
            {link.icon}
            {link.name}
          </Button>
        ))}
      </div>
      <div className="flex w-1/3 items-center justify-center" />
    </nav>
  );
};

export default Menu;
