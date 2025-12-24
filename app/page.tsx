import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Landing page component with project name and call-to-action button.
 * Simple and clean design to welcome users to the Prompt Manager application.
 * Uses ShadCN Button component for the CTA.
 */
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <main className="flex flex-col items-center justify-center gap-8 px-4 text-center">
        {/* Project Name/Title */}
        <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
          Prompt Manager
        </h1>

        {/* Subtitle/Description */}
        <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Store and manage all your favorite prompts for easy usage. Organize,
          search, and access your prompts whenever you need them.
        </p>

        {/* Call-to-Action Button using ShadCN Button component */}
        <Button asChild size="lg" className="mt-4">
          <Link href="/prompts">Get Started</Link>
        </Button>
      </main>
    </div>
  );
}
