import { Suspense } from "react";
import { getPrompts } from "@/actions/prompts-actions";
import { PromptsGrid } from "./_components/prompts-grid";
import { PageHeader } from "./_components/page-header";
import { PromptsLoading } from "./_components/prompts-loading";

/**
 * PromptsContent component that fetches and displays prompts.
 * This is separated so we can wrap it with Suspense for loading states.
 */
async function PromptsContent() {
  // Fetch prompts from the database using the server action
  // This runs on the server, so no client-side API calls needed
  const prompts = await getPrompts();

  return <PromptsGrid prompts={prompts} />;
}

/**
 * Prompts page component.
 * Displays all available prompts in a responsive grid layout.
 * Uses Suspense to show a loading state while prompts are being fetched from the database.
 * The loading component matches the grid layout for a smooth transition.
 */
export default function PromptsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Page Header with animations */}
        <PageHeader />

        {/* Prompts Grid with Suspense for loading state */}
        {/* The PromptsLoading component will show while data is being fetched */}
        <Suspense fallback={<PromptsLoading />}>
          <PromptsContent />
        </Suspense>
      </div>
    </div>
  );
}

