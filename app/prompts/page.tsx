import { getPrompts } from "@/actions/prompts-actions";
import { PromptsGrid } from "./_components/prompts-grid";
import { PageHeader } from "./_components/page-header";

/**
 * Prompts page component.
 * Displays all available prompts in a responsive grid layout.
 * Fetches prompts from the database using the getPrompts server action.
 * This is a server component, so we can fetch data directly.
 */
export default async function PromptsPage() {
  // Fetch prompts from the database using the server action
  // This runs on the server, so no client-side API calls needed
  const prompts = await getPrompts();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Page Header with animations */}
        <PageHeader />

        {/* Prompts Grid with animations */}
        {/* Pass the fetched prompts to the grid component */}
        <PromptsGrid prompts={prompts} />
      </div>
    </div>
  );
}

