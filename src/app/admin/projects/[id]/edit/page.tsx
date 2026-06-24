import { updateProject } from "@/actions/projects";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = await prisma.project.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!project) notFound();

  const updateAction = updateProject.bind(null, project.id);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/projects" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-mono text-sm tracking-widest">
          <ArrowLeft className="w-4 h-4" />
          [BACK TO PROJECTS]
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-2">Edit Project</h1>
        <p className="text-muted-foreground font-mono text-sm">Update your portfolio piece.</p>
      </div>
      
      <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-md font-mono text-sm max-w-2xl">
        <h4 className="font-bold uppercase tracking-widest mb-1 flex items-center gap-2"><AlertCircle className="w-4 h-4"/> [DEPLOYMENT_WARNING]</h4>
        Files uploaded here are saved to your local `public/uploads` folder. If you deploy this to a serverless host like Vercel, files will reset on every deployment. You will need to migrate to Vercel Blob storage for production.
      </div>

      <form action={updateAction} className="space-y-6 max-w-2xl bg-card p-6 border border-border rounded-lg">
        <div className="space-y-2">
          <label htmlFor="title" className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Project Title</label>
          <input type="text" id="title" name="title" defaultValue={project.title} required className="w-full p-3 bg-background border border-border rounded-md font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Short Description</label>
          <input type="text" id="description" name="description" defaultValue={project.description} required className="w-full p-3 bg-background border border-border rounded-md font-sans text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>

        <div className="space-y-2">
          <label htmlFor="tags" className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Tags (comma separated)</label>
          <input type="text" id="tags" name="tags" defaultValue={project.tags} required className="w-full p-3 bg-background border border-border rounded-md font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>

        <div className="space-y-4 border border-border/50 p-4 rounded-md bg-muted/20">
          <div className="space-y-2">
            <label htmlFor="cadFile" className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Upload NEW 3D CAD Model (.glb only)</label>
            <input type="file" id="cadFile" name="cadFile" accept=".glb" className="w-full p-3 bg-background border border-border rounded-md font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
            {project.cadModelUrl && <p className="text-xs text-muted-foreground font-mono mt-1">Current file: {project.cadModelUrl}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="imageFile" className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Upload NEW Cover Image (.jpg, .png)</label>
            <input type="file" id="imageFile" name="imageFile" accept="image/*" className="w-full p-3 bg-background border border-border rounded-md font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
            {project.image && <p className="text-xs text-muted-foreground font-mono mt-1">Current image: {project.image}</p>}
          </div>
          <p className="text-xs text-muted-foreground font-mono border-t border-border/50 pt-2">Note: Leave file inputs empty to keep your existing files.</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Full Content (Markdown)</label>
          <textarea id="content" name="content" defaultValue={project.content || ""} rows={8} className="w-full p-3 bg-background border border-border rounded-md font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-y" />
        </div>

        <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-md font-mono text-sm tracking-widest font-bold hover:opacity-90 transition-opacity">
          [UPDATE PROJECT]
        </button>
      </form>
    </div>
  );
}
