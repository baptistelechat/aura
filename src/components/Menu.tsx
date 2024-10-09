"use client";
import HotkeyHelper from "@/components/keyboard/HotkeyHelper";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { House, ImageIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import Logo from "./Logo";

const Menu = () => {
  const { theme, systemTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const logoVariant = currentTheme === "light" ? "color-dark" : "light";

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
  ];

  return (
    <nav className="flex w-full justify-center gap-4 px-8 pt-4">
      <div className="flex w-1/3 items-center justify-start">
        <Logo size="md" foreground={logoVariant} />
      </div>
      <div className="flex w-1/3 items-center justify-center">
        {links.map((link) => (
          <Button
            disabled={link.disabled}
            key={link.name}
            variant={pathname === link.path ? "default" : "link"}
            onClick={() => router.push(link.path)}
            className={
              currentTheme === "dark" && link.disabled ? "brightness-125" : ""
            }
          >
            {link.icon}
            {link.name}
          </Button>
        ))}
      </div>
      <div className="flex w-1/3 items-center justify-end gap-2">
        <HotkeyHelper />
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Menu;
