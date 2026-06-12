export const projectSchema = {
  title: { min: 5, max: 100, required: true },
  url: { pattern: /^https?:\/\/.+\..+/, required: true },
  description: { min: 20, max: 500, required: true }
}

export const commentSchema = {
  content: { min: 1, max: 500, required: true }
}

export const usernameSchema = {
  username: { min: 3, max: 30, pattern: /^[a-zA-Z0-9_-]+$/ }
}

export function validateField(value, rules) {
  const errors = []

  if (rules.required && (!value || value.trim() === '')) {
    errors.push('This field is required')
    return errors
  }

  if (rules.min && value.length < rules.min) {
    errors.push(`Must be at least ${rules.min} characters`)
  }

  if (rules.max && value.length > rules.max) {
    errors.push(`Must be ${rules.max} characters or less`)
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    errors.push('Invalid format')
  }

  return errors
}

export function validateProject(data) {
  const errors = {}

  const titleErrors = validateField(data.title, projectSchema.title)
  if (titleErrors.length) errors.title = titleErrors[0]

  const urlErrors = validateField(data.url, projectSchema.url)
  if (urlErrors.length) errors.url = urlErrors[0]

  const descErrors = validateField(data.description, projectSchema.description)
  if (descErrors.length) errors.description = descErrors[0]

  return {
    valid: Object.keys(errors).length === 0,
    errors
  }
}

export function validateComment(data) {
  const errors = {}

  const contentErrors = validateField(data.content, commentSchema.content)
  if (contentErrors.length) errors.content = contentErrors[0]

  return {
    valid: Object.keys(errors).length === 0,
    errors
  }
}

export function validateUsername(data) {
  const errors = {}

  const usernameErrors = validateField(data.username, usernameSchema.username)
  if (usernameErrors.length) errors.username = usernameErrors[0]

  return {
    valid: Object.keys(errors).length === 0,
    errors
  }
}
