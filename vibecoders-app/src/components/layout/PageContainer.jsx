export default function PageContainer({ children, className = '' }) {
  const hasMaxWidth = className.includes('max-w-')
  return (
    <main id="main-content" className={`w-full ${hasMaxWidth ? '' : 'max-w-[720px]'} mx-auto px-4 sm:px-6 lg:px-8 py-12 ${className}`}>
      {children}
    </main>
  )
}
