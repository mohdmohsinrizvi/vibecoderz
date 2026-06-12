import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import Avatar from '../ui/Avatar'
import logoDarkImg from '../../assets/logo-dark.png'
import logoLightImg from '../../assets/logo-light.png'

export default function Header() {
  const { user, loading, signOut } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    setDropdownOpen(false)
  }, [location])

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  return (
    <header className="h-14 px-4 flex items-center justify-between sticky top-0 z-100 border-b border-border-subtle/80 bg-bg-base/75 backdrop-blur-[12px] transition-all duration-200">
      <Link to="/" className="hover:opacity-90 transition-opacity flex items-center">
        <img 
          src={theme === 'dark' ? logoDarkImg : logoLightImg} 
          alt="VibeCoderz" 
          className="h-7 w-auto object-contain" 
        />
      </Link>

      {/* Desktop nav */}
      <nav className="hidden sm:flex items-center gap-1.5" aria-label="Main navigation">
        <Link to="/" className={`text-sm font-medium px-3 py-1.5 rounded-md transition-all duration-120 no-underline border ${isActive('/') ? 'text-text-primary bg-bg-subtle border-border-subtle/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)]' : 'text-text-secondary border-transparent hover:text-text-primary hover:bg-bg-subtle/80'}`}>
          Feed
        </Link>
        <Link to="/leaderboard" className={`text-sm font-medium px-3 py-1.5 rounded-md transition-all duration-120 no-underline border ${isActive('/leaderboard') ? 'text-text-primary bg-bg-subtle border-border-subtle/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)]' : 'text-text-secondary border-transparent hover:text-text-primary hover:bg-bg-subtle/80'}`}>
          Leaderboard
        </Link>
      </nav>

      <div className="flex items-center gap-2">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-bg-subtle text-text-secondary hover:text-text-primary transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center border border-transparent hover:border-border-subtle/50"
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {theme === 'dark' ? (
            <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464-5.636a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-5.657 5.657a1 1 0 010-1.414l.707-.707a1 1 0 111.414 1.414l-.707.707a1 1 0 01-1.414 0zM9 17a1 1 0 100-2H8a1 1 0 100 2h1zm-4.343-4.343a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM3 11a1 1 0 100-2H2a1 1 0 100 2h1zm1.657-5.657a1 1 0 010-1.414l.707-.707a1 1 0 111.414 1.414l-.707.707a1 1 0 01-1.414 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>

        {loading ? null : user ? (
          <>
            <Link to="/submit" className="hidden sm:inline-flex bg-accent text-text-inverse text-sm font-semibold px-3 py-1.5 rounded-md no-underline hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_1px_2px_rgba(79,70,229,0.15),inset_0_1px_0_rgba(255,255,255,0.15)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]">
              + Submit
            </Link>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 p-1 rounded-md hover:bg-bg-subtle transition-colors cursor-pointer border border-transparent hover:border-border-subtle/50"
                aria-label="User menu"
              >
                <Avatar name={user.email} size="sm" />
              </button>
              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                  <div className="absolute right-0 top-full mt-1.5 bg-bg-base/95 backdrop-blur-[16px] border border-border-default rounded-lg py-1 min-w-[180px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] z-50">
                    <div className="px-3 py-2 text-xs text-text-tertiary border-b border-border-subtle">
                      {user.email}
                    </div>
                    <button
                      onClick={() => { navigate(`/u/${user.user_metadata?.username || 'me'}`); setDropdownOpen(false) }}
                      className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:bg-bg-subtle hover:text-text-primary transition-colors cursor-pointer"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:bg-bg-subtle hover:text-text-primary transition-colors border-t border-border-subtle cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm font-semibold text-text-secondary hover:text-text-primary px-3 py-1.5 no-underline transition-colors">
              Sign In
            </Link>
            <Link to="/signup" className="text-sm font-semibold bg-accent text-text-inverse px-3.5 py-1.5 rounded-md no-underline hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_1px_2px_rgba(79,70,229,0.15),inset_0_1px_0_rgba(255,255,255,0.15)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]">
              Sign Up
            </Link>
          </>
        )}

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden p-2 text-text-secondary hover:text-text-primary cursor-pointer"
          aria-label="Menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 sm:hidden" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-72 bg-bg-base border-l border-border-subtle z-50 p-6 animate-[modal-enter_250ms_cubic-bezier(0.32,0.72,0,1)] sm:hidden">
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary text-lg cursor-pointer" aria-label="Close menu">
              ✕
            </button>
            <nav className="flex flex-col gap-1 mt-8" aria-label="Mobile navigation">
              <Link to="/" className="text-base font-medium text-text-secondary hover:text-text-primary px-3 py-2.5 rounded-md no-underline hover:bg-bg-subtle transition-colors">
                Feed
              </Link>
              <Link to="/leaderboard" className="text-base font-medium text-text-secondary hover:text-text-primary px-3 py-2.5 rounded-md no-underline hover:bg-bg-subtle transition-colors">
                Leaderboard
              </Link>
              {user && (
                <>
                  <Link to={`/u/${user.user_metadata?.username || 'me'}`} className="text-base font-medium text-text-secondary hover:text-text-primary px-3 py-2.5 rounded-md no-underline hover:bg-bg-subtle transition-colors">
                    View Profile
                  </Link>
                  <Link to="/submit" className="text-base font-medium text-accent px-3 py-2.5 rounded-md no-underline hover:bg-accent-subtle transition-colors">
                    + Submit Project
                  </Link>
                </>
              )}
              {user && (
                <>
                  <div className="border-t border-border-subtle my-2" />
                  <button onClick={handleSignOut} className="text-left text-base font-medium text-text-secondary hover:text-text-primary px-3 py-2.5 rounded-md hover:bg-bg-subtle transition-colors cursor-pointer">
                    Sign Out
                  </button>
                </>
              )}
            </nav>
          </div>
        </>
      )}
    </header>
  )
}
