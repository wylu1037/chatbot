"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
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

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <main className="min-h-screen flex-1">
              <div className="mt-2 flex w-full flex-row items-center gap-2 pl-1">
                <SidebarTrigger />
                <ModelSelector />
                <VisibilitySelector />
              </div>
              {children}
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </SessionProvider>
    </QueryClientProvider>
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

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}