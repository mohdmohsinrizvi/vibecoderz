import { forwardRef } from 'react'

const Textarea = forwardRef(({ label, error, hint, maxLength, className = '', value, ...props }, ref) => {
  const charCount = value?.length || 0
  const isNearLimit = maxLength && charCount > maxLength * 0.9
  const isAtLimit = maxLength && charCount >= maxLength

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-text-secondary">{label}</label>
      )}
      <textarea
        ref={ref}
        maxLength={maxLength}
        value={value}
        className={`w-full px-3.5 py-2.5 text-base font-normal text-text-primary bg-bg-subtle border rounded-lg transition-all duration-150 placeholder:text-text-tertiary focus:outline-none focus:ring-3 resize-y min-h-[100px] leading-normal shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.015)] dark:shadow-none ${
          error
            ? 'border-error focus:border-error focus:ring-error-subtle'
            : 'border-border-subtle/80 hover:border-border-default focus:border-accent focus:ring-accent-subtle'
        } ${className}`}
        {...props}
      />
      <div className="flex justify-between items-center">
        <div>
          {error && <p className="text-xs text-error">{error}</p>}
          {hint && !error && <p className="text-xs text-text-tertiary">{hint}</p>}
        </div>
        {maxLength && (
          <p className={`text-xs ${isAtLimit ? 'text-error' : isNearLimit ? 'text-warning' : 'text-text-tertiary'}`}>
            {charCount}/{maxLength}
          </p>
        )}
      </div>
    </div>
  )
})

Textarea.displayName = 'Textarea'
export default Textarea
