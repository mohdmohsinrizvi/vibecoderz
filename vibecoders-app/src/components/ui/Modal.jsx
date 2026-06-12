import { useEffect } from 'react'

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-200 p-4" onClick={onClose}>
      <div
        className="bg-bg-base border border-border-default rounded-xl p-6 w-full max-w-[480px] shadow-[0_24px_48px_rgba(0,0,0,0.12)] max-[640px]:rounded-b-none max-[640px]:fixed max-[640px]:bottom-0 max-[640px]:max-w-full max-[640px]:animate-[sheet-enter_250ms_cubic-bezier(0.32,0.72,0,1)] animate-[modal-enter_200ms_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          <button onClick={onClose} className="text-text-tertiary hover:text-text-primary transition-colors p-1" aria-label="Close">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
