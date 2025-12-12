"use client";
import Link from "next/link";
import { useActiveSection } from "@/hooks/useActiveSection";

const navItems = [
  { href: "#projects", id: "projects", label: "Projects" },
  { href: "#experience", id: "experience", label: "Experience" },
  { href: "#contact", id: "contact", label: "Contact" },
];

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/gokul-naveen/",
    label: "LinkedIn",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg",
  },
  {
    href: "https://github.com/GokulNaveen2708",
    label: "GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  },
];

export function SiteHeader() {
  const active = useActiveSection(["projects", "experience", "contact"]);

  return (
    <header className="sticky top-0 z-20 border-b border-white/5 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm font-semibold">
          Gokula Ranga Naveen Chapala
        </Link>

        <nav className="hidden gap-6 text-sm text-fg-muted sm:flex items-center">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={
                active === item.id
                  ? "text-accent font-medium"
                  : "hover:text-fg transition"
              }
            >
              {item.label}
            </a>
          ))}
          
          {/* Social Links */}
          <div className="flex gap-3 items-center ml-4 pl-4 border-l border-white/10">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="h-5 w-5 opacity-70 hover:opacity-100 transition"
              >
                <img src={social.icon} alt={social.label} className="h-full w-full invert" />
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
