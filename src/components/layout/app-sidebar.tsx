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
import { PlusIcon } from "lucide-react";
import { SidebarUserNav } from "./sidebar-user-nav";
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
        title: "Ideas for Designing a Web App",
        url: "#",
      },
      {
        title: "How to Use ChatGPT for Productivity",
        url: "#",
      },
    ],
  },
  {
    id: "097fbdea-b172-46ef-8bad-f21e137c2e13",
    group: "Yesterday",
    items: [
      {
        title: "Ideas for Designing a Web App",
        url: "#",
      },
      {
        title: "How to Use ChatGPT for Productivity",
        url: "#",
      },
    ],
  },
  {
    id: "0c51a913-b234-4013-82da-41f961ae10d9",
    group: "Last Week",
    items: [
      {
        title: "Ideas for Designing a Web App",
        url: "#",
      },
      {
        title: "How to Use ChatGPT for Productivity",
        url: "#",
      },
    ],
  },
  {
    id: "101f2512-d403-4b66-ad27-6d50ab7c971c",
    group: "Last Month",
    items: [
      {
        title: "Ideas for Designing a Web App",
        url: "#",
      },
    ],
  },
  {
    id: "3d04899c-512c-40a9-acd5-35a59591f428",
    group: "Last Year",
    items: [
      {
        title: "Ideas for Designing a Web App",
        url: "#",
      },
    ],
  },
];

export function AppSidebar() {
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
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarUserNav
          user={{
            name: "John Doe",
            email: "john.doe@example.com",
            image: "/images/avatar.png",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
