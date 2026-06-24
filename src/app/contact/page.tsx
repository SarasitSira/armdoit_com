import { Mail, Network, Terminal } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container max-w-screen-md px-4 md:px-8 mx-auto py-24 space-y-12">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight">Establish Connection</h1>
        <p className="text-lg text-muted-foreground font-mono">
          Whether you have a project in mind, need a consulting engineer, or just want to talk hardware, my inbox is open.
        </p>
      </div>

      <div className="grid gap-6">
        <a href="mailto:sarasit.sira@gmail.com" className="group flex items-center justify-between p-6 border border-border bg-card hover:border-primary transition-colors rounded-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold uppercase tracking-widest text-sm">Email</h3>
              <p className="text-muted-foreground font-mono text-xs">sarasit.sira@gmail.com</p>
            </div>
          </div>
          <div className="font-mono text-xs text-muted-foreground group-hover:text-primary uppercase tracking-widest transition-colors">
            [CONNECT]
          </div>
        </a>

        <a href="https://www.linkedin.com/in/sarasitsira" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-6 border border-border bg-card hover:border-[#0077b5] transition-colors rounded-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-muted rounded-full group-hover:bg-[#0077b5]/10 transition-colors">
              <Network className="w-6 h-6 group-hover:text-[#0077b5]" />
            </div>
            <div>
              <h3 className="font-bold uppercase tracking-widest text-sm">LinkedIn</h3>
              <p className="text-muted-foreground font-mono text-xs">linkedin.com/in/sarasitsira</p>
            </div>
          </div>
          <div className="font-mono text-xs text-muted-foreground group-hover:text-[#0077b5] uppercase tracking-widest transition-colors">
            [CONNECT]
          </div>
        </a>

        <a href="https://github.com/SarasitSira" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-6 border border-border bg-card hover:border-foreground transition-colors rounded-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-muted rounded-full group-hover:bg-foreground/10 transition-colors">
              <Terminal className="w-6 h-6 group-hover:text-foreground" />
            </div>
            <div>
              <h3 className="font-bold uppercase tracking-widest text-sm">GitHub</h3>
              <p className="text-muted-foreground font-mono text-xs">github.com/SarasitSira</p>
            </div>
          </div>
          <div className="font-mono text-xs text-muted-foreground group-hover:text-foreground uppercase tracking-widest transition-colors">
            [CONNECT]
          </div>
        </a>
      </div>

      <div className="mt-12 p-6 bg-muted/30 border border-border rounded-lg font-mono text-xs text-muted-foreground text-center">
        RESPONSE_TIME_AVERAGE: &lt; 24_HOURS
      </div>
    </div>
  );
}
