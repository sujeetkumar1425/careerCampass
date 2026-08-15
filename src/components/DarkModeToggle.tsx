import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';

interface DarkModeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export function DarkModeToggle({ isDarkMode, onToggle }: DarkModeToggleProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="relative h-9 w-9 rounded-full"
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        <motion.div
          initial={false}
          animate={{
            scale: isDarkMode ? 0 : 1,
            opacity: isDarkMode ? 0 : 1,
            rotate: isDarkMode ? 90 : 0,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="h-4 w-4" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            scale: isDarkMode ? 1 : 0,
            opacity: isDarkMode ? 1 : 0,
            rotate: isDarkMode ? 0 : -90,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="h-4 w-4" />
        </motion.div>
      </Button>
    </motion.div>
  );
}