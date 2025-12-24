"use client";

import { motion } from "framer-motion";
import { PromptsGrid } from "./prompts-grid";

/**
 * Type definition for a prompt object.
 */
type Prompt = {
  id?: number;
  name: string;
  description: string;
  content: string;
};

/**
 * Props for the PromptsWrapper component.
 */
type PromptsWrapperProps = {
  prompts: Prompt[];
};

/**
 * Animation variants for smooth fade-in of the content.
 */
const wrapperVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.05, // Stagger the children animations slightly
    },
  },
};

/**
 * PromptsWrapper component that wraps the PromptsGrid with smooth fade-in animation.
 * This ensures a smooth transition when data loads and replaces the loading skeleton.
 */
export const PromptsWrapper = ({ prompts }: PromptsWrapperProps) => {
  return (
    <motion.div
      variants={wrapperVariants}
      initial="hidden"
      animate="visible"
    >
      <PromptsGrid prompts={prompts} />
    </motion.div>
  );
};

