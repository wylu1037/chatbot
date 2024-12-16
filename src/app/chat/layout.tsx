import { auth } from "@/server/auth";
import { UserNavSchema } from "@/lib/schemas/user-nav";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import { ChatHeader } from "@/components/chat/chat-header";

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
        <ChatHeader chatId="" selectedModelId="" />
        {children}
      </main>
    </SidebarProvider>
  );
}
