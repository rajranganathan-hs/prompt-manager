"use client";

import { motion } from "framer-motion";

/**
 * Animation variants for the page header.
 * The header will fade in and slide down smoothly.
 */
const headerVariants = {
  hidden: {
    opacity: 0,
    y: -20, // Start 20px above final position
  },
  visible: {
    opacity: 1,
    y: 0, // End at final position
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

/**
 * PageHeader component with smooth Framer Motion animations.
 * Displays the page title and description with a fade-in and slide-down effect.
 */
export const PageHeader = () => {
  return (
    <motion.div
      className="mb-8"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-3xl font-bold text-foreground mb-2">Prompts</h1>
      <p className="text-muted-foreground">
        Browse and manage all your favorite prompts
      </p>
    </motion.div>
  );
};

