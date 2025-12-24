import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Header component that provides navigation for the application.
 * Contains links to Home and Prompt pages using ShadCN Button components.
 */
export const Header = () => {
  return (
    <header className="border-b bg-background">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Project Name */}
          <Button variant="ghost" asChild className="text-xl font-semibold">
            <Link href="/">Prompt Manager</Link>
          </Button>

          {/* Navigation Links using ShadCN Button components */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/prompts">Prompts</Link>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

