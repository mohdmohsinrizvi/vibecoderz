import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import bgImage from './assets/bg.png'

const Home = lazy(() => import('./pages/Home'))
const Landing = lazy(() => import('./pages/Landing'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Submit = lazy(() => import('./pages/Submit'))
const Leaderboard = lazy(() => import('./pages/Leaderboard'))
const Profile = lazy(() => import('./pages/Profile'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const AuthCallback = lazy(() => import('./pages/AuthCallback'))
const NotFound = lazy(() => import('./pages/NotFound'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false
    }
  }
})

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-text-tertiary text-sm">Loading...</div>
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter>
            <div className="min-h-dvh flex flex-col bg-bg-base text-text-primary relative overflow-x-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-[0.03] dark:opacity-[0.08] pointer-events-none -z-10" 
                style={{ backgroundImage: `url(${bgImage})` }} 
              />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[350px] bg-[radial-gradient(ellipse_at_top,var(--color-accent-subtle)_0%,transparent_70%)] opacity-70 pointer-events-none -z-10" />
              <Header />
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<Landing />} />
                  <Route path="/projects/:id" element={<ProjectDetail />} />
                  <Route path="/submit" element={<Submit />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/u/:username" element={<Profile />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <Footer />
            </div>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
