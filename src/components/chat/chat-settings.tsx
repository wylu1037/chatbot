"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lock } from "lucide-react";
import { useState } from "react";
import { Model, models, DEFAULT_MODEL_NAME } from "@/lib/ai/models";

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
        <Lock className="mr-2 h-4 w-4" />
        <SelectValue defaultValue="private" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="private">Private</SelectItem>
        <SelectItem value="public">Public</SelectItem>
      </SelectContent>
    </Select>
  );
};

export { ModelSelector, VisibilitySelector };
