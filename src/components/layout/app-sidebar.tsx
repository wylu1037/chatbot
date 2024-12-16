"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  PlusIcon,
  MoreHorizontal,
  Share2,
  Pencil,
  Archive,
  Trash2,
} from "lucide-react";
import { SidebarUserNav } from "./sidebar-user-nav";
import { UserNavProps } from "@/lib/schemas/user-nav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
  },
  {
    title: "Inbox",
    url: "#",
  },
  {
    title: "Calendar",
    url: "#",
  },
  {
    title: "Search",
    url: "#",
  },
  {
    title: "Settings",
    url: "#",
  },
];

const messages = [
  {
    id: "c2235db6-8a9b-4c15-8a7c-a85a020bd1fe",
    group: "Today",
    items: [
      {
        title: "Cursor AI",
        url: "#",
      },
      {
        title: "Sora Model",
        url: "#",
      },
    ],
  },
  {
    id: "097fbdea-b172-46ef-8bad-f21e137c2e13",
    group: "Yesterday",
    items: [
      {
        title: "Postman",
        url: "#",
      },
      {
        title: "What is Kubernetes?",
        url: "#",
      },
    ],
  },
  {
    id: "0c51a913-b234-4013-82da-41f961ae10d9",
    group: "Last Week",
    items: [
      {
        title: "Hooks in React",
        url: "#",
      },
      {
        title: "How to use app routing in Nextjs framework",
        url: "#",
      },
    ],
  },
  {
    id: "101f2512-d403-4b66-ad27-6d50ab7c971c",
    group: "Last Month",
    items: [
      {
        title: "Designing a Web App",
        url: "#",
      },
    ],
  },
  {
    id: "3d04899c-512c-40a9-acd5-35a59591f428",
    group: "Last Year",
    items: [
      {
        title: "Rust macros",
        url: "#",
      },
    ],
  },
];

export function AppSidebar({ userNav }: { userNav: UserNavProps }) {
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center justify-between p-4">
        <h2 className="text-lg font-medium text-foreground">Chatbot</h2>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              type="button"
              className="h-fit p-2"
              onClick={() => {
                console.log("New chat");
              }}
            >
              <PlusIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent align="end" className="text-sm">
            New Chat
          </TooltipContent>
        </Tooltip>
      </SidebarHeader>
      <SidebarContent>
        {messages.map((message) => (
          <SidebarGroup key={message.group}>
            <SidebarGroupLabel>{message.group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {message.items.map((item) => (
                  <SidebarMenuItem key={item.title} className="group relative">
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <span className="max-w-[200px] overflow-clip">
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                    {/* Actions */}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 transition-opacity hover:opacity-100">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="rounded-md p-1 hover:bg-accent">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          className="w-[120px]"
                        >
                          <DropdownMenuItem>
                            <Share2 className="mr-2 h-4 w-4" />
                            <span>Share</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Rename</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Archive className="mr-2 h-4 w-4" />
                            <span>Archive</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarUserNav userNav={userNav} />
      </SidebarFooter>
    </Sidebar>
  );
}
