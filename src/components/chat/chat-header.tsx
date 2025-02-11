"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lock, Globe, PlusIcon } from "lucide-react";
import { memo, useState } from "react";
import { Model, models, DEFAULT_MODEL_NAME } from "@/lib/ai/models";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import { useWindowSize } from "usehooks-ts";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Button } from "../ui/button";

function PureChatHeader({
  chatId,
  selectedModelId,
}: {
  chatId: string;
  selectedModelId: string;
}) {
  const { open } = useSidebar();
  const { width: windowWidth } = useWindowSize();

  return (
    <header className="mt-4 flex w-full items-center gap-2 pl-1">
      <SidebarTrigger />

      {(!open || windowWidth < 768) && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              <PlusIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent align="center" className="mt-2 text-sm">
            <Button>New chat</Button>
          </TooltipContent>
        </Tooltip>
      )}

      <ModelSelector />
      <VisibilitySelector />
    </header>
  );
}

const ModelSelector = () => {
  const [selectedModel, setSelectedModel] =
    useState<string>(DEFAULT_MODEL_NAME);

  return (
    <Select value={selectedModel} onValueChange={setSelectedModel}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Select model">
          {models.find((m) => m.id === selectedModel)?.label}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {models.map((model: Model) => (
          <SelectItem key={model.id} value={model.id} className="py-3">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">{model.label}</span>
                {model.id === selectedModel}
              </div>
              <span className="text-sm text-muted-foreground">
                {model.description}
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const VisibilitySelector = () => {
  return (
    <Select defaultValue="private">
      <SelectTrigger className="w-[120px]">
        <SelectValue defaultValue="private" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="private">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span>Private</span>
          </div>
        </SelectItem>
        <SelectItem value="public">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>Public</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export { ModelSelector, VisibilitySelector };

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return prevProps.selectedModelId === nextProps.selectedModelId;
});
