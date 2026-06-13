import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useReactions } from '../../hooks/useReactions'
import Button from '../ui/Button'

export default function ReactionBar({ project }) {
  const { user } = useAuth()
  const { toggleReaction } = useReactions(project.id, user?.id)
  const [animatingLike, setAnimatingLike] = useState(false)
  const [animatingDislike, setAnimatingDislike] = useState(false)
  const [particles, setParticles] = useState([])

  const likes = project.reactions?.filter(r => r.reaction_type === 'like') || []
  const dislikes = project.reactions?.filter(r => r.reaction_type === 'dislike') || []
  const userReaction = user ? project.reactions?.find(r => r.user_id === user.id) : null
  const isOwnProject = user?.id === project.user?.id

  const spawnParticles = (type) => {
    const emojis = type === 'like' ? ['👍', '✨', '🔥', '🚀', '⚡'] : ['👎', '💤', '⚠️']
    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: `${Date.now()}-${i}`,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: Math.random() * 80 - 40, // random offset centered around emitter
      delay: Math.random() * 180, // scattered start times
      scale: Math.random() * 0.4 + 0.8 // variation in size
    }))
    
    setParticles(prev => [...prev, ...newParticles])
    
    // Purge particles after animation completes to free memory
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(n => n.id === p.id)))
    }, 1100)
  }

  const handleReaction = (type) => {
    if (!user || isOwnProject) return
    spawnParticles(type)
    
    if (type === 'like') {
      setAnimatingLike(true)
      setTimeout(() => setAnimatingLike(false), 200)
    } else {
      setAnimatingDislike(true)
      setTimeout(() => setAnimatingDislike(false), 200)
    }
    toggleReaction.mutate(type)
  }

  return (
    <div className="flex items-center gap-3 py-5 relative">
      {/* Floating Particle Container */}
      <div className="absolute pointer-events-none z-50 bottom-[40px] left-[30px]">
        {particles.map(p => (
          <span
            key={p.id}
            className="absolute select-none animate-emoji-float text-sm"
            style={{
              left: `${p.left}px`,
              animationDelay: `${p.delay}ms`,
              fontSize: `${p.scale}rem`
            }}
          >
            {p.emoji}
          </span>
        ))}
      </div>

      <button
        onClick={() => handleReaction('like')}
        disabled={isOwnProject || !user}
        className={`flex items-center gap-2.5 px-4.5 py-2 rounded-full border text-sm font-semibold transition-all duration-150 min-h-[40px] relative ${
          userReaction?.reaction_type === 'like'
            ? 'bg-accent-subtle border-accent-muted text-accent shadow-[inset_0_1px_2px_rgba(79,70,229,0.05)]'
            : 'bg-bg-subtle border-border-subtle/80 text-text-secondary hover:border-border-default hover:text-text-primary hover:bg-bg-muted/30 shadow-[0_1px_2px_rgba(0,0,0,0.01)]'
        } ${isOwnProject ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]'} ${
          animatingLike ? 'animate-reaction-scale' : ''
        }`}
        title={isOwnProject ? "You can't react to your own project" : !user ? 'Sign in to react' : 'Like this project'}
        aria-pressed={userReaction?.reaction_type === 'like'}
        aria-label={`Like this project. ${likes.length} likes`}
      >
        <span>👍</span>
        <span className="tabular-nums font-bold">{likes.length}</span>
      </button>

      <button
        onClick={() => handleReaction('dislike')}
        disabled={isOwnProject || !user}
        className={`flex items-center gap-2.5 px-4.5 py-2 rounded-full border text-sm font-semibold transition-all duration-150 min-h-[40px] relative ${
          userReaction?.reaction_type === 'dislike'
            ? 'bg-bg-muted/60 border-border-default text-text-primary'
            : 'bg-bg-subtle border-border-subtle/80 text-text-secondary hover:border-border-default hover:text-text-primary hover:bg-bg-muted/30 shadow-[0_1px_2px_rgba(0,0,0,0.01)]'
        } ${isOwnProject ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]'} ${
          animatingDislike ? 'animate-reaction-scale' : ''
        }`}
        title={isOwnProject ? "You can't react to your own project" : !user ? 'Sign in to react' : 'Dislike this project'}
        aria-pressed={userReaction?.reaction_type === 'dislike'}
        aria-label={`Dislike this project. ${dislikes.length} dislikes`}
      >
        <span>👎</span>
        <span className="tabular-nums font-bold">{dislikes.length}</span>
      </button>

      {!user && (
        <span className="text-xs text-text-tertiary ml-2">
          Sign in to react
        </span>
      )}
    </div>
  )
}
