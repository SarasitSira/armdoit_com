import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8 mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-mono text-sm font-bold tracking-tight">
            [S] / Sarasit (Arm) Sirawattanakul
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-mono uppercase tracking-widest">
          <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Home
          </Link>
          <Link href="/projects" className="text-sm font-mono tracking-widest text-muted-foreground hover:text-foreground transition-colors uppercase">
            [Projects]
          </Link>
          <Link href="/blog" className="text-sm font-mono tracking-widest text-muted-foreground hover:text-foreground transition-colors uppercase">
            [Blog]
          </Link>
          <Link href="/experiences" className="text-sm font-mono tracking-widest text-muted-foreground hover:text-foreground transition-colors uppercase">
            [Experiences]
          </Link>
          <Link href="/about" className="text-sm font-mono tracking-widest text-muted-foreground hover:text-foreground transition-colors uppercase">
            [About]
          </Link>
          <Link href="/contact" className="text-sm font-mono tracking-widest text-muted-foreground hover:text-foreground transition-colors uppercase">
            [Contact]
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
