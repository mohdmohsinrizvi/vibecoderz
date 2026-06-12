import { Link } from 'react-router-dom'
import { formatRelativeTime } from '../../lib/utils'
import Avatar from '../ui/Avatar'

export default function ProjectCard({ project }) {
  const likes = project.reactions?.filter(r => r.reaction_type === 'like').length || 0
  const dislikes = project.reactions?.filter(r => r.reaction_type === 'dislike').length || 0
  const commentCount = project.comments?.length || 0

  return (
    <div className="p-6 bg-bg-subtle border border-border-subtle/80 rounded-xl transition-all duration-200 hover:-translate-y-[2px] hover:border-border-default/80 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_1px_2.5px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_12px_28px_rgba(0,0,0,0.3)]">
      <Link to={`/projects/${project.id}`} className="no-underline group/title">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-md sm:text-lg font-bold text-text-primary leading-snug tracking-tight group-hover/title:text-accent transition-colors">
            {project.title}
          </h3>
        </div>
        <p className="text-base text-text-secondary leading-normal line-clamp-2 mb-5 font-normal">
          {project.description}
        </p>
      </Link>

      <div className="flex items-center justify-between pt-4 border-t border-border-subtle/80 text-sm text-text-tertiary">
        <div className="flex items-center gap-2">
          <Avatar name={project.user?.display_name || project.user?.username} size="sm" />
          <Link to={`/u/${project.user?.username}`} className="font-semibold text-text-secondary no-underline hover:text-accent transition-colors">
            {project.user?.username}
          </Link>
          <span className="text-text-disabled">·</span>
          <span className="text-xs">{formatRelativeTime(project.created_at)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-bg-muted/40 border border-border-subtle/60 rounded-full text-xs font-semibold text-text-secondary">
            <span>👍</span>
            <span className="font-bold text-text-primary">{likes}</span>
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-bg-muted/40 border border-border-subtle/60 rounded-full text-xs font-semibold text-text-secondary">
            <span>💬</span>
            <span className="font-bold text-text-primary">{commentCount}</span>
          </span>
        </div>
      </div>
    </div>
  )
}
