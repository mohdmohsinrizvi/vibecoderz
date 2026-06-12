import { forwardRef } from 'react'

const variants = {
  primary: 'bg-accent text-text-inverse hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.97] shadow-[0_1px_2px_rgba(79,70,229,0.15),inset_0_1px_0_rgba(255,255,255,0.15)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]',
  secondary: 'bg-bg-subtle text-text-primary border border-border-subtle/80 hover:bg-bg-muted/50 hover:border-border-default shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:scale-[1.01] active:scale-[0.98]',
  ghost: 'bg-transparent text-text-secondary hover:bg-bg-subtle hover:text-text-primary',
  destructive: 'bg-transparent text-error border border-transparent hover:bg-error-subtle hover:border-error'
}

const sizes = {
  sm: 'px-2.5 py-1.5 text-xs rounded-md',
  md: 'px-3.5 py-2 text-sm rounded-md',
  lg: 'px-4 py-2.5 text-base rounded-lg'
}

const Button = forwardRef(({ variant = 'primary', size = 'md', className = '', disabled, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 font-medium transition-all duration-100 active:scale-[0.97] disabled:active:scale-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'
export default Button
