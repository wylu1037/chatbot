import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { SparklesIcon } from "lucide-react";

// This is a message that is displayed when the AI is thinking
export const ThinkingMessage = () => {
  const role = "assistant";
  return (
    <motion.div
      className="group/message mx-auto w-full max-w-3xl px-4"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 1 } }}
      data-role={role}
    >
      <div
        className={cn(
          "flex w-full gap-4 rounded-xl group-data-[role=user]/message:ml-auto group-data-[role=user]/message:w-fit group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:px-3 group-data-[role=user]/message:py-2",
          {
            "group-data-[role=user]/message:bg-muted": true,
          },
        )}
      >
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full ring-1 ring-border">
          <SparklesIcon size={14} />
        </div>
        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-col gap-4 text-muted-foreground">
            Thinking...
          </div>
        </div>
      </div>
    </motion.div>
  );
};
