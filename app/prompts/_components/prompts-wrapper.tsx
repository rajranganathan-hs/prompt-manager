"use client";

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
 * PromptsWrapper component that wraps the PromptsGrid.
 * Removed wrapper animations to prevent flicker - the grid component handles its own animations.
 */
export const PromptsWrapper = ({ prompts }: PromptsWrapperProps) => {
  return <PromptsGrid prompts={prompts} />;
};

