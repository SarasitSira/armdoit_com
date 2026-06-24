import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CadViewer } from "@/components/cad-viewer";
import ReactMarkdown from "react-markdown";

// Generate metadata dynamically
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = await prisma.project.findUnique({ where: { slug: resolvedParams.slug } });
  if (!project) return { title: "Project Not Found" };
  
  return {
    title: `${project.title} | Projects`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = await prisma.project.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="container max-w-screen-xl px-4 md:px-8 mx-auto py-12 flex flex-col gap-12">
      <div className="flex items-center gap-4">
        <Link href="/projects" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-mono text-sm tracking-widest">
          <ArrowLeft className="w-4 h-4" />
          <span>[BACK TO OVERVIEW]</span>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Left Column: Details */}
        <div className="flex-1 space-y-8">
          <div>
            <div className="flex gap-2 mb-4 uppercase tracking-widest text-xs text-primary font-mono flex-wrap">
              {project.tags.split(',').map(t => <span key={t}>[{t.trim()}]</span>)}
            </div>
            <h1 className="text-4xl font-extrabold uppercase tracking-tight mb-4">
              {project.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {project.description}
            </p>
          </div>

          {project.content && (
            <div className="space-y-4 border-t border-border/40 pt-8">
              <h2 className="font-mono text-xl font-bold uppercase tracking-widest mb-6">[ENGINEERING OVERVIEW]</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <ReactMarkdown>{project.content}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: 3D CAD Viewer or Image */}
        <div className="flex-1 w-full lg:sticky lg:top-24 h-[500px] lg:h-[700px] border border-border bg-card overflow-hidden">
          {project.cadModelUrl ? (
            <div className="w-full h-full relative">
              <div className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-md px-3 py-1 rounded-sm border border-border/50 font-mono text-xs uppercase tracking-widest">
                [INTERACTIVE CAD_MODEL]
              </div>
              <div className="absolute bottom-4 right-4 z-10 font-mono text-[10px] text-muted-foreground">
                //_DRAG TO ROTATE / SCROLL TO ZOOM
              </div>
              <CadViewer src={project.cadModelUrl} alt={`${project.title} CAD Model`} />
            </div>
          ) : project.image ? (
            <div className="w-full h-full relative bg-muted">
               <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-full h-full relative bg-muted flex flex-col items-center justify-center font-mono text-muted-foreground">
              <span className="text-4xl mb-4 opacity-20">[NO_RENDER_DATA]</span>
              <span className="text-xs uppercase tracking-widest">Awaiting 3D Model Upload</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
