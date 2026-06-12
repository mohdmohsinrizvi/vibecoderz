import { formatDistanceToNowStrict } from 'date-fns'

export function formatRelativeTime(date) {
  return formatDistanceToNowStrict(new Date(date), { addSuffix: true })
}

export function formatNumber(num) {
  if (num >= 10000) {
    return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(num)
  }
  return num.toString()
}

export function validateUrl(url) {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}
