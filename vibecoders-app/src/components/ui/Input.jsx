import { forwardRef } from 'react'

const Input = forwardRef(({ label, error, hint, className = '', ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-text-secondary">{label}</label>
      )}
      <input
        ref={ref}
        className={`w-full px-3.5 py-2.5 text-base font-normal text-text-primary bg-bg-subtle border rounded-lg transition-all duration-200 placeholder:text-text-tertiary focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(112,108,255,0.12)] shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.015)] dark:shadow-none ${
          error
            ? 'border-error focus:border-error focus:shadow-[0_0_0_3px_rgba(220,38,38,0.12)]'
            : 'border-border-subtle hover:border-border-default'
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
