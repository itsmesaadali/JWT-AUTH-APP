import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingBlogPost() {
    return (
        <div className=" max-w-3xl mx-auto py-8 px-4">

            <Skeleton className="h-10 w-24 mb-6"/>
            <Skeleton className="h-100 w-full mb-4"/>
            <div className="space-y-4">
                <Skeleton className="h-8 w-3/4"/>
                <Skeleton className="h-6 w-32"/>
            </div>
            <div className="mt-10 space-y-2">
                <Skeleton className="h-4 w-full"/>
                <Skeleton className="h-4 w-5/6"/>
                <Skeleton className="h-4 w-4/6"/>
            </div>
        </div>
    )
}