"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { updatePrompt } from "@/actions/prompts-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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
 * Props for the UpdatePromptDialog component.
 */
type UpdatePromptDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prompt: Prompt | null;
};

/**
 * UpdatePromptDialog component that allows users to update an existing prompt.
 * Contains a form with fields for title (name), description, and content.
 * Pre-populates the form with existing prompt data.
 * Shows a loading spinner when submitting and refreshes the page after successful update.
 */
export const UpdatePromptDialog = ({
  open,
  onOpenChange,
  prompt,
}: UpdatePromptDialogProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    content: "",
  });
  const [error, setError] = useState<string | null>(null);

  /**
   * Effect to populate form data when prompt changes or dialog opens.
   * This ensures the form is pre-filled with existing prompt data.
   */
  useEffect(() => {
    if (prompt && open) {
      setFormData({
        name: prompt.name,
        description: prompt.description,
        content: prompt.content,
      });
      setError(null);
    }
  }, [prompt, open]);

  /**
   * Handles form input changes.
   * Updates the formData state when any input field changes.
   */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  /**
   * Handles form submission.
   * Validates the form, calls the updatePrompt server action,
   * shows loading state, and refreshes the page on success.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!prompt) {
      setError("Prompt data is missing");
      return;
    }

    // Validate form fields
    if (!formData.name.trim() || !formData.description.trim() || !formData.content.trim()) {
      setError("All fields are required");
      return;
    }

    setIsLoading(true);

    try {
      // Call the server action to update the prompt
      await updatePrompt({
        id: prompt.id,
        name: formData.name.trim(),
        description: formData.description.trim(),
        content: formData.content.trim(),
      });

      // Close dialog
      onOpenChange(false);

      // Refresh the page to show the updated prompt
      router.refresh();
    } catch (err) {
      // Handle errors
      setError(err instanceof Error ? err.message : "Failed to update prompt");
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Prompt</DialogTitle>
          <DialogDescription>
            Modify the prompt details below. All fields are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Title/Name Field */}
            <div className="grid gap-2">
              <Label htmlFor="update-name">Title</Label>
              <Input
                id="update-name"
                name="name"
                placeholder="e.g., Code Explainer"
                value={formData.name}
                onChange={handleInputChange}
                disabled={isLoading}
                required
              />
            </div>

            {/* Description Field */}
            <div className="grid gap-2">
              <Label htmlFor="update-description">Description</Label>
              <Input
                id="update-description"
                name="description"
                placeholder="e.g., Explains code in simple terms"
                value={formData.description}
                onChange={handleInputChange}
                disabled={isLoading}
                required
              />
            </div>

            {/* Content Field */}
            <div className="grid gap-2">
              <Label htmlFor="update-content">Content</Label>
              <Textarea
                id="update-content"
                name="content"
                placeholder="Enter your prompt content here..."
                value={formData.content}
                onChange={handleInputChange}
                disabled={isLoading}
                rows={5}
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-sm text-destructive">{error}</div>
            )}
          </div>

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

            {/* Update Button with Loading Spinner */}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

