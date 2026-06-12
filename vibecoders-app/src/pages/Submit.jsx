import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PageContainer from '../components/layout/PageContainer'
import ProjectForm from '../components/project/ProjectForm'

export default function Submit() {
  const { user, loading } = useAuth()

  if (loading) return null
  if (!user) return <Navigate to="/login" state={{ redirect: '/submit' }} replace />

  return (
    <PageContainer>
      <div className="mb-10 animate-[modal-enter_300ms_cubic-bezier(0.16,1,0.3,1)]">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-text-primary mb-2">
          Submit a project
        </h1>
        <p className="text-text-secondary text-sm sm:text-base">
          Share what you've been building. 3 fields, takes 2 minutes.
        </p>
      </div>
      <ProjectForm />
    </PageContainer>
  )
}
