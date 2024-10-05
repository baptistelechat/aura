"use client";

import { MotionButton } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Variants } from "framer-motion";
import { ChevronRight, Dot, MonitorCog, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggleVariants: Variants = {
  hidden: {
    x: 50,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MotionButton
          variant="outline"
          size="icon"
          variants={ThemeToggleVariants}
          initial="hidden"
          animate="visible"
        >
          {theme === "light" && (
            <Sun className="size-5 " />
          )}
          {theme === "dark" && (
            <Moon className="size-5 " />
          )}
          {theme === "system" && (
            <MonitorCog className="size-5 " />
          )}
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
        {/* <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
