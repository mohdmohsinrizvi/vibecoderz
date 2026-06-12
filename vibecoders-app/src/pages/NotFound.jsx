import { Link } from 'react-router-dom'
import PageContainer from '../components/layout/PageContainer'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <PageContainer className="text-center">
      <h1 className="text-3xl font-bold text-text-primary mb-2">404</h1>
      <p className="text-text-secondary mb-6">This page doesn't exist.</p>
      <Link to="/">
        <Button variant="secondary">← Back to projects</Button>
      </Link>
    </PageContainer>
  )
}
