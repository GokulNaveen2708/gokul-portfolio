"use client";

import { useState } from "react";
import { MotionSection } from "@/components/layout/MotionSection";
import { Button } from "@/components/ui/Button";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent("Website inquiry from " + (name || "Visitor"));
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
    );
    // open default mail client
    window.location.href = `mailto:gc3522@g.rit.edu?subject=${subject}&body=${body}`;
  }

  return (
    <MotionSection id="contact" title="CONTACT ME" subtitle="I'm open to full-time, part-time, and freelance opportunities. Let's work together!">
      <div className="mx-auto max-w-3xl font-sans">
        <article className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-white/10 to-transparent p-8 shadow-2xl shadow-accent/10 backdrop-blur-[30px]">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/20 blur-[50px] transition" />

          <div className="text-center">
            <p className="text-sm text-fg-muted sm:text-base">
              Feel free to reach out. I’d love to connect and discuss how we can work together.
              You can also email me directly at
              <a className="text-accent ml-1" href="mailto:gc3522@g.rit.edu">gc3522@g.rit.edu</a>
              {" "}or call <a className="text-accent" href="tel:+1234567890">+1 (585) 350-5618</a>.
            </p>
          </div>

          <form className="mt-8 text-left" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="text-xs text-fg-muted mb-1">Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  required
                  className="w-full rounded-md border border-white/10 bg-transparent px-3 py-3 text-white placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </label>

              <label className="flex flex-col">
                <span className="text-xs text-fg-muted mb-1">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="w-full rounded-md border border-white/10 bg-transparent px-3 py-3 text-white placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </label>
            </div>

            <label className="flex flex-col mt-4">
              <span className="text-xs text-fg-muted mb-1">Phone (optional)</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Mobile number"
                className="w-full rounded-md border border-white/10 bg-transparent px-3 py-3 text-white placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </label>

            <label className="flex flex-col mt-4">
              <span className="text-xs text-fg-muted mb-1">Message</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here."
                required
                rows={6}
                className="w-full rounded-md border border-white/10 bg-transparent px-3 py-3 text-white placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent resize-y"
              />
            </label>

            <div className="mt-6">
              <Button
                type="submit"
                variant="primary"
                className="w-full"
              >
                Send message
              </Button>
            </div>
          </form>

          <div className="mt-8 flex items-center justify-center gap-4 text-sm text-fg-muted">
            <span>Prefer a quick chat?</span>
            <a href="mailto:gc3522@g.rit.edu" className="text-accent font-medium">Email</a>
            <span className="hidden sm:inline">•</span>
            <a href="tel:+1234567890" className="text-accent font-medium">Call</a>
          </div>
        </article>
      </div>
    </MotionSection>
  );
}
