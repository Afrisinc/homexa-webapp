"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Settings,
  BarChart3,
  MessageSquare,
} from "lucide-react";

const navItems = [
  {
    title: "Overview",
    href: "/seller",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/seller/products",
    icon: Package,
  },
  {
    title: "Analytics",
    href: "/seller/analytics",
    icon: BarChart3,
  },
  {
    title: "Messages",
    href: "/seller/messages",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/seller/settings",
    icon: Settings,
  },
];

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isInitialized } = useAuthStore();

  useEffect(() => {
    if (!isInitialized) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (user?.role !== "seller") {
      router.push("/");
    }
  }, [isAuthenticated, isInitialized, user, router]);

  if (!isInitialized || !isAuthenticated || user?.role !== "seller") {
    return null;
  }

  return (
    <div className="min-h-screen bg-secondary/30 pb-20 lg:pb-0">
      <div className="container mx-auto px-4 py-4 lg:py-8">
        <div className="mb-4 lg:mb-6">
          <h2 className="text-xl font-bold lg:text-2xl">Seller Dashboard</h2>
          <p className="text-sm text-muted-foreground lg:text-base">
            Welcome back, {user.name}
          </p>
        </div>

        <div className="grid gap-4 lg:gap-6 lg:grid-cols-[240px_1fr]">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 rounded-lg border bg-card p-4">
              <SidebarNav items={navItems} />
            </div>
          </aside>

          {/* Main Content */}
          <main className="min-w-0">{children}</main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:hidden">
        <div className="grid h-16 grid-cols-5 items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/seller" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 px-2 py-2 transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium leading-none">
                  {item.title}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
