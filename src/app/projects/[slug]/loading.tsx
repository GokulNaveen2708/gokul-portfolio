import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-0 sm:py-16 space-y-6">
      <Skeleton className="h-5 w-32 rounded-full" /> {/* category tag */}
      <Skeleton className="h-8 w-3/4 rounded-md" /> {/* title */}
      <Skeleton className="h-3 w-1/2 rounded-md" /> {/* subtitle */}

      <div className="space-y-2 pt-4">
        <Skeleton className="h-3 w-full rounded-md" />
        <Skeleton className="h-3 w-[85%] rounded-md" />
        <Skeleton className="h-3 w-[70%] rounded-md" />
      </div>

      <div className="pt-6 space-y-2">
        <Skeleton className="h-3 w-1/2 rounded-md" />
        <Skeleton className="h-3 w-[90%] rounded-md" />
        <Skeleton className="h-3 w-[80%] rounded-md" />
      </div>
    </div>
  );
}
