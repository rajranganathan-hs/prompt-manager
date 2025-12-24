"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { deletePrompt } from "@/actions/prompts-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * Type definition for a prompt object.
 * Matches the database schema structure.
 */
type Prompt = {
  id: number;
  name: string;
  description: string;
  content: string;
};

/**
 * Props for the DeletePromptDialog component.
 */
type DeletePromptDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prompt: Prompt | null;
};

/**
 * DeletePromptDialog component that allows users to delete a prompt.
 * Shows a confirmation dialog with the prompt name.
 * Shows a loading spinner when deleting and refreshes the page after successful deletion.
 */
export const DeletePromptDialog = ({
  open,
  onOpenChange,
  prompt,
}: DeletePromptDialogProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles the delete confirmation.
   * Calls the deletePrompt server action, shows loading state, and refreshes the page on success.
   */
  const handleDelete = async () => {
    if (!prompt) {
      setError("Prompt data is missing");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      // Call the server action to delete the prompt
      await deletePrompt(prompt.id);

      // Close dialog
      onOpenChange(false);

      // Refresh the page to remove the deleted prompt
      router.refresh();
    } catch (err) {
      // Handle errors
      setError(err instanceof Error ? err.message : "Failed to delete prompt");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles dialog close.
   * Resets the error state when the dialog is closed.
   */
  const handleClose = (open: boolean) => {
    if (!open) {
      setError(null);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Prompt</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{prompt?.name}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {/* Error Message */}
        {error && (
          <div className="text-sm text-destructive py-2">{error}</div>
        )}

        <DialogFooter>
          {/* Cancel Button */}
          <Button
            type="button"
            variant="outline"
            onClick={() => handleClose(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>

          {/* Delete Button with Loading Spinner */}
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

