export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0 w-full mt-auto">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4 md:px-8 mx-auto font-mono text-xs text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} /_Built with Assistance from AI.
        </p>
        <div className="flex items-center space-x-4">
          <a href="mailto:sarasit.sira@gmail.com" className="hover:text-foreground transition-colors">[EMAIL]</a>
          <a href="https://www.linkedin.com/in/sarasitsira" className="hover:text-foreground transition-colors">[LINKEDIN]</a>
          <a href="https://github.com/SarasitSira" className="hover:text-foreground transition-colors">[GITHUB]</a>
        </div>
      </div>
    </footer>
  );
}
