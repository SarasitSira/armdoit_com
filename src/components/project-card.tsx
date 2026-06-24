import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

export function ProjectCard({ title, description, image, tags, link }: ProjectCardProps) {
  return (
    <Link href={link} className="group flex flex-col space-y-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-foreground/50 hover:shadow-sm">
      <div className="relative aspect-video w-full overflow-hidden rounded-md border border-border/50 bg-muted">
        <Image src={image} alt={title} fill className="object-cover transition-transform group-hover:scale-105" />
      </div>
      <div className="flex flex-col space-y-2">
        <h3 className="font-mono text-lg font-bold flex items-center justify-between">
          <span>//_{title}</span>
          <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag) => (
            <span key={tag} className="font-mono text-xs font-medium px-2 py-1 bg-secondary text-secondary-foreground rounded-sm border border-border/50">
              [{tag}]
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
