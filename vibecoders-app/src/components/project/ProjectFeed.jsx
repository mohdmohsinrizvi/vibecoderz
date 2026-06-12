import { useState } from 'react'
import { useProjects } from '../../hooks/useProjects'
import ProjectCard from './ProjectCard'
import { ProjectCardSkeleton } from '../ui/Skeleton'
import Button from '../ui/Button'

export default function ProjectFeed() {
  const [page, setPage] = useState(0)
  const { data: projects, isLoading, error } = useProjects(page)

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-text-secondary mb-4">Something went wrong loading projects.</p>
        <Button variant="secondary" onClick={() => window.location.reload()}>
          Refresh page
        </Button>
      </div>
    )
  }

  if (!projects?.length) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-4">🏗️</p>
        <p className="text-text-secondary mb-1">Nothing here yet.</p>
        <p className="text-text-tertiary mb-6">Be the first to post a project.</p>
        <Button onClick={() => window.location.href = '/submit'}>
          Submit your project
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
      {projects.length === 20 && (
        <div className="text-center py-4">
          <Button variant="secondary" onClick={() => setPage(p => p + 1)}>
            Load more projects
          </Button>
        </div>
      )}
      {projects.length < 20 && projects.length > 0 && (
        <p className="text-center text-text-tertiary text-sm py-4">
          You've seen everything. Submit your own.
        </p>
      )}
    </div>
  )
}
