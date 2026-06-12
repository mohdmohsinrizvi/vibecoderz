import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatRelativeTime } from '../../lib/utils'
import Avatar from '../ui/Avatar'

export default function CommentItem({ comment, isOwn, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  const handleDelete = () => {
    onDelete()
    setConfirmDelete(false)
  }

  return (
    <div className="py-4 border-b border-border-subtle group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Avatar name={comment.user?.display_name || comment.user?.username} size="sm" />
          <Link to={`/u/${comment.user?.username}`} className="text-sm font-semibold text-text-primary no-underline hover:text-accent transition-colors">
            {comment.user?.username}
          </Link>
          <span className="text-xs text-text-tertiary">·</span>
          <span className="text-xs text-text-tertiary">{formatRelativeTime(comment.created_at)}</span>
        </div>
        {isOwn && (
          <div className="relative">
            {confirmDelete ? (
              <div className="flex items-center gap-2 text-xs">
                <span className="text-text-tertiary">Delete?</span>
                <button onClick={handleDelete} className="text-error hover:text-error font-semibold min-h-[44px] px-2 cursor-pointer">Delete</button>
                <button onClick={() => setConfirmDelete(false)} className="text-text-tertiary hover:text-text-primary font-semibold min-h-[44px] px-2 cursor-pointer">Cancel</button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmDelete(true)}
                className="w-11 h-11 -mr-3 flex items-center justify-center rounded-md hover:bg-bg-subtle text-text-tertiary hover:text-error transition-all sm:opacity-0 sm:group-hover:opacity-100 opacity-60 hover:opacity-100 text-base font-semibold cursor-pointer"
                aria-label="Delete comment"
              >
                ×
              </button>
            )}
          </div>
        )}
      </div>
      <p className="text-base text-text-secondary leading-normal">{comment.content}</p>
    </div>
  )
}
