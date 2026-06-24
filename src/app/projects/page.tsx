import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container max-w-screen-xl px-4 md:px-8 mx-auto py-12 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold uppercase tracking-tight">Projects</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          A showcase of my mechanical engineering portfolio, featuring CAD models, FEA simulations, and physical prototypes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.slug}`} className="group block border border-border bg-card overflow-hidden hover:border-primary transition-colors">
            <div className="aspect-video bg-muted relative">
              <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-muted-foreground/50">
                [NO_IMAGE_DATA]
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex gap-2 text-xs font-mono text-primary uppercase flex-wrap">
                {project.tags.split(',').map(t => <span key={t}>[{t.trim()}]</span>)}
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
                [VIEW_SPECS] <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
