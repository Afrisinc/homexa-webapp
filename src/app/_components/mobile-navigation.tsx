"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { NAV_LINKS } from "@/utils/constants";
import { twConfig } from "@/lib/utils";
import { Menu, LayoutDashboard, LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > parseInt(twConfig.theme.screens.md)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.push("/");
  };

  return (
    <>
      <Button
        className="inline-flex p-2 md:hidden"
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="w-[300px] sm:w-[350px]">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

          <div className="flex h-full flex-col">
            {/* User Info */}
            {isAuthenticated && user ? (
              <div className="mb-6 flex items-center gap-3 rounded-lg bg-secondary/50 p-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col overflow-hidden">
                  <p className="truncate font-semibold">{user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mb-6">
                <Button asChild className="w-full">
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            )}

            <div className="mb-6 h-px bg-border" />

            {/* Navigation Links */}
            <nav className="flex flex-1 flex-col gap-2">
              {NAV_LINKS.map(({ href, title }) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-secondary"
                >
                  {title}
                </Link>
              ))}

              {/* Seller Dashboard Link */}
              {isAuthenticated && user?.role === "seller" && (
                <>
                  <div className="my-2 h-px bg-border" />
                  <Link
                    href="/seller"
                    className="flex items-center gap-2 rounded-md bg-primary/10 px-3 py-2 text-base font-medium text-primary transition-colors hover:bg-primary/20"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Seller Dashboard
                  </Link>
                </>
              )}
            </nav>

            {/* Logout Button */}
            {isAuthenticated && (
              <>
                <div className="my-4 h-px bg-border" />
                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
