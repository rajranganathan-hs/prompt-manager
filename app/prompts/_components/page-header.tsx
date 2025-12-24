"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreatePromptDialog } from "./create-prompt-dialog";

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
 * Displays the page title, description, and a create button.
 * The create button opens a dialog to add new prompts.
 */
export const PageHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <motion.div
        className="mb-8 flex items-start justify-between gap-4"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Prompts</h1>
          <p className="text-muted-foreground">
            Browse and manage all your favorite prompts
          </p>
        </div>

        {/* Create Button */}
        <Button onClick={() => setIsDialogOpen(true)} className="shrink-0">
          <Plus className="mr-2 h-4 w-4" />
          Create
        </Button>
      </motion.div>

      {/* Create Prompt Dialog */}
      <CreatePromptDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
};

