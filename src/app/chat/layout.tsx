import { auth } from "@/server/auth";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ChatHeader } from "@/components/chat/chat-header";
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

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <main className="min-h-screen flex-1">
        <ChatHeader chatId="" selectedModelId="" />
        {children}
      </main>
    </SidebarProvider>
  );
}
