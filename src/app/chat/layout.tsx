import { auth } from "@/server/auth";
import { UserNavSchema } from "@/lib/schemas/user-nav";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  ModelSelector,
  VisibilitySelector,
} from "@/components/chat/chat-header";
import { redirect } from "next/navigation";
export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/signin");
  }

  const userNav = UserNavSchema.parse({
    name: user?.name ?? "Unknown",
    email: user?.email ?? "unknown@example.com",
    image: user?.image ?? "",
  });

  return (
    <SidebarProvider>
      <AppSidebar userNav={userNav} />
      <main className="min-h-screen flex-1">
        <div className="mt-2 flex w-full flex-row items-center gap-2 pl-1">
          <SidebarTrigger />
          <ModelSelector />
          <VisibilitySelector />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
