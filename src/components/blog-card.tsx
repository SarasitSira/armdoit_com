import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BlogCardProps {
  title: string;
  date: string;
  category: string;
  link: string;
}

export function BlogCard({ title, date, category, link }: BlogCardProps) {
  return (
    <Link href={link} className="group flex flex-col space-y-2 border-l-2 border-border pl-4 transition-colors hover:border-primary py-2">
      <div className="flex items-center space-x-2 text-xs font-mono text-muted-foreground">
        <span>{date}</span>
        <span>/</span>
        <span className="text-foreground">//_{category}</span>
      </div>
      <h3 className="text-lg font-semibold leading-tight group-hover:underline decoration-1 underline-offset-4">
        {title}
      </h3>
      <div className="flex items-center text-xs font-mono font-bold text-muted-foreground group-hover:text-foreground transition-colors pt-1">
        <span>[READ POST]</span>
        <ArrowRight className="ml-1 h-3 w-3" />
      </div>
    </Link>
  );
}
