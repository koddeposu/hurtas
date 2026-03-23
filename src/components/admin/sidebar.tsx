"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderTree,
  Package,
  Star,
  Building2,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { getUnreadCount } from "@/actions/contactActions";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Kategoriler",
    href: "/admin/categories",
    icon: FolderTree,
  },
  {
    title: "Ürünler",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Favoriler",
    href: "/admin/favorites",
    icon: Star,
  },
  {
    title: "Projeler",
    href: "/admin/projects",
    icon: Building2,
  },
  {
    title: "Blog",
    href: "/admin/blog",
    icon: FileText,
  },
  {
    title: "İletişim",
    href: "/admin/contacts",
    icon: MessageSquare,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    getUnreadCount()
      .then((count) => setUnreadCount(count))
      .catch(() => setUnreadCount(0));
  }, [pathname]);

  const handleLogout = async () => {
    await authClient.signOut();
    setIsMobileOpen(false);
    router.push("/admin/login");
  };

  const renderSidebarContent = (isMobile: boolean) => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b border-slate-200 px-6">
        {isMobile ? (
          <SheetClose asChild>
            <Link href="/admin" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
                CT
              </div>
              <span className="text-lg font-bold text-slate-900">Admin</span>
            </Link>
          </SheetClose>
        ) : (
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
              CT
            </div>
            <span className="text-lg font-bold text-slate-900">Admin</span>
          </Link>
        )}
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {menuItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          const showBadge = item.href === "/admin/contacts" && unreadCount > 0;
          const itemClassName = cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
            isActive
              ? "bg-primary text-white"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
          );

          const itemContent = (
            <>
              <item.icon className="h-5 w-5" />
              {item.title}
              {showBadge && (
                <span
                  className={cn(
                    "ml-auto flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-medium",
                    isActive ? "bg-white text-primary" : "bg-red-500 text-white",
                  )}
                >
                  {unreadCount}
                </span>
              )}
            </>
          );

          if (isMobile) {
            return (
              <SheetClose asChild key={item.href}>
                <Link href={item.href} className={itemClassName}>
                  {itemContent}
                </Link>
              </SheetClose>
            );
          }

          return (
            <Link key={item.href} href={item.href} className={itemClassName}>
              {itemContent}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-3">
        {isMobile ? (
          <SheetClose asChild>
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              <Settings className="h-5 w-5" />
              Siteyi Görüntüle
            </Link>
          </SheetClose>
        ) : (
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <Settings className="h-5 w-5" />
            Siteyi Görüntüle
          </Link>
        )}

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />
          Çıkış Yap
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-slate-200 bg-white lg:block">
        {renderSidebarContent(false)}
      </aside>

      <div className="fixed left-4 top-3 z-40 lg:hidden">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            aria-label="Menüyü aç"
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-[85vw] max-w-xs p-0">
            {renderSidebarContent(true)}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
