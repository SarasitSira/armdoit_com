import { updateExperience } from "@/actions/experiences";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const experience = await prisma.experience.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!experience) notFound();

  const updateAction = updateExperience.bind(null, experience.id);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/experiences" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-mono text-sm tracking-widest">
          <ArrowLeft className="w-4 h-4" />
          [BACK TO EXPERIENCES]
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-2">Edit Experience</h1>
        <p className="text-muted-foreground font-mono text-sm">Update a role on your timeline.</p>
      </div>

      <form action={updateAction} className="space-y-6 max-w-2xl bg-card p-6 border border-border rounded-lg">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="role" className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Role</label>
            <input type="text" id="role" name="role" defaultValue={experience.role} required className="w-full p-3 bg-background border border-border rounded-md font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div className="space-y-2">
            <label htmlFor="company" className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Company</label>
            <input type="text" id="company" name="company" defaultValue={experience.company} required className="w-full p-3 bg-background border border-border rounded-md font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="startDate" className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Start Date</label>
            <input type="text" id="startDate" name="startDate" defaultValue={experience.startDate} required className="w-full p-3 bg-background border border-border rounded-md font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div className="space-y-2">
            <label htmlFor="endDate" className="font-mono text-sm uppercase tracking-widest text-muted-foreground">End Date</label>
            <input type="text" id="endDate" name="endDate" defaultValue={experience.endDate || ""} className="w-full p-3 bg-background border border-border rounded-md font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Description</label>
          <textarea id="description" name="description" defaultValue={experience.description} required rows={4} className="w-full p-3 bg-background border border-border rounded-md font-sans text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
        </div>

        <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-md font-mono text-sm tracking-widest font-bold hover:opacity-90 transition-opacity">
          [UPDATE EXPERIENCE]
        </button>
      </form>
    </div>
  );
}
