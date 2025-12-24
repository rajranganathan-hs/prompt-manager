"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Animation variants for the loading container (grid).
 * Defines how the skeleton cards animate in with a stagger effect.
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger each skeleton card animation by 0.1 seconds
    },
  },
};

/**
 * Animation variants for individual skeleton cards.
 * Each skeleton card will fade in smoothly.
 */
const skeletonCardVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
};

/**
 * Number of skeleton cards to display while loading.
 * Matches a typical grid layout (9 cards for 3x3 grid).
 */
const SKELETON_COUNT = 9;

/**
 * PromptsLoading component that displays skeleton cards while prompts are being loaded.
 * Uses ShadCN Card and Skeleton components with Framer Motion animations.
 * The skeleton layout matches the actual prompts grid layout for a smooth transition.
 */
export const PromptsLoading = () => {
  return (
    <motion.div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <motion.div
          key={index}
          variants={skeletonCardVariants}
        >
          {/* ShadCN Card component with skeleton placeholders */}
          <Card className="flex flex-col h-full">
            {/* Card Header with skeleton title and description */}
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-3/4" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-4 w-1/2 mt-2" />
              </CardDescription>
            </CardHeader>

            {/* Card Content with skeleton text lines */}
            <CardContent className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

