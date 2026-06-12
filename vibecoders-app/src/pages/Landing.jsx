import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'
import logoMarkImg from '../assets/logo-mark.png'

export default function Landing() {
  const { user } = useAuth()

  return (
    <div className="space-y-24 py-10 max-w-[800px] mx-auto px-4 sm:px-6">
      {/* Hero Section */}
      <section className="text-center pt-8 pb-4 animate-[modal-enter_400ms_cubic-bezier(0.16,1,0.3,1)]">
        <div className="flex justify-center mb-6">
          <img src={logoMarkImg} alt="VibeCoderz Logo" className="h-16 w-16 rounded-2xl border border-border-subtle shadow-[0_4px_12px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] object-contain" />
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-semibold tracking-wide uppercase mb-8 shadow-[0_1px_2px_rgba(46,56,166,0.03)] dark:bg-accent-subtle/10 dark:border-accent-subtle/30">
          <span>About VibeCoderz</span>
        </div>
        <h1 className="text-4xl sm:text-[3.5rem] font-black tracking-tight text-text-primary leading-[1.05] mb-6 font-sans">
          Ship it. Share it.<br />
          <span className="text-accent">Get noticed.</span>
        </h1>
        <p className="text-md sm:text-lg text-text-secondary leading-relaxed mb-10 max-w-[540px] mx-auto font-normal">
          The community platform where builders showcase what they're working on — and get real feedback from people who understand the craft.
        </p>
        <div className="flex items-center justify-center gap-3">
          {user ? (
            <Link to="/submit">
              <Button size="lg" className="px-6 py-3 font-semibold text-sm">Share your first project</Button>
            </Link>
          ) : (
            <>
              <Link to="/signup">
                <Button size="lg" className="px-6 py-3 font-semibold text-sm">Share your first project</Button>
              </Link>
              <Link to="/">
                <Button variant="secondary" size="lg" className="px-6 py-3 font-semibold text-sm">Browse projects</Button>
              </Link>
            </>
          )}
        </div>
      </section>

      {/* What is VibeCoderz & Mission */}
      <section className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-border-subtle/80">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-accent mb-3">
            The Concept
          </h2>
          <h3 className="text-xl font-black text-text-primary mb-4 tracking-tight">
            What is VibeCoderz?
          </h3>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-4">
            VibeCoderz is a lightweight community platform built for people who ship. Whether you're a student shipping your first side project, an indie hacker validating ideas, or an AI builder pushing out micro-products every week — this is the place to share what you've made.
          </p>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
            Most platforms reward follower counts or polished marketing. VibeCoderz rewards the work itself. Every project gets equal visibility. Every reaction is honest.
          </p>
        </div>

        <div className="bg-bg-subtle/60 p-6 rounded-xl border border-border-subtle shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-none">
          <h2 className="text-xs font-bold uppercase tracking-wider text-accent mb-3">
            Our Creed
          </h2>
          <h3 className="text-xl font-black text-text-primary mb-4 tracking-tight">
            Our mission
          </h3>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-4">
            We exist to give every builder a place to share their work, receive honest feedback, and grow through building in public.
          </p>
          <ul className="text-text-secondary text-xs sm:text-sm leading-relaxed space-y-2.5">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Every project gets a fair shot at being discovered</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Every reaction comes from a real builder</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Reputation is earned solely through shipping</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>No algorithm decides visibility — the community does</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Why Share Your Projects */}
      <section className="pt-8 border-t border-border-subtle/80">
        <div className="mb-10 text-center sm:text-left">
          <h2 className="text-xs font-bold uppercase tracking-wider text-accent mb-2">
            Why Share
          </h2>
          <h3 className="text-2xl font-black text-text-primary tracking-tight">
            Why builders choose VibeCoderz
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-6 bg-bg-subtle/40 rounded-xl border border-border-subtle hover:border-border-default transition-all duration-200">
            <h4 className="text-base font-bold text-text-primary mb-2">Get real feedback</h4>
            <p className="text-text-secondary text-sm leading-relaxed">
              Posting on Twitter gets you likes from friends. Posting on VibeCoderz gets you honest reactions from builders who actually understand what you built.
            </p>
          </div>

          <div className="p-6 bg-bg-subtle/40 rounded-xl border border-border-subtle hover:border-border-default transition-all duration-200">
            <h4 className="text-base font-bold text-text-primary mb-2">Build your portfolio</h4>
            <p className="text-text-secondary text-sm leading-relaxed">
              Every project you share becomes part of your public track record. Visitors see what you've actually shipped — not just what you've talked about.
            </p>
          </div>

          <div className="p-6 bg-bg-subtle/40 rounded-xl border border-border-subtle hover:border-border-default transition-all duration-200">
            <h4 className="text-base font-bold text-text-primary mb-2">Gain visibility</h4>
            <p className="text-text-secondary text-sm leading-relaxed">
              Great projects from unknown builders get seen. VibeCoderz is small enough to get noticed, and curated enough to be appreciated.
            </p>
          </div>

          <div className="p-6 bg-bg-subtle/40 rounded-xl border border-border-subtle hover:border-border-default transition-all duration-200">
            <h4 className="text-base font-bold text-text-primary mb-2">Stay motivated</h4>
            <p className="text-text-secondary text-sm leading-relaxed">
              Building alone is hard. Building in public with a community that notices your progress? That keeps you going day in and day out.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Bento Grid */}
      <section className="pt-8 border-t border-border-subtle/80">
        <div className="mb-10 text-center sm:text-left">
          <h2 className="text-xs font-bold uppercase tracking-wider text-accent mb-2">
            Features
          </h2>
          <h3 className="text-2xl font-black text-text-primary tracking-tight">
            Designed for the craft of shipping
          </h3>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          <div className="p-5 bg-bg-subtle rounded-xl border border-border-subtle shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <h4 className="text-sm font-bold text-text-primary mb-1.5">Zero friction sharing</h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Three fields. Two minutes. Your project is live. No approval process or gatekeeping.
            </p>
          </div>
          <div className="p-5 bg-bg-subtle rounded-xl border border-border-subtle shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <h4 className="text-sm font-bold text-text-primary mb-1.5">Honest reactions</h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Both likes and dislikes. This isn't a vanity metric platform — it's a signal platform.
            </p>
          </div>
          <div className="p-5 bg-bg-subtle rounded-xl border border-border-subtle shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <h4 className="text-sm font-bold text-text-primary mb-1.5">Real reputation</h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Your rank isn't about followers. It's about how many people your projects have resonated with.
            </p>
          </div>
          <div className="p-5 bg-bg-subtle rounded-xl border border-border-subtle shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <h4 className="text-sm font-bold text-text-primary mb-1.5">Community-first</h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Every feature is designed around helping builders. No dark patterns. No spam.
            </p>
          </div>
          <div className="p-5 bg-bg-subtle rounded-xl border border-border-subtle shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <h4 className="text-sm font-bold text-text-primary mb-1.5">Discover raw builds</h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Scroll through projects you'd never find on Product Hunt. From AI tools to weekend hacks.
            </p>
          </div>
          <div className="p-5 bg-bg-subtle rounded-xl border border-border-subtle shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <h4 className="text-sm font-bold text-text-primary mb-1.5">Learn in public</h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Sharing work takes courage. We reward that vulnerability with constructive comments.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Built by a Builder */}
      <section className="grid sm:grid-cols-5 gap-8 pt-8 border-t border-border-subtle/80">
        <div className="sm:col-span-3 space-y-6">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-accent mb-2">
              Where we're headed
            </h2>
            <h3 className="text-xl font-black text-text-primary mb-3 tracking-tight">
              The homepage of builders
            </h3>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              We're building the default homepage for the global community of builders — the place you check every morning to see what's been shipped overnight, whose reputation is rising, and what ideas are worth stealing.
            </p>
          </div>
          <div className="p-5 bg-accent/5 border border-accent/15 rounded-xl dark:bg-accent-subtle/5 dark:border-accent-subtle/20">
            <p className="text-text-primary font-medium text-xs sm:text-sm leading-relaxed italic">
              "Where the next great product idea might come from a weekend project that got 3 honest reactions and a comment that changed everything."
            </p>
          </div>
        </div>

        <div className="sm:col-span-2 p-6 bg-bg-subtle rounded-xl border border-border-subtle">
          <h2 className="text-xs font-bold uppercase tracking-wider text-accent mb-2">
            The Creator
          </h2>
          <h3 className="text-lg font-black text-text-primary mb-3 tracking-tight">
            Built by a builder
          </h3>
          <p className="text-text-secondary text-xs sm:text-sm leading-relaxed mb-4">
            VibeCoderz was created by <strong className="text-text-primary font-semibold">Mohd Mohsin</strong> to give developers a dedicated space to show their work.
          </p>
          <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
            "As someone who shipped projects into the void for years, the problem was clear: there was no lightweight, permanent home for continuous building."
          </p>
        </div>
      </section>

      {/* Objectives */}
      <section className="pt-8 border-t border-border-subtle/80">
        <div className="mb-10">
          <h2 className="text-xs font-bold uppercase tracking-wider text-accent mb-2">
            Objectives
          </h2>
          <h3 className="text-2xl font-black text-text-primary tracking-tight">
            What we are working toward
          </h3>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4 items-start p-4 hover:bg-bg-subtle/50 rounded-xl transition-colors duration-150">
            <span className="font-mono text-accent font-bold text-sm bg-accent/10 px-2 py-0.5 rounded">01</span>
            <div>
              <h4 className="text-sm font-bold text-text-primary mb-1">Encourage project sharing</h4>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Make it so easy to share a project that there's no reason not to. Remove every barrier between building and showing it.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-4 hover:bg-bg-subtle/50 rounded-xl transition-colors duration-150">
            <span className="font-mono text-accent font-bold text-sm bg-accent/10 px-2 py-0.5 rounded">02</span>
            <div>
              <h4 className="text-sm font-bold text-text-primary mb-1">Support learning in public</h4>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Normalize the idea that sharing incomplete work is not just okay — it's the fastest way to improve. Every project is a lesson.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-4 hover:bg-bg-subtle/50 rounded-xl transition-colors duration-150">
            <span className="font-mono text-accent font-bold text-sm bg-accent/10 px-2 py-0.5 rounded">03</span>
            <div>
              <h4 className="text-sm font-bold text-text-primary mb-1">Help developers gain recognition</h4>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Create a system where consistent builders earn visibility through their work alone. No follower counts or games.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-4 hover:bg-bg-subtle/50 rounded-xl transition-colors duration-150">
            <span className="font-mono text-accent font-bold text-sm bg-accent/10 px-2 py-0.5 rounded">04</span>
            <div>
              <h4 className="text-sm font-bold text-text-primary mb-1">Build a positive ecosystem</h4>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Foster a community where feedback is constructive, encouragement is genuine, and every builder feels welcome.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-4 hover:bg-bg-subtle/50 rounded-xl transition-colors duration-150">
            <span className="font-mono text-accent font-bold text-sm bg-accent/10 px-2 py-0.5 rounded">05</span>
            <div>
              <h4 className="text-sm font-bold text-text-primary mb-1">Celebrate the build process</h4>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Not every project needs to be a million-dollar startup. Some are learning exercises, some are weekend hacks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-6 rounded-2xl bg-bg-subtle border border-border-subtle text-center shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <h2 className="text-2xl font-black text-text-primary tracking-tight mb-3">
          Ready to share what you've been building?
        </h2>
        <p className="text-text-secondary text-sm sm:text-base mb-8 max-w-[480px] mx-auto leading-relaxed">
          Join the community. Post your project. Get honest feedback. Build reputation through shipping.
        </p>
        <Link to={user ? '/submit' : '/signup'}>
          <Button size="lg" className="px-6 py-3 font-semibold text-sm">Share your first project</Button>
        </Link>
      </section>
    </div>
  )
}
