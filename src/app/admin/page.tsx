import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const projectCount = await prisma.project.count();
  const blogCount = await prisma.blog.count();
  const experienceCount = await prisma.experience.count();
  const totalViews = await prisma.pageVisit.count();
  
  const recentViews = await prisma.pageVisit.findMany({
    take: 5,
    orderBy: { visitedAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-2">Dashboard</h1>
        <p className="text-muted-foreground font-mono text-sm">Welcome back. Here is your real-time site performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 border border-border bg-card rounded-lg flex flex-col gap-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-6xl font-black">[1]</div>
          <h3 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Total Views</h3>
          <p className="text-4xl font-extrabold">{totalViews}</p>
        </div>
        
        <div className="p-6 border border-border bg-card rounded-lg flex flex-col gap-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-6xl font-black">[2]</div>
          <h3 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Projects</h3>
          <p className="text-4xl font-extrabold">{projectCount}</p>
        </div>

        <div className="p-6 border border-border bg-card rounded-lg flex flex-col gap-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-6xl font-black">[3]</div>
          <h3 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Blog Posts</h3>
          <p className="text-4xl font-extrabold">{blogCount}</p>
        </div>

        <div className="p-6 border border-border bg-card rounded-lg flex flex-col gap-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-6xl font-black">[4]</div>
          <h3 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Experiences</h3>
          <p className="text-4xl font-extrabold">{experienceCount}</p>
        </div>
      </div>

      <div className="border border-border bg-card rounded-lg p-6">
        <h3 className="font-mono font-bold tracking-widest uppercase mb-6">[RECENT TRAFFIC LOG]</h3>
        {recentViews.length === 0 ? (
          <p className="text-sm text-muted-foreground font-mono">No traffic logged yet.</p>
        ) : (
          <div className="space-y-4">
            {recentViews.map(view => (
              <div key={view.id} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                <span className="font-mono text-sm text-primary">{view.path}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {new Date(view.visitedAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
