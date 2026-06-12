import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useProfile } from '../hooks/useLeaderboard'
import { formatRelativeTime } from '../lib/utils'
import PageContainer from '../components/layout/PageContainer'
import ProjectCard from '../components/project/ProjectCard'
import Avatar from '../components/ui/Avatar'
import Button from '../components/ui/Button'
import { ProjectCardSkeleton } from '../components/ui/Skeleton'

export default function Profile() {
  const { username } = useParams()
  const { user } = useAuth()
  const { data: profile, isLoading, error } = useProfile(username)

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex items-center gap-4 mb-8">
          <div className="skeleton w-16 h-16 rounded-full" />
          <div>
            <div className="skeleton h-5 w-32 mb-2" />
            <div className="skeleton h-4 w-48" />
          </div>
        </div>
        <ProjectCardSkeleton />
      </PageContainer>
    )
  }

  if (error || !profile) {
    return (
      <PageContainer>
        <div className="text-center py-16">
          <p className="text-text-secondary mb-4">This profile doesn't exist.</p>
          <Link to="/">
            <Button variant="secondary">← Back to projects</Button>
          </Link>
        </div>
      </PageContainer>
    )
  }

  const isOwn = user?.id === profile.id
  const totalScore = profile.projects?.reduce((acc, p) => {
    const likes = p.reactions?.filter(r => r.reaction_type === 'like').length || 0
    const dislikes = p.reactions?.filter(r => r.reaction_type === 'dislike').length || 0
    return acc + likes - dislikes
  }, 0) || 0

  return (
    <PageContainer>
      <div className="mb-12 bg-bg-subtle/40 border border-border-subtle rounded-2xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)] animate-[modal-enter_300ms_cubic-bezier(0.16,1,0.3,1)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-4">
            <Avatar name={profile.display_name || profile.username} size="lg" className="w-16 h-16 sm:w-20 sm:h-20" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-text-primary font-sans">
                  {profile.username}
                </h1>
                {isOwn && (
                  <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-accent/10 border border-accent/20 text-accent rounded-sm">
                    Owner
                  </span>
                )}
              </div>
              {profile.display_name && (
                <p className="text-text-secondary text-sm font-medium">{profile.display_name}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto bg-bg-muted px-4 py-2.5 rounded-xl border border-border-subtle shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] dark:shadow-none">
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary block leading-none mb-1">Reputation</span>
              <span className="text-base sm:text-lg font-black text-text-primary tabular-nums font-mono">
                {totalScore > 0 ? '+' : ''}{totalScore}
              </span>
            </div>
          </div>
        </div>

        {profile.bio && (
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-6 max-w-[62ch]">
            {profile.bio}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-text-tertiary border-t border-border-subtle/85 pt-4">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-border-strong" />
            Joined {formatRelativeTime(profile.created_at)}
          </span>
          <span className="hidden sm:inline text-border-default">·</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {profile.projects?.length || 0} projects shared
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base sm:text-lg font-black tracking-tight text-text-primary">
          Shared builds
        </h2>
        {isOwn && (
          <Link to="/submit">
            <Button size="sm" className="font-semibold">+ Share New</Button>
          </Link>
        )}
      </div>

      {profile.projects?.length > 0 ? (
        <div className="flex flex-col gap-4">
          {profile.projects.map((project) => (
            <ProjectCard key={project.id} project={{ ...project, user: profile }} />
          ))}
        </div>
      ) : (
        <p className="text-text-tertiary text-sm py-8">
          {isOwn ? "You haven't posted anything yet. Share your first project." : `${profile.username} hasn't posted anything yet.`}
        </p>
      )}
    </PageContainer>
  )
}
