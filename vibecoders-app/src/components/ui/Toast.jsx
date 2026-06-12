import { useEffect, useState } from 'react'

export default function Toast({ message, type = 'success', onClose }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 200)
    }, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const styles = {
    success: 'bg-success-subtle text-success border-success',
    error: 'bg-error-subtle text-error border-error'
  }

  return (
    <div
      className={`fixed top-[68px] left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 z-300 shadow-[0_4px_12px_rgba(0,0,0,0.1)] border whitespace-nowrap transition-all duration-200 ${styles[type]} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
    >
      {type === 'success' && <span>✓</span>}
      {type === 'error' && <span>✕</span>}
      {message}
    </div>
  )
}
