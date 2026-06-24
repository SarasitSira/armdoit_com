import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { LayoutDashboard, FileText, Briefcase, Award, Settings } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row bg-muted/20">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-border bg-card p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Link href="/admin" className="font-mono font-bold tracking-widest text-sm">
            [ADMIN_PANEL]
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
        
        <nav className="flex flex-col gap-2 font-mono text-sm mt-4">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
            <LayoutDashboard className="h-4 w-4" />
            Overview
          </Link>
          <Link href="/admin/projects" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
            <Briefcase className="h-4 w-4" />
            Projects
          </Link>
          <Link href="/admin/blog" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
            <FileText className="h-4 w-4" />
            Blog
          </Link>
          <Link href="/admin/experiences" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
            <Settings className="h-4 w-4" />
            Experiences
          </Link>
          <Link href="/admin/resume" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
            <Settings className="h-4 w-4" />
            Resume Upload
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
