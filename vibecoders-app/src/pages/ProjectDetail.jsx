import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useProject, useDeleteProject } from '../hooks/useProjects'
import { useComments } from '../hooks/useComments'
import { formatRelativeTime } from '../lib/utils'
import PageContainer from '../components/layout/PageContainer'
import ReactionBar from '../components/project/ReactionBar'
import CommentList from '../components/comment/CommentList'
import CommentInput from '../components/comment/CommentInput'
import Avatar from '../components/ui/Avatar'
import Button from '../components/ui/Button'
import { ProjectCardSkeleton } from '../components/ui/Skeleton'
import Toast from '../components/ui/Toast'
import { useState } from 'react'

export default function ProjectDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const { data: project, isLoading, error } = useProject(id)
  const { deleteComment } = useComments(id)
  const deleteProject = useDeleteProject()
  const [toast, setToast] = useState(null)

  if (isLoading) {
    return (
      <PageContainer>
        <ProjectCardSkeleton />
      </PageContainer>
    )
  }

  if (error || !project) {
    return (
      <PageContainer>
        <div className="text-center py-16">
          <p className="text-text-secondary mb-4">This project no longer exists.</p>
          <Link to="/">
            <Button variant="secondary">← Back to projects</Button>
          </Link>
        </div>
      </PageContainer>
    )
  }

  const isOwn = user?.id === project.user?.id

  const handleDelete = async () => {
    try {
      await deleteProject.mutateAsync(project.id)
      setToast({ message: 'Project removed.', type: 'success' })
      setTimeout(() => navigate('/'), 500)
    } catch {
      setToast({ message: "Couldn't delete. Try again.", type: 'error' })
    }
  }

  return (
    <PageContainer>
      <article className="bg-bg-subtle/40 border border-border-subtle rounded-2xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="flex items-start justify-between gap-3 mb-4">
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-text-primary leading-tight">
            {project.title}
          </h1>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-tertiary hover:text-accent transition-colors text-xl shrink-0"
            title="Open project"
          >
            ↗
          </a>
        </div>

        <div className="flex items-center gap-2 mb-6 text-xs text-text-tertiary">
          <Avatar name={project.user?.display_name || project.user?.username} size="xs" />
          <Link to={`/u/${project.user?.username}`} className="font-semibold text-text-primary no-underline hover:text-accent transition-colors">
            {project.user?.username}
          </Link>
          <span>·</span>
          <span>{formatRelativeTime(project.created_at)}</span>
          {isOwn && (
            <>
              <span>·</span>
              <button onClick={handleDelete} className="text-error hover:underline text-xs cursor-pointer">Delete</button>
            </>
          )}
        </div>

        <p className="text-base text-text-secondary leading-relaxed mb-6 max-w-[64ch]">
          {project.description}
        </p>

        <div className="mb-8">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-muted border border-border-subtle text-accent hover:text-accent-hover text-xs font-mono no-underline transition-all duration-200"
          >
            <span>🔗 {project.url}</span>
          </a>
        </div>

        <ReactionBar project={project} />

        <div className="border-t border-border-subtle/80 mt-8 pt-6">
          <h2 className="text-base sm:text-lg font-black tracking-tight text-text-primary mb-4">
            {project.comments?.length || 0} comments
          </h2>

          <CommentList
            comments={project.comments}
            currentUserId={user?.id}
            onDelete={(commentId) => deleteComment.mutate(commentId)}
          />

          <div className="mt-6">
            {user ? (
              <CommentInput projectId={id} userId={user.id} />
            ) : (
              <div className="py-4 text-sm text-text-tertiary">
                <Link to="/login" className="text-accent hover:text-accent-hover no-underline font-semibold">Sign in</Link> to comment.
              </div>
            )}
          </div>
        </div>
      </article>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </PageContainer>
  )
}
