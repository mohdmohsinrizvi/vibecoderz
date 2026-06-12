export default function Skeleton({ className = '', ...props }) {
  return (
    <div className={`skeleton ${className}`} {...props} />
  )
}

export function ProjectCardSkeleton() {
  return (
    <div className="p-5 bg-bg-base border border-border-subtle rounded-[10px]">
      <Skeleton className="h-5 w-3/5" />
      <Skeleton className="h-4 w-full mt-2" />
      <Skeleton className="h-4 w-4/5 mt-1" />
      <div className="flex justify-between items-center pt-3 mt-4 border-t border-border-subtle">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-3 w-1/5" />
      </div>
    </div>
  )
}

export function LeaderboardRowSkeleton() {
  return (
    <div className="grid grid-cols-[40px_1fr_80px_80px] items-center py-3 border-b border-border-subtle">
      <Skeleton className="h-4 w-5" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-12 justify-self-end" />
      <Skeleton className="h-4 w-8 justify-self-end" />
    </div>
  )
}
