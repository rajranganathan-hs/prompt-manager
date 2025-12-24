"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Type definition for a prompt object.
 * Matches the database schema structure.
 */
type Prompt = {
  id?: number;
  name: string;
  description: string;
  content: string;
};

/**
 * Props for the PromptsGrid component.
 */
type PromptsGridProps = {
  prompts: Prompt[];
};

/**
 * Animation variants for the container (grid).
 * Defines how the grid container animates in.
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger each child animation by 0.1 seconds
    },
  },
};

/**
 * Animation variants for individual cards.
 * Each card will fade in and slide up smoothly, with hover effects.
 */
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20, // Start 20px below final position
  },
  visible: {
    opacity: 1,
    y: 0, // End at final position
    scale: 1,
    transition: {
      duration: 0.5, // Animation duration in seconds
      ease: "easeOut", // Smooth easing function
    },
  },
  hover: {
    scale: 1.02, // Slightly scale up on hover
    y: -4, // Lift up by 4px on hover
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

/**
 * PromptsGrid component that displays prompts in a responsive grid layout.
 * Each prompt is displayed as a card showing the title (name), description, and content.
 * Uses ShadCN Card components for consistent styling and Framer Motion for smooth animations.
 */
export const PromptsGrid = ({ prompts }: PromptsGridProps) => {
  return (
    <motion.div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {prompts.map((prompt) => (
        <motion.div
          key={prompt.id || prompt.name}
          variants={cardVariants}
          whileHover="hover"
        >
          <Card className="flex flex-col h-full cursor-pointer">
            {/* Card Header with Title and Description */}
            <CardHeader>
              <CardTitle>{prompt.name}</CardTitle>
              <CardDescription>{prompt.description}</CardDescription>
            </CardHeader>

            {/* Card Content with the prompt content */}
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {prompt.content}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

