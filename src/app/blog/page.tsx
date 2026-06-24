import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function BlogPage() {
  const posts = await prisma.blog.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container max-w-screen-xl px-4 md:px-8 mx-auto py-12 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold uppercase tracking-tight">Engineering Log</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Thoughts, tutorials, and deep-dives into my projects.
        </p>
      </div>

      <div className="max-w-3xl space-y-8">
        {posts.length === 0 ? (
          <p className="text-muted-foreground">No logs published yet. Check back soon!</p>
        ) : (
          posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block border border-border bg-card p-6 hover:border-primary transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-mono text-xs text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <span className="font-mono text-xs text-primary uppercase bg-primary/10 px-2 py-1">
                  [{post.category}]
                </span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors mb-2">
                {post.title}
              </h3>
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors mt-6">
                [READ_LOG] <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
