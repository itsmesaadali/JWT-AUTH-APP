import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
        {[...Array(3)].map((_, index) => (
            <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="h-48 w-full " />
                <div className="space-y-2 flex flex-col">
                <Skeleton className="h-6 w-3/4 " />
                <Skeleton className="h-4 w-full " />
                <Skeleton className="h-6 w-2/3" />
                </div>
            </div>
        ))}
      </div>
    );
}