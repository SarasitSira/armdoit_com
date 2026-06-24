import { updateBlog } from "@/actions/blog";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const post = await prisma.blog.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!post) notFound();

  const updateAction = updateBlog.bind(null, post.id);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/blog" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-mono text-sm tracking-widest">
          <ArrowLeft className="w-4 h-4" />
          [BACK TO LOGS]
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-2">Edit Engineering Log</h1>
        <p className="text-muted-foreground font-mono text-sm">Update your blog post.</p>
      </div>

      <form action={updateAction} className="space-y-6 max-w-2xl bg-card p-6 border border-border rounded-lg">
        <div className="space-y-2">
          <label htmlFor="title" className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Title</label>
          <input type="text" id="title" name="title" defaultValue={post.title} required className="w-full p-3 bg-background border border-border rounded-md font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Category</label>
          <input type="text" id="category" name="category" defaultValue={post.category} required className="w-full p-3 bg-background border border-border rounded-md font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Content (Markdown)</label>
          <textarea id="content" name="content" defaultValue={post.content} required rows={12} className="w-full p-3 bg-background border border-border rounded-md font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-y" />
        </div>

        <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-md font-mono text-sm tracking-widest font-bold hover:opacity-90 transition-opacity">
          [UPDATE LOG]
        </button>
      </form>
    </div>
  );
}
