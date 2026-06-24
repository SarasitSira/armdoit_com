import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import { ProjectCard } from "@/components/project-card";
import { BlogCard } from "@/components/blog-card";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const projects = await prisma.project.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const posts = await prisma.blog.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="container max-w-screen-2xl px-4 md:px-8 mx-auto py-24 md:py-32 flex flex-col md:flex-row gap-12 md:items-center">
        <div className="flex-1 space-y-6">
          <FadeIn delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase max-w-3xl leading-[1.1]">
              Engineering precision systems at the intersection of form & function
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-xl">
              A seasoned Mechanical Engineer dedicated to building robust physical products through precision design, advanced mechanics, and innovative manufacturing.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex items-center gap-4 pt-4 font-mono text-sm font-bold tracking-widest">
              <Link href="/projects" className="px-6 py-3 bg-primary text-primary-foreground rounded-sm hover:opacity-90 transition-opacity">
                [VIEW PROJECTS]
              </Link>
              <Link href="/about" className="px-6 py-3 border border-border rounded-sm hover:bg-muted transition-colors">
                [LEARN MORE]
              </Link>
            </div>
          </FadeIn>
        </div>
        
        {/* Decorative Technical Element */}
        <div className="flex-1 relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg border border-border/50 -z-10 transform translate-x-4 translate-y-4"></div>
          <div className="bg-card border border-border rounded-lg p-6 font-mono text-sm leading-relaxed shadow-sm">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-border/50 uppercase tracking-widest text-xs text-muted-foreground">
              <span>[SYSTEM SCHEMATIC: M-01]</span>
              <span>REV: A</span>
            </div>
            <p className="text-muted-foreground">PART_NAME: <span className="text-foreground">Sarasit (Arm) Sirawattanakul</span></p>
            <p className="text-muted-foreground">CLASSIFICATION: <span className="text-foreground">MECHANICAL ENGINEER</span></p>
            
            <p className="text-muted-foreground pt-4 border-t border-border/30 mt-4 uppercase tracking-widest text-xs">CORE_COMPETENCIES:</p>
            <div className="pl-4 mt-2 space-y-1">
              <p className="text-foreground flex items-center"><span className="text-primary mr-2">+</span> CAD / SolidWorks</p>
              <p className="text-foreground flex items-center"><span className="text-primary mr-2">+</span> Finite Element Analysis (FEA)</p>
              <p className="text-foreground flex items-center"><span className="text-primary mr-2">+</span> Rapid Prototyping / 3D Printing</p>
              <p className="text-foreground flex items-center"><span className="text-primary mr-2">+</span> Manufacturing & Assembly</p>
            </div>
            
            <p className="text-muted-foreground pt-4 border-t border-border/30 mt-4 uppercase tracking-widest text-xs">TOLERANCE:</p>
            <p className="pl-4 text-green-600 dark:text-green-400 font-bold mt-1">± 0.005mm</p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="container max-w-screen-2xl px-4 md:px-8 mx-auto py-16 md:py-24 border-t border-border/40">
        <h2 className="font-mono text-2xl font-bold mb-8 uppercase tracking-widest">
          [01] FEATURED PROJECTS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image || "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80&w=800"}
              tags={project.tags ? project.tags.split(",").map(t => t.trim()) : []}
              link={`/projects/${project.slug}`}
            />
          )) : (
            <p className="text-muted-foreground font-mono">No projects published yet. Head to the admin dashboard to create one!</p>
          )}
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="container max-w-screen-2xl px-4 md:px-8 mx-auto py-16 md:py-24 border-t border-border/40 mb-12">
        <h2 className="font-mono text-2xl font-bold mb-8 uppercase tracking-widest">
          [02] ENGINEERING INSIGHTS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
          {posts.length > 0 ? posts.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              date={new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              category={post.category}
              link={`/blog/${post.slug}`}
            />
          )) : (
            <p className="text-muted-foreground font-mono">No logs published yet. Head to the admin dashboard to write one!</p>
          )}
        </div>
        <div className="mt-12 text-center">
          <Link href="/blog" className="inline-block font-mono text-sm font-bold border-b-2 border-primary pb-1 tracking-widest hover:text-muted-foreground transition-colors">
            [VIEW ALL POSTS]
          </Link>
        </div>
      </section>
    </div>
  );
}
