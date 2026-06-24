import { createExperience } from "@/actions/experiences";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewExperiencePage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/experiences" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-mono text-sm tracking-widest">
          <ArrowLeft className="w-4 h-4" />
          [BACK TO EXPERIENCES]
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-2">Add Experience</h1>
        <p className="text-muted-foreground font-mono text-sm">Add a new role to your timeline.</p>
      </div>

      <form action={createExperience} className="space-y-6 max-w-2xl bg-card p-6 border border-border rounded-lg">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="role" className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Role</label>
            <input type="text" id="role" name="role" required className="w-full p-3 bg-background border border-border rounded-md font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. Lead Mechanical Engineer" />
          </div>
          <div className="space-y-2">
            <label htmlFor="company" className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Company</label>
            <input type="text" id="company" name="company" required className="w-full p-3 bg-background border border-border rounded-md font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. SpaceX" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="startDate" className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Start Date</label>
            <input type="text" id="startDate" name="startDate" required className="w-full p-3 bg-background border border-border rounded-md font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. Jan 2022" />
          </div>
          <div className="space-y-2">
            <label htmlFor="endDate" className="font-mono text-sm uppercase tracking-widest text-muted-foreground">End Date</label>
            <input type="text" id="endDate" name="endDate" className="w-full p-3 bg-background border border-border rounded-md font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Leave blank for Present" />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Description</label>
          <textarea id="description" name="description" required rows={4} className="w-full p-3 bg-background border border-border rounded-md font-sans text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none" placeholder="Describe your responsibilities and achievements..." />
        </div>

        <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-md font-mono text-sm tracking-widest font-bold hover:opacity-90 transition-opacity">
          [SAVE EXPERIENCE]
        </button>
      </form>
    </div>
  );
}
