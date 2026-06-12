import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LeaderboardRowSkeleton } from '../ui/Skeleton'

export default function LeaderboardTable({ data, isLoading }) {
  const { user } = useAuth()

  if (isLoading) {
    return (
      <div>
        {Array.from({ length: 10 }).map((_, i) => (
          <LeaderboardRowSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!data?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary">No builders yet.</p>
      </div>
    )
  }

  return (
    <div className="bg-bg-subtle/40 border border-border-subtle rounded-2xl p-4 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] animate-[modal-enter_400ms_cubic-bezier(0.16,1,0.3,1)]">
      <div className="grid grid-cols-[50px_1fr_90px_90px] items-center text-[10px] sm:text-xs font-bold text-text-tertiary uppercase tracking-widest pb-4 border-b border-border-subtle font-sans">
        <span className="pl-2">Rank</span>
        <span>Builder</span>
        <span className="text-right">Score</span>
        <span className="text-right">Projects</span>
      </div>
      <div className="divide-y divide-border-subtle/60">
        {data.map((entry, index) => {
          const isCurrentUser = entry.user_id === user?.id;
          return (
            <div
              key={entry.user_id}
              className={`grid grid-cols-[50px_1fr_90px_90px] items-center py-3.5 transition-all duration-150 ${
                isCurrentUser 
                  ? 'bg-accent/5 dark:bg-accent-subtle/10 border-l-2 border-accent pl-1.5 -ml-2 rounded-r-lg' 
                  : 'hover:bg-bg-subtle/80'
              }`}
            >
              <span className={`text-xs sm:text-sm font-black font-mono tabular-nums pl-2 ${index < 3 ? 'text-accent' : 'text-text-tertiary'}`}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="flex items-center gap-2 truncate">
                <Link
                  to={`/u/${entry.username}`}
                  className="text-sm sm:text-base font-bold text-text-primary no-underline hover:text-accent transition-colors truncate"
                >
                  {entry.username}
                </Link>
                {isCurrentUser && (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-accent text-text-inverse rounded-sm">
                    You
                  </span>
                )}
              </div>
              <span className="text-sm sm:text-base font-black text-text-primary text-right tabular-nums font-mono">
                {entry.total_score > 0 ? '+' : ''}{entry.total_score}
              </span>
              <span className="text-sm sm:text-base font-medium text-text-secondary text-right tabular-nums">
                {entry.project_count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  )
}
