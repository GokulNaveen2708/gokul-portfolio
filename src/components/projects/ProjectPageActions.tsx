"use client";

import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export function ProjectPageActions() {
  const router = useRouter();

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mt-10 flex flex-wrap gap-3">
      <Button variant="outline" onClick={() => router.back()}>
        ← Back
      </Button>
      <Button onClick={scrollToContact}>Get in touch about this</Button>
    </div>
  );
}
