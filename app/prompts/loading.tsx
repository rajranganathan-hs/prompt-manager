import { PageHeader } from "./_components/page-header";
import { PromptsLoading } from "./_components/prompts-loading";

/**
 * Loading component for the prompts page.
 * This file is automatically used by Next.js as the loading state
 * when the prompts page is being loaded (including on page refresh).
 * Uses the same layout structure as the main page for consistency.
 */
export default function Loading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Page Header with animations */}
        <PageHeader />

        {/* Loading skeleton grid */}
        <PromptsLoading />
      </div>
    </div>
  );
}

