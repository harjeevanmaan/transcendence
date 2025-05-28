"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-xl font-semibold text-indigo-500 dark:text-indigo-400">
            Transcendence
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="#how-it-works"
            className="text-zinc-700 dark:text-zinc-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
          >
            How it Works
          </Link>
          <Link
            href="#pricing"
            className="text-zinc-700 dark:text-zinc-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
          >
            Pricing
          </Link>
        </div>

        {/* Right side - CTA and theme toggle */}
        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="default"
            className="bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            Start Recording
          </Button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleTheme}
            className="p-2 mr-2 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 py-4 px-4">
          <div className="flex flex-col space-y-4">
            <Link
              href="#how-it-works"
              className="text-zinc-700 dark:text-zinc-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              How it Works
            </Link>
            <Link
              href="#pricing"
              className="text-zinc-700 dark:text-zinc-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Button
              variant="default"
              className="bg-indigo-500 hover:bg-indigo-600 text-white w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              Start Recording
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
