import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCreateProject } from '../../hooks/useProjects'
import { validateProject } from '../../lib/validators'
import { classifySupabaseError, ErrorTypes } from '../../lib/errors'
import Input from '../ui/Input'
import Textarea from '../ui/Textarea'
import Button from '../ui/Button'
import Toast from '../ui/Toast'

export default function ProjectForm() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const createProject = useCreateProject()

  const [form, setForm] = useState({ title: '', url: '', description: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState(null)
  const [toast, setToast] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    const fieldRules = {
      title: { min: 5, max: 100, required: true },
      url: { pattern: /^https?:\/\/.+\..+/, required: true },
      description: { min: 20, max: 500, required: true }
    }
    const errors = {}
    const rules = fieldRules[name]
    if (rules.required && !value.trim()) {
      errors[name] = 'This field is required'
    } else if (rules.min && value.length < rules.min) {
      errors[name] = `Must be at least ${rules.min} characters`
    } else if (rules.max && value.length > rules.max) {
      errors[name] = `Must be ${rules.max} characters or less`
    } else if (rules.pattern && !rules.pattern.test(value)) {
      errors[name] = 'Enter a valid URL starting with https://'
    }
    if (Object.keys(errors).length) {
      setErrors(prev => ({ ...prev, ...errors }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError(null)

    const { valid, errors: validationErrors } = validateProject(form)
    if (!valid) {
      setErrors(validationErrors)
      return
    }

    try {
      const project = await createProject.mutateAsync({
        ...form,
        userId: user.id
      })
      setToast({ message: 'Project live. Go see it.', type: 'success' })
      setTimeout(() => navigate(`/projects/${project.id}`), 500)
    } catch (err) {
      const errorType = classifySupabaseError(err)
      if (errorType === ErrorTypes.DUPLICATE) {
        setErrors({ url: "You've already submitted this project." })
      } else {
        setServerError("Couldn't submit. Check your connection.")
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-bg-subtle/50 border border-border-subtle p-6 sm:p-8 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] animate-[modal-enter_400ms_cubic-bezier(0.16,1,0.3,1)]">
      <Input
        label="Project name"
        name="title"
        value={form.title}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.title}
        placeholder="My awesome project"
        maxLength={100}
      />

      <Input
        label="Project URL"
        name="url"
        type="url"
        value={form.url}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.url}
        placeholder="https://yourproject.vercel.app"
      />

      <Textarea
        label="What does it do?"
        name="description"
        value={form.description}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.description}
        placeholder="Be specific. What problem does it solve?"
        maxLength={500}
      />

      {serverError && (
        <p className="text-sm text-error">{serverError}</p>
      )}

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={createProject.isPending}>
          {createProject.isPending ? 'Submitting...' : 'Submit project'}
        </Button>
        <Button type="button" variant="ghost" onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </form>
  )
}
