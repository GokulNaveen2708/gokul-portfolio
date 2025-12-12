"use client";

import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export function ProjectPageActions() {
  const router = useRouter();

  const scrollToContact = () => {
    // Navigate back to the home page and include the contact hash
    // so the browser will scroll to the contact section there.
    router.push("/#contact");
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
