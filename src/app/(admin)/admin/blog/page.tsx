import { requireAuth } from "@/lib/requireAuth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { getBlogPosts } from "@/actions/blogActions";
import { BlogClient } from "./blog-client";

export default async function BlogPage() {
  const session = await requireAuth();
  const posts = await getBlogPosts();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 lg:ml-64">
        <AdminHeader
          title="Blog"
          description="Blog yazılarını yönetin"
          userName={session.user.name}
        />

        <main className="p-6">
          <BlogClient posts={posts} />
        </main>
      </div>
    </div>
  );
}

