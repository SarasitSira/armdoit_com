import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Trash2, Edit } from "lucide-react";
import { deleteProject } from "@/actions/projects";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-2">Projects</h1>
          <p className="text-muted-foreground font-mono text-sm">Manage your portfolio pieces and CAD models.</p>
        </div>
        <Link href="/admin/projects/new" className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-mono text-sm tracking-widest hover:opacity-90">
          <Plus className="w-4 h-4" />
          [NEW PROJECT]
        </Link>
      </div>

      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <table className="w-full text-sm text-left font-mono">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Tags</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">
                  No projects found. Create one to get started!
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                  <td className="px-6 py-4 font-bold text-foreground">
                    {project.title}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {project.tags}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/projects/${project.id}/edit`} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <form action={async () => {
                        "use server";
                        await deleteProject(project.id);
                      }}>
                        <button type="submit" className="p-2 text-destructive/80 hover:text-destructive transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
