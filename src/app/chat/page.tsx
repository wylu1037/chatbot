"use client";

import Chat from "@/components/chat/chat";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { generateUUID } from "@/lib/utils";

export default function ChatPage() {
  const chatId = generateUUID();

  return (
    <div className="relative">
      <Chat chatId={chatId} />
      <CardSkeletonDecoration />
    </div>
  );
}

const CardSkeletonDecoration = () => {
  return (
    <div className="absolute left-1/2 top-1/2 -z-50 mx-auto w-full max-w-xl -translate-x-1/2 -translate-y-[190px]">
      <motion.div
        className="absolute -top-4 w-full"
        initial={{ scale: 1.03 }}
        animate={{ scale: 0.97 }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 0.5,
        }}
      >
        <CardSkeleton className="max-w-xl scale-[0.97]" />
      </motion.div>

      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 0.5,
        }}
      >
        <CardSkeleton className="max-w-xl" />
      </motion.div>
    </div>
  );
};

const CardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "relative flex max-w-lg space-x-4 rounded-lg border border-b-0 border-border/70 bg-background p-4",
        className,
      )}
    >
      <div className="size-20 animate-pulse rounded-lg bg-muted-foreground/5" />
      <div className="flex flex-1 flex-col space-y-3">
        <div className="h-7 w-full animate-pulse rounded-md bg-muted-foreground/5" />
        <div className="h-10 w-3/4 animate-pulse rounded-lg bg-muted-foreground/5" />
      </div>
    </div>
  );
};
