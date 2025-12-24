"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UpdatePromptDialog } from "./update-prompt-dialog";
import { DeletePromptDialog } from "./delete-prompt-dialog";

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
 * Cards animate in with a stagger effect and have smooth hover interactions.
 * Each card has update and delete buttons in the top right corner.
 */
export const PromptsGrid = ({ prompts }: PromptsGridProps) => {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  /**
   * Handles opening the update dialog for a specific prompt.
   * Sets the selected prompt and opens the dialog.
   */
  const handleUpdateClick = (prompt: Prompt) => {
    // Ensure the prompt has an id before opening the dialog
    if (prompt.id) {
      setSelectedPrompt({
        id: prompt.id,
        name: prompt.name,
        description: prompt.description,
        content: prompt.content,
      });
      setIsUpdateDialogOpen(true);
    }
  };

  /**
   * Handles opening the delete dialog for a specific prompt.
   * Sets the selected prompt and opens the dialog.
   */
  const handleDeleteClick = (prompt: Prompt) => {
    // Ensure the prompt has an id before opening the dialog
    if (prompt.id) {
      setSelectedPrompt({
        id: prompt.id,
        name: prompt.name,
        description: prompt.description,
        content: prompt.content,
      });
      setIsDeleteDialogOpen(true);
    }
  };

  /**
   * Handles closing the update dialog.
   * Resets the selected prompt when the dialog is closed.
   */
  const handleUpdateDialogClose = (open: boolean) => {
    setIsUpdateDialogOpen(open);
    if (!open) {
      setSelectedPrompt(null);
    }
  };

  /**
   * Handles closing the delete dialog.
   * Resets the selected prompt when the dialog is closed.
   */
  const handleDeleteDialogClose = (open: boolean) => {
    setIsDeleteDialogOpen(open);
    if (!open) {
      setSelectedPrompt(null);
    }
  };

  return (
    <>
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
            whileTap={{ scale: 0.98 }} // Slight press effect on click
          >
            {/* ShadCN Card component wrapped with Framer Motion animations */}
            <Card className="relative flex flex-col h-full transition-shadow duration-200 hover:shadow-md">
              {/* Action Buttons - Icon only, positioned in top right */}
              <div className="absolute top-2 right-2 flex gap-1">
                {/* Update Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click events
                    handleUpdateClick(prompt);
                  }}
                  className="h-8 w-8"
                >
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Update prompt</span>
                </Button>

                {/* Delete Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click events
                    handleDeleteClick(prompt);
                  }}
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete prompt</span>
                </Button>
              </div>

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

      {/* Update Prompt Dialog */}
      <UpdatePromptDialog
        open={isUpdateDialogOpen}
        onOpenChange={handleUpdateDialogClose}
        prompt={selectedPrompt}
      />

      {/* Delete Prompt Dialog */}
      <DeletePromptDialog
        open={isDeleteDialogOpen}
        onOpenChange={handleDeleteDialogClose}
        prompt={selectedPrompt}
      />
    </>
  );
};

