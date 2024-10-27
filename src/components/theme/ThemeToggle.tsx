"use client";

import { useEffect, useState } from "react";
import { MotionButton } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronRight, Dot, MonitorCog, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { ActionVariants } from "@/lib/utils/framer-motion/variants";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <></>;
  }

  const Icon = () => {
    if (theme === "system") {
      return <MonitorCog className="size-5" />;
    } else if (theme === "light") {
      return <Sun className="size-5" />;
    } else {
      return <Moon className="size-5" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MotionButton
          variant="outline"
          size="icon"
          variants={ActionVariants}
          initial="hidden"
          animate="visible"
        >
          {Icon()}
          <span className="sr-only">Toggle theme</span>
        </MotionButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="hover:cursor-pointer"
        >
          {theme === "system" ? (
            <ChevronRight className="mr-2 size-4" />
          ) : (
            <Dot className="mr-2 size-4" />
          )}
          System
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="hover:cursor-pointer"
        >
          {theme === "light" ? (
            <ChevronRight className="mr-2 size-4" />
          ) : (
            <Dot className="mr-2 size-4" />
          )}
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="hover:cursor-pointer"
        >
          {theme === "dark" ? (
            <ChevronRight className="mr-2 size-4" />
          ) : (
            <Dot className="mr-2 size-4" />
          )}
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
