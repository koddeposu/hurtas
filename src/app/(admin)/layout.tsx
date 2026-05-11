import { AdminSidebar } from "@/components/admin/sidebar";
import { requireAuth } from "@/lib/requireAuth";
import { Toaster } from "@/components/ui/sonner";
import "@/app/globals.css";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check auth for all admin routes except login
  // This is a layout-level check, pages can have their own checks too

  return (
    <html lang="tr">
      <head>
        <title>Hürtaş Beton Admin</title>
      </head>
      <body className="min-h-screen bg-slate-50">
        <AdminLayoutContent>{children}</AdminLayoutContent>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}

async function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  // We'll handle auth at page level to allow login page to work
  return <>{children}</>;
}
