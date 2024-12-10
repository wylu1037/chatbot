"use client";

import { SparklesIcon, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Chat() {
  const handleGenerate = () => {
    console.log("Generate clicked");
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4">
      {/* Title Section */}
      <div className="mb-8 flex flex-col items-center space-y-2 text-center">
        <h1 className="text-5xl font-bold tracking-tighter text-foreground/85">
          Make your first{" "}
          <span className="mx-1 inline-flex items-center">
            <div
              className={cn(
                "flex items-center",
                "origin-bottom-left -rotate-6",
              )}
            >
              AI
              <SparklesIcon className="ml-1 h-8 w-8" />
            </div>
          </span>{" "}
          request
        </h1>
        <h2 className="text-4xl font-semibold text-foreground/85">
          Speed up <span className="text-orange-500">your frontend</span>
        </h2>
      </div>

      {/* Description Text */}
      <p className="mb-8 max-w-[600px] text-center text-muted-foreground/50">
        Ask for a component or upload an image, and instantly receive
        ready-to-use code without lifting a finger.
      </p>

      {/* Input and Button Section */}
      <div className="flex w-full max-w-[600px] items-center">
        <div className="relative flex-1">
          <Paperclip
            className={cn(
              "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50",
              "hover:text-muted-foreground",
            )}
          />
          <input
            type="text"
            placeholder="A profile card with a centralized avatar at the top"
            className={cn(
              "h-11 w-full rounded-lg border bg-background px-10 py-2",
              "focus:outline-none",
              "placeholder:text-muted-foreground/50",
              "rounded-r-none border-r-0",
            )}
          />
        </div>
        <Button
          onClick={handleGenerate}
          className={cn(
            "h-11 bg-orange-500 hover:bg-orange-600",
            "rounded-l-none",
          )}
        >
          <SparklesIcon className={cn("mr-2 h-4 w-4")} />
          Generate
        </Button>
      </div>
    </div>
  );
}
