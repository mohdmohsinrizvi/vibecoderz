import { Link } from 'react-router-dom'
import { formatRelativeTime } from '../../lib/utils'
import Avatar from '../ui/Avatar'

export default function ProjectCard({ project }) {
  const likes = project.reactions?.filter(r => r.reaction_type === 'like').length || 0
  const commentCount = project.comments?.length || 0

  const getDomain = (urlStr) => {
    try {
      const url = new URL(urlStr)
      return url.hostname.replace('www.', '')
    } catch {
      return urlStr
    }
  }

  return (
    <div className="p-6 bg-bg-subtle border border-border-subtle/70 rounded-xl transition-all duration-300 hover:-translate-y-[2px] hover:border-accent/30 shadow-[0_1px_2.5px_rgba(0,0,0,0.01),0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_12px_28px_rgba(0,0,0,0.22)] hover:bg-bg-subtle/90">
      <Link to={`/projects/${project.id}`} className="no-underline group/title">
        <div className="flex items-center justify-between gap-4 mb-2.5">
          <h3 className="text-md sm:text-[1.05rem] font-bold text-text-primary leading-snug tracking-tight group-hover/title:text-accent transition-colors">
            {project.title}
          </h3>
          {project.url && (
            <div className="flex items-center gap-2 shrink-0">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success"></span>
              </span>
              <span className="font-mono text-[0.68rem] uppercase tracking-wider text-text-tertiary px-2 py-0.5 rounded border border-border-subtle/80 bg-bg-muted/40 font-semibold">
                {getDomain(project.url)}
              </span>
            </div>
          )}
        </div>
        <p className="text-[0.875rem] text-text-secondary leading-relaxed line-clamp-2 mb-5 font-normal">
          {project.description}
        </p>
      </Link>

      <div className="flex items-center justify-between pt-4 border-t border-border-subtle/60 text-sm text-text-tertiary">
        <div className="flex items-center gap-2">
          <Avatar name={project.user?.display_name || project.user?.username} size="sm" />
          <Link to={`/u/${project.user?.username}`} className="font-semibold text-[0.8125rem] text-text-secondary no-underline hover:text-accent transition-colors">
            {project.user?.username}
          </Link>
          <span className="text-text-disabled">·</span>
          <span className="text-xs text-text-tertiary/80">{formatRelativeTime(project.created_at)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-bg-muted/30 border border-border-subtle/50 rounded-full text-xs font-semibold text-text-secondary">
            <span>👍</span>
            <span className="font-bold text-text-primary">{likes}</span>
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-bg-muted/30 border border-border-subtle/50 rounded-full text-xs font-semibold text-text-secondary">
            <span>💬</span>
            <span className="font-bold text-text-primary">{commentCount}</span>
          </span>
        </div>
      </div>
    </div>
  )
}
