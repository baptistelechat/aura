"use client";
import { Button } from "@/components/ui/button";
import { Clapperboard, House } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ReactElement } from "react";

const Menu = () => {
  const pathname = usePathname();
  const router = useRouter();

  const links: { name: string; path: string; icon: ReactElement }[] = [
    {
      name: "Home",
      path: "/",
      icon: <House className="mr-2 size-4" />,
    },
    {
      name: "Screen Recorder",
      path: "/screen-recorder",
      icon: <Clapperboard className="mr-2 size-4" />,
    },
  ];

  return (
    <nav className="flex w-full justify-center p-4 gap-4">
      {links.map((link) => (
        <Button
          variant={pathname === link.path ? "default" : "link"}
          onClick={() => router.push(link.path)}
        >
          {link.icon}
          {link.name}
        </Button>
      ))}
    </nav>
  );
};

export default Menu;
