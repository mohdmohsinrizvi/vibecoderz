export const ErrorTypes = {
  NETWORK: 'NETWORK_ERROR',
  AUTH: 'AUTH_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION: 'VALIDATION_ERROR',
  PERMISSION: 'PERMISSION_DENIED',
  DUPLICATE: 'DUPLICATE_ERROR',
  SERVER: 'SERVER_ERROR'
}

export function classifySupabaseError(error) {
  if (!error) return null

  const code = error.code
  const message = error.message

  if (code === '42501') return ErrorTypes.PERMISSION
  if (code === '23505') return ErrorTypes.DUPLICATE
  if (code === '23514') return ErrorTypes.VALIDATION
  if (message?.includes('JWT')) return ErrorTypes.AUTH
  if (message?.includes('NetworkError')) return ErrorTypes.NETWORK

  return ErrorTypes.SERVER
}

export function getErrorMessage(errorType) {
  const messages = {
    [ErrorTypes.NETWORK]: "Can't connect. Check your internet.",
    [ErrorTypes.AUTH]: "Sign in to do that.",
    [ErrorTypes.NOT_FOUND]: "This page doesn't exist.",
    [ErrorTypes.VALIDATION]: 'Please check your input.',
    [ErrorTypes.PERMISSION]: "You don't have permission for that.",
    [ErrorTypes.DUPLICATE]: "You've already submitted this.",
    [ErrorTypes.SERVER]: 'Something went wrong. Try again.'
  }
  return messages[errorType] || messages[ErrorTypes.SERVER]
}
