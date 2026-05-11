import { getBlogPosts } from "@/actions/blogActions";
import {
  getContactSubmissions,
  getUnreadCount,
} from "@/actions/contactActions";
import { getProducts } from "@/actions/productActions";
import { getProjects } from "@/actions/projectActions";
import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard";
import { AdminHeader } from "@/components/admin/header";
import { AdminSidebar } from "@/components/admin/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAuth } from "@/lib/requireAuth";
import { Building2, FileText, MessageSquare, Package } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await requireAuth();

  // Fetch stats
  const [products, projects, blogPosts, contacts, unreadCount] =
    await Promise.all([
      getProducts(),
      getProjects(),
      getBlogPosts(),
      getContactSubmissions(),
      getUnreadCount(),
    ]);

  const stats = [
    {
      title: "Toplam Ürün",
      value: products.length,
      icon: Package,
      href: "/admin/products",
      color: "bg-blue-500",
    },
    {
      title: "Projeler",
      value: projects.length,
      icon: Building2,
      href: "/admin/projects",
      color: "bg-green-500",
    },
    {
      title: "Blog Yazıları",
      value: blogPosts.length,
      icon: FileText,
      href: "/admin/blog",
      color: "bg-purple-500",
    },
    {
      title: "İletişim Mesajları",
      value: contacts.length,
      badge: unreadCount > 0 ? unreadCount : undefined,
      icon: MessageSquare,
      href: "/admin/contacts",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 lg:ml-64">
        <AdminHeader
          title="Dashboard"
          description="Yönetim Paneli"
          userName={session.user.name}
        />

        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <Link key={stat.title} href={stat.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-lg ${stat.color}`}>
                      <stat.icon className="h-4 w-4 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-slate-900">
                        {stat.value}
                      </span>
                      {stat.badge && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-600 rounded-full">
                          {stat.badge} yeni
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Analytics Dashboard - YENİ EKLEME */}
          <div className="mb-8">
            <AnalyticsDashboard />
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Hızlı İşlemler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link
                  href="/admin/products/new"
                  className="flex flex-col items-center justify-center p-4 rounded-lg border border-dashed border-slate-300 hover:border-[#49202d] hover:bg-slate-50 transition-colors"
                >
                  <Package className="h-8 w-8 text-slate-400 mb-2" />
                  <span className="text-sm font-medium text-slate-600">
                    Yeni Ürün
                  </span>
                </Link>
                <Link
                  href="/admin/projects/new"
                  className="flex flex-col items-center justify-center p-4 rounded-lg border border-dashed border-slate-300 hover:border-[#49202d] hover:bg-slate-50 transition-colors"
                >
                  <Building2 className="h-8 w-8 text-slate-400 mb-2" />
                  <span className="text-sm font-medium text-slate-600">
                    Yeni Proje
                  </span>
                </Link>
                <Link
                  href="/admin/blog/new"
                  className="flex flex-col items-center justify-center p-4 rounded-lg border border-dashed border-slate-300 hover:border-[#49202d] hover:bg-slate-50 transition-colors"
                >
                  <FileText className="h-8 w-8 text-slate-400 mb-2" />
                  <span className="text-sm font-medium text-slate-600">
                    Yeni Blog Yazısı
                  </span>
                </Link>
                <Link
                  href="/admin/contacts"
                  className="flex flex-col items-center justify-center p-4 rounded-lg border border-dashed border-slate-300 hover:border-[#49202d] hover:bg-slate-50 transition-colors"
                >
                  <MessageSquare className="h-8 w-8 text-slate-400 mb-2" />
                  <span className="text-sm font-medium text-slate-600">
                    Mesajları Gör
                  </span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
