import { PromptsGrid } from "./_components/prompts-grid";
import { PageHeader } from "./_components/page-header";

/**
 * Mock data for prompts.
 * This will be replaced with actual database queries later.
 * The structure matches the database schema: name, description, and content.
 */
const mockPrompts = [
  {
    id: 1,
    name: "Code Explainer",
    description: "Explains code in simple terms",
    content:
      "Please explain this code in simple terms, as if you're teaching a beginner programmer:",
  },
  {
    id: 2,
    name: "Bug Finder",
    description: "Helps identify bugs in code",
    content:
      "Review this code and identify potential bugs, performance issues, or security vulnerabilities:",
  },
  {
    id: 3,
    name: "Feature Planner",
    description: "Helps plan new features",
    content:
      "Help me plan the implementation of this feature. Consider edge cases, potential challenges, and best practices:",
  },
  {
    id: 4,
    name: "SQL Query Helper",
    description: "Assists with SQL queries",
    content:
      "Help me write an efficient SQL query to accomplish the following task:",
  },
  {
    id: 5,
    name: "API Documentation",
    description: "Generates API documentation",
    content:
      "Generate clear and comprehensive documentation for this API endpoint, including parameters, responses, and examples:",
  },
  {
    id: 6,
    name: "Code Refactorer",
    description: "Suggests code improvements",
    content:
      "Review this code and suggest improvements for better readability, maintainability, and performance:",
  },
  {
    id: 7,
    name: "Test Case Generator",
    description: "Creates test cases",
    content:
      "Generate comprehensive test cases for this function, including edge cases and error scenarios:",
  },
  {
    id: 8,
    name: "UI/UX Reviewer",
    description: "Reviews UI/UX design",
    content:
      "Review this UI design and provide feedback on usability, accessibility, and user experience:",
  },
  {
    id: 9,
    name: "Git Command Helper",
    description: "Helps with Git commands",
    content:
      "What Git commands should I use to accomplish the following task:",
  },
];

/**
 * Prompts page component.
 * Displays all available prompts in a responsive grid layout.
 * Currently uses mock data, but will be updated to fetch from the database.
 */
export default function PromptsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Page Header with animations */}
        <PageHeader />

        {/* Prompts Grid with animations */}
        <PromptsGrid prompts={mockPrompts} />
      </div>
    </div>
  );
}

