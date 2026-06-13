import { useState } from 'react'
import { useProjects } from '../../hooks/useProjects'
import ProjectCard from './ProjectCard'
import { ProjectCardSkeleton } from '../ui/Skeleton'
import Button from '../ui/Button'

export default function ProjectFeed() {
  const [page, setPage] = useState(0)
  const [filter, setFilter] = useState('latest')
  const { data: projects, isLoading, error } = useProjects(page)

  const tabs = [
    { id: 'latest', label: 'Latest Ships' },
    { id: 'top', label: 'Top Shipped' },
    { id: 'discussed', label: 'Discussions' }
  ]

  const activeIndex = tabs.findIndex(t => t.id === filter)

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

  // Apply filter sorting
  const sortedProjects = [...projects].sort((a, b) => {
    if (filter === 'top') {
      return (b.reactions?.length || 0) - (a.reactions?.length || 0)
    }
    if (filter === 'discussed') {
      return (b.comments?.length || 0) - (a.comments?.length || 0)
    }
    return 0 // Keep default API sorting (latest created_at)
  })

  return (
    <div className="flex flex-col gap-4">
      {/* Sliding Capsule Filter Tabs */}
      <div className="relative flex p-1 rounded-lg bg-bg-subtle/50 border border-border-subtle/60 backdrop-blur-[8px] self-start mb-2 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
        <div 
          className="absolute bottom-1 top-1 rounded-md bg-bg-subtle shadow-[0_1px_3px_rgba(0,0,0,0.03)] border border-border-subtle/60 transition-all duration-200 ease-out"
          style={{
            left: `${activeIndex * 110 + 4}px`,
            width: '110px'
          }}
        />
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`relative z-10 w-[110px] py-1.5 text-[0.78rem] font-semibold text-center cursor-pointer transition-colors duration-150 no-underline outline-none ${filter === tab.id ? 'text-text-primary' : 'text-text-tertiary hover:text-text-secondary'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {sortedProjects.map((project) => (
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
        <p className="text-center text-text-tertiary text-xs py-4">
          You've seen everything. Submit your own.
        </p>
      )}
    </div>
  )
}
