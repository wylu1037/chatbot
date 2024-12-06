"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="border-border relative flex h-6 w-11 items-center rounded-full border bg-gray-100 transition-colors duration-200 dark:bg-gray-900"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <motion.div
        className="flex w-5 items-center justify-center"
        animate={{ x: theme === "dark" ? "1.25rem" : "0rem" }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {theme === "dark" ? (
          <div className="flex h-5 w-5 -translate-x-[1px] items-center justify-center rounded-full bg-black text-white">
            <Moon className="h-3 w-3" />
          </div>
        ) : (
          <div className="flex h-5 w-5 translate-x-[1px] items-center justify-center rounded-full bg-white text-gray-600">
            <Sun className="h-3 w-3" />
          </div>
        )}
      </motion.div>
    </button>
  );
}
