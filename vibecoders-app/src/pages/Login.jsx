import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PageContainer from '../components/layout/PageContainer'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function Login() {
  const { signIn, signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.redirect || '/'

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }))
    setServerError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError(null)

    if (!form.email || !form.password) {
      setErrors({ email: !form.email ? 'Email is required' : null, password: !form.password ? 'Password is required' : null })
      return
    }

    setLoading(true)
    try {
      await signIn(form.email, form.password)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setServerError('Incorrect email or password.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    try {
      await signInWithGoogle()
    } catch (err) {
      setServerError('Google sign in failed. Try again.')
    }
  }

  return (
    <PageContainer className="max-w-[440px]">
      <div className="bg-bg-subtle/50 border border-border-subtle rounded-2xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)] animate-[modal-enter_400ms_cubic-bezier(0.16,1,0.3,1)]">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-black tracking-tight text-text-primary mb-2 font-sans">
            Sign in
          </h1>
          <p className="text-text-secondary text-sm">
            Welcome back to VibeCoderz.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="you@example.com"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="••••••••"
          />

          {serverError && (
            <p className="text-xs font-semibold text-error bg-error/5 border border-error/15 px-3 py-2 rounded-lg">
              {serverError}
            </p>
          )}

          <Button type="submit" disabled={loading} className="w-full mt-2 py-2.5 font-semibold text-sm">
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-border-subtle/80" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary">or</span>
          <div className="flex-1 h-px bg-border-subtle/80" />
        </div>

        <Button variant="secondary" onClick={handleGoogle} className="w-full py-2.5 font-semibold text-sm">
          Continue with Google
        </Button>

        <p className="text-center text-xs text-text-tertiary mt-8">
          Don't have an account?{' '}
          <Link to="/signup" className="text-accent hover:text-accent-hover font-bold no-underline">Sign up</Link>
        </p>
      </div>
    </PageContainer>
  )
}
