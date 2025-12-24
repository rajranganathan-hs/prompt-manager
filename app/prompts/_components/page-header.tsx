"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreatePromptDialog } from "./create-prompt-dialog";

/**
 * PageHeader component.
 * Displays the page title, description, and a create button.
 * The create button opens a dialog to add new prompts.
 * Rendered without animations to prevent flicker on page navigation.
 * Uses a fixed height structure to prevent layout shifts during re-renders.
 */
export const PageHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div className="mb-8 flex items-start justify-between gap-4 min-h-[80px]">
        <div className="flex-1">
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
      </div>

      {/* Create Prompt Dialog */}
      <CreatePromptDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
};

