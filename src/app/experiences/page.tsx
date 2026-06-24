import { prisma } from "@/lib/prisma";

export default async function ExperiencesPage() {
  const experiences = await prisma.experience.findMany({
    orderBy: { startDate: "desc" },
  });

  return (
    <div className="container max-w-screen-xl px-4 md:px-8 mx-auto py-12 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold uppercase tracking-tight">Work Experience</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          My professional journey in mechanical engineering, product design, and manufacturing.
        </p>
      </div>

      <div className="max-w-3xl space-y-12 border-l border-border pl-8 relative">
        {experiences.length === 0 ? (
          <p className="text-muted-foreground">Experience timeline is being updated.</p>
        ) : (
          experiences.map((exp) => (
            <div key={exp.id} className="relative">
              <div className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-2 border-primary bg-background"></div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-4 flex-wrap">
                  <h3 className="text-2xl font-bold tracking-tight">{exp.role}</h3>
                  <span className="text-lg text-muted-foreground">@ {exp.company}</span>
                </div>
                <div className="font-mono text-sm text-primary uppercase tracking-widest">
                  [{exp.startDate} - {exp.endDate || "PRESENT"}]
                </div>
                <p className="text-muted-foreground leading-relaxed pt-2">
                  {exp.description}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
