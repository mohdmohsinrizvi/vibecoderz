import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PageContainer from '../components/layout/PageContainer'
import ProjectFeed from '../components/project/ProjectFeed'
import Button from '../components/ui/Button'
import logoMarkImg from '../assets/logo-mark.png'

export default function Home() {
  const { user, loading } = useAuth()

  if (loading) return null

  return (
    <PageContainer>
      {!user && (
        <div className="mb-24 text-center max-w-[680px] mx-auto pt-10 pb-6 animate-[modal-enter_400ms_cubic-bezier(0.16,1,0.3,1)]">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-semibold tracking-wide uppercase mb-8 shadow-[0_1px_2px_rgba(46,56,166,0.03)] dark:bg-accent-subtle/10 dark:border-accent-subtle/30">
            <img src={logoMarkImg} alt="" className="h-4 w-4 rounded-md border border-accent/20 object-contain" />
            <span>🚀 Introducing VibeCoderz</span>
            <span className="w-1 h-1 rounded-full bg-accent opacity-60" />
            <span className="text-text-secondary font-medium lowercase">a home for ambitious builders</span>
          </div>

          <h1 className="text-4xl sm:text-[3.25rem] font-black tracking-tight text-text-primary leading-[1.08] mb-6 max-w-[620px] mx-auto font-sans">
            Ship your projects.<br />Share the vibe.<br /><span className="text-accent">Get noticed.</span>
          </h1>

          <p className="text-base sm:text-[1.0625rem] text-text-secondary leading-relaxed mb-10 max-w-[480px] mx-auto font-normal">
            The curated community showcase platform where builders share what they are working on — and get real feedback from people who understand the craft.
          </p>

          <div className="flex items-center justify-center gap-3">
            <Link to="/signup">
              <Button size="lg" className="px-6 py-3 font-semibold text-sm">Share your first project</Button>
            </Link>
            <Link to="/about">
              <Button variant="secondary" size="lg" className="px-6 py-3 font-semibold text-sm">Learn more</Button>
            </Link>
          </div>

          <div className="mt-16 pt-8 border-t border-border-subtle/85 grid grid-cols-3 gap-6 max-w-[500px] mx-auto text-center">
            <div>
              <div className="text-xl sm:text-2xl font-black text-text-primary tracking-tight">100%</div>
              <div className="text-xs text-text-tertiary font-semibold uppercase tracking-wider mt-1">Builder-focused</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-text-primary tracking-tight">Real-time</div>
              <div className="text-xs text-text-tertiary font-semibold uppercase tracking-wider mt-1">Honest Signals</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-text-primary tracking-tight">Zero</div>
              <div className="text-xs text-text-tertiary font-semibold uppercase tracking-wider mt-1">Algorithm Hype</div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-border-subtle/80 pb-5">
        <div>
          <h2 className="text-lg sm:text-xl font-black tracking-tight text-text-primary mb-1">
            Discover what's being built
          </h2>
          <p className="text-text-secondary text-sm font-normal">
            Real projects, live feedback. Fresh from the community.
          </p>
        </div>
        {user && (
          <Link to="/submit" className="self-start sm:self-auto">
            <Button size="sm" className="font-semibold px-4 py-2">+ Submit Project</Button>
          </Link>
        )}
      </div>
      <ProjectFeed />
    </PageContainer>
  )
}
