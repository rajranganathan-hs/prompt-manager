import { Suspense } from "react";
import { getPrompts } from "@/actions/prompts-actions";
import { PageHeader } from "./_components/page-header";
import { PromptsLoading } from "./_components/prompts-loading";
import { PromptsWrapper } from "./_components/prompts-wrapper";

/**
 * Force dynamic rendering to prevent caching.
 * This ensures fresh data is fetched from the database on every page visit.
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * PromptsContent component that fetches and displays prompts.
 * This is separated so we can wrap it with Suspense for loading states.
 * Returns null initially to trigger the loading state, then passes data to the wrapper.
 */
async function PromptsContent() {
  // Fetch prompts from the database using the server action
  // This runs on the server, so no client-side API calls needed
  // With force-dynamic, this will always fetch fresh data
  const prompts = await getPrompts();

  return <PromptsWrapper prompts={prompts} />;
}

/**
 * Prompts page component.
 * Displays all available prompts in a responsive grid layout.
 * Uses Suspense to show a loading state while prompts are being fetched from the database.
 * The loading component matches the grid layout for a smooth transition.
 * Configured to force dynamic rendering to always fetch fresh data from the database.
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

