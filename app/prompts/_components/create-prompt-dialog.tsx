"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { createPrompt } from "@/actions/prompts-actions";
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
 * Props for the CreatePromptDialog component.
 */
type CreatePromptDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * CreatePromptDialog component that allows users to create a new prompt.
 * Contains a form with fields for title (name), description, and content.
 * Shows a loading spinner when submitting and refreshes the page after successful creation.
 */
export const CreatePromptDialog = ({
  open,
  onOpenChange,
}: CreatePromptDialogProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    content: "",
  });
  const [error, setError] = useState<string | null>(null);

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
   * Validates the form, calls the createPrompt server action,
   * shows loading state, and refreshes the page on success.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate form fields
    if (!formData.name.trim() || !formData.description.trim() || !formData.content.trim()) {
      setError("All fields are required");
      return;
    }

    setIsLoading(true);

    try {
      // Call the server action to create the prompt
      await createPrompt({
        name: formData.name.trim(),
        description: formData.description.trim(),
        content: formData.content.trim(),
      });

      // Reset form and close dialog
      setFormData({ name: "", description: "", content: "" });
      onOpenChange(false);

      // Refresh the page to show the new prompt
      router.refresh();
    } catch (err) {
      // Handle errors
      setError(err instanceof Error ? err.message : "Failed to create prompt");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles dialog close.
   * Resets the form and error state when the dialog is closed.
   */
  const handleClose = (open: boolean) => {
    if (!open) {
      setFormData({ name: "", description: "", content: "" });
      setError(null);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Prompt</DialogTitle>
          <DialogDescription>
            Add a new prompt to your collection. Fill in all the fields below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Title/Name Field */}
            <div className="grid gap-2">
              <Label htmlFor="name">Title</Label>
              <Input
                id="name"
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
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
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
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
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

            {/* Create Button with Loading Spinner */}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

