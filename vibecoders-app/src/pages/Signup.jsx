import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PageContainer from '../components/layout/PageContainer'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function Signup() {
  const { signUp, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '', username: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }))
    setServerError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError(null)

    const newErrors = {}
    if (!form.email) newErrors.email = 'Email is required'
    if (!form.password) newErrors.password = 'Password is required'
    else if (form.password.length < 8) newErrors.password = 'Must be at least 8 characters'
    if (!form.username) newErrors.username = 'Username is required'
    else if (form.username.length < 3) newErrors.username = 'Must be at least 3 characters'
    else if (!/^[a-zA-Z0-9_-]+$/.test(form.username)) newErrors.username = 'Only letters, numbers, - and _'

    if (Object.keys(newErrors).length) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      await signUp(form.email, form.password, form.username)
      setSuccess(true)
    } catch (err) {
      if (err.message?.includes('already')) {
        setServerError('An account with this email already exists. Sign in?')
      } else if (err.message?.includes('username')) {
        setErrors({ username: 'Username taken. Try something else.' })
      } else {
        setServerError('Something went wrong. Try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    try {
      await signInWithGoogle()
    } catch {
      setServerError('Google sign in failed. Try again.')
    }
  }

  if (success) {
    return (
      <PageContainer className="max-w-[440px]">
        <div className="bg-bg-subtle/50 border border-border-subtle rounded-2xl p-6 sm:p-8 text-center shadow-[0_1px_3px_rgba(0,0,0,0.02)] animate-[modal-enter_400ms_cubic-bezier(0.16,1,0.3,1)]">
          <h1 className="text-2xl font-black tracking-tight text-text-primary mb-3 font-sans">
            Check your email
          </h1>
          <p className="text-text-secondary text-sm leading-relaxed">
            We sent a confirmation link to <strong className="text-text-primary font-semibold">{form.email}</strong>. Please check your inbox to activate your account.
          </p>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer className="max-w-[440px]">
      <div className="bg-bg-subtle/50 border border-border-subtle rounded-2xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)] animate-[modal-enter_400ms_cubic-bezier(0.16,1,0.3,1)]">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-black tracking-tight text-text-primary mb-2 font-sans">
            Create account
          </h1>
          <p className="text-text-secondary text-sm">
            Join the builder community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            error={errors.username}
            placeholder="yourname"
          />
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
            placeholder="Min 8 characters"
          />

          {serverError && (
            <p className="text-xs font-semibold text-error bg-error/5 border border-error/15 px-3 py-2 rounded-lg">
              {serverError}
            </p>
          )}

          <Button type="submit" disabled={loading} className="w-full mt-2 py-2.5 font-semibold text-sm">
            {loading ? 'Creating account...' : 'Create account'}
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
          Already have an account?{' '}
          <Link to="/login" className="text-accent hover:text-accent-hover font-bold no-underline">Sign in</Link>
        </p>
      </div>
    </PageContainer>
  )
}
