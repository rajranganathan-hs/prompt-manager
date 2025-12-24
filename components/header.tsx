"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

/**
 * Animation variants for the header.
 * The header will fade in smoothly when the page loads.
 */
const headerVariants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

/**
 * Header component that provides navigation for the application.
 * Contains links to Home and Prompt pages using ShadCN Button components.
 * Uses Framer Motion for smooth entrance animations.
 */
export const Header = () => {
  return (
    <motion.header
      className="border-b bg-background"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Project Name */}
          <Button variant="ghost" asChild className="text-xl font-semibold">
            <Link href="/">Prompt Manager</Link>
          </Button>

          {/* Navigation Links using ShadCN Button components */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/prompts">Prompts</Link>
            </Button>
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

