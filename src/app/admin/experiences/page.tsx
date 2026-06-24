import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Trash2, Edit } from "lucide-react";
import { deleteExperience } from "@/actions/experiences";

export default async function AdminExperiencesPage() {
  const experiences = await prisma.experience.findMany({
    orderBy: { startDate: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-2">Experiences</h1>
          <p className="text-muted-foreground font-mono text-sm">Manage your work history.</p>
        </div>
        <Link href="/admin/experiences/new" className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-mono text-sm tracking-widest hover:opacity-90">
          <Plus className="w-4 h-4" />
          [ADD EXPERIENCE]
        </Link>
      </div>

      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <table className="w-full text-sm text-left font-mono">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
            <tr>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiences.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                  No experiences found.
                </td>
              </tr>
            ) : (
              experiences.map((exp) => (
                <tr key={exp.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                  <td className="px-6 py-4 font-bold text-foreground">
                    {exp.role}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {exp.company}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/experiences/${exp.id}/edit`} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <form action={async () => {
                        "use server";
                        await deleteExperience(exp.id);
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
