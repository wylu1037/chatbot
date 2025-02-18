"use client";

import type { User } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users2,
  BookOpen,
  Settings,
  Monitor,
  Crown,
  LogOut,
  Share,
  Moon,
  Sun,
} from "lucide-react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export function SidebarUserNav({ user }: { user: User }) {
  const router = useRouter();
  const initials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() ?? "User";

  const handleLogout = async () => {
    // Handle logout logic
    try {
      const res = await signOut();
      console.log(res);
      router.push("/signin");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex w-full items-center rounded-lg p-4 transition-colors hover:bg-accent">
          <div className="relative mr-2 h-8 w-8 overflow-hidden rounded-full">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name ?? "User avatar"}
                fill
                sizes="32px"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                {initials}
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col text-left">
            <p className="text-sm font-medium">{user.name ?? "Guest"}</p>
            <p className="text-xs text-muted-foreground">
              {user.email ?? "Not logged in"}
            </p>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-between px-2 py-1.5">
          <span className="text-sm font-medium">My Account</span>
          <button className="rounded p-1 hover:bg-accent">
            <Share className="h-4 w-4" />
          </button>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Users2 className="mr-2 h-4 w-4" />
          <span>My GPTs</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <BookOpen className="mr-2 h-4 w-4" />
          <span>Customize ChatGPT</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <ThemeToggleDropdownMenuItem />
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Monitor className="mr-2 h-4 w-4" />
          <span>Download macOS app</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Crown className="mr-2 h-4 w-4" />
          <span>Upgrade Plan</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const ThemeToggleDropdownMenuItem = () => {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenuItem
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="mr-2 h-4 w-4" />
      ) : (
        <Moon className="mr-2 h-4 w-4" />
      )}
      <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
    </DropdownMenuItem>
  );
};
