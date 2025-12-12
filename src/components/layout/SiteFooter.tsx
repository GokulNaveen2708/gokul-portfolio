export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 mt-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-6 text-xs text-fg-muted sm:px-6 lg:px-8 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Gokula Ranga Naveen Chapala.</p>
        <p className="space-x-4">
          <a
            href="https://github.com/GokulNaveen2708"
            target="_blank"
            rel="noreferrer"
            className="hover:text-fg"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-fg"
          >
            LinkedIn
          </a>
        </p>
      </div>
    </footer>
  );
}
