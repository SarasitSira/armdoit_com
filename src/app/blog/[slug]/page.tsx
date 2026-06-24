import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Generate metadata dynamically
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await prisma.blog.findUnique({ where: { slug: resolvedParams.slug } });
  if (!post) return { title: "Post Not Found" };
  
  return {
    title: `${post.title} | Engineering Log`,
    description: post.content.substring(0, 160) + "...",
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await prisma.blog.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="container max-w-screen-md px-4 md:px-8 mx-auto py-16 space-y-12">
      <div className="flex items-center gap-4">
        <Link href="/blog" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-mono text-sm tracking-widest">
          <ArrowLeft className="w-4 h-4" />
          [BACK TO LOGS]
        </Link>
      </div>

      <article className="space-y-8">
        <header className="space-y-4 border-b border-border pb-8">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-muted-foreground">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
            <span className="font-mono text-xs text-primary uppercase bg-primary/10 px-2 py-1">
              [{post.category}]
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{post.title}</h1>
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary/80 prose-code:font-mono prose-code:text-sm prose-pre:p-0 prose-pre:bg-transparent">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
