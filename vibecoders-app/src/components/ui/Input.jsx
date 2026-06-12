import { forwardRef } from 'react'

const Input = forwardRef(({ label, error, hint, className = '', ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-text-secondary">{label}</label>
      )}
      <input
        ref={ref}
        className={`w-full px-3.5 py-2.5 text-base font-normal text-text-primary bg-bg-subtle border rounded-lg transition-all duration-150 placeholder:text-text-tertiary focus:outline-none focus:ring-3 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.015)] dark:shadow-none ${
          error
            ? 'border-error focus:border-error focus:ring-error-subtle'
            : 'border-border-subtle/80 hover:border-border-default focus:border-accent focus:ring-accent-subtle'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-error">{error}</p>}
      {hint && !error && <p className="text-xs text-text-tertiary">{hint}</p>}
    </div>
  )
})

Input.displayName = 'Input'
export default Input
