import { StudRow, BrickRow } from "@/components/lego/StudRow";

export function SiteFooter() {
  return (
    <footer style={{ backgroundColor: "#E0D8C8", borderTop: "1px solid rgba(122,156,179,0.15)" }}>
      {/* Stud rail */}
      <div className="px-4 py-1.5 overflow-hidden" style={{ backgroundColor: "#F5F3EC" }}>
        <div className="max-w-7xl mx-auto">
          <BrickRow count={14} studs={2} color="#FDFCFA" size={18} className="opacity-50" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-3 px-4 py-6 sm:px-6 lg:px-8 sm:flex-row sm:items-center sm:justify-between">
        <p
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: "#7A9CB3" }}
        >
          Built brick by brick · © {new Date().getFullYear()} Gokul Naveen
        </p>
        <div className="flex items-center gap-6">
          {[
            { label: "GitHub",   href: "https://github.com/GokulNaveen2708" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/gokul-naveen/" },
            { label: "Email",    href: "mailto:gc3522@g.rit.edu" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="text-xs font-black uppercase tracking-widest transition-colors hover:text-[#AD7556]"
              style={{ color: "#7A9CB3" }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom stud rail */}
      <div className="px-4 py-1 overflow-hidden" style={{ backgroundColor: "#FDFCFA" }}>
        <div className="max-w-7xl mx-auto">
          <BrickRow count={14} studs={2} color="#F5F3EC" size={18} className="opacity-60" />
        </div>
      </div>
    </footer>
  );
}
