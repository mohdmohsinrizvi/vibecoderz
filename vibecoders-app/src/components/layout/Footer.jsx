import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import logoDarkImg from '../../assets/logo-dark.png'
import logoLightImg from '../../assets/logo-light.png'

export default function Footer() {
  const { theme } = useTheme()
  
  return (
    <footer className="border-t border-border-subtle mt-auto">
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div className="max-w-[280px]">
            <Link to="/" className="hover:opacity-90 transition-opacity flex items-center mb-3">
              <img 
                src={theme === 'dark' ? logoDarkImg : logoLightImg} 
                alt="VibeCoderz" 
                className="h-7 w-auto object-contain" 
              />
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed">
              A community platform for builders who ship fast, learn in public, and grow through honest feedback. Built by a builder, for builders.
            </p>
          </div>
          <div className="flex gap-8 text-sm">
            <div className="flex flex-col gap-2">
              <span className="font-medium text-text-primary">Platform</span>
              <Link to="/" className="text-text-tertiary hover:text-text-secondary transition-colors no-underline">Feed</Link>
              <Link to="/leaderboard" className="text-text-tertiary hover:text-text-secondary transition-colors no-underline">Leaderboard</Link>
              <Link to="/submit" className="text-text-tertiary hover:text-text-secondary transition-colors no-underline">Submit</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-medium text-text-primary">Legal</span>
              <Link to="/privacy" className="text-text-tertiary hover:text-text-secondary transition-colors no-underline">Privacy</Link>
              <Link to="/terms" className="text-text-tertiary hover:text-text-secondary transition-colors no-underline">Terms</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border-subtle flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-text-tertiary">
          <span>© {new Date().getFullYear()} VibeCoderz. Created by Mohd Mohsin.</span>
          <span>Ship it. Share it. Get noticed.</span>
        </div>
      </div>
    </footer>
  )
}
