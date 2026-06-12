import { useLeaderboard } from '../hooks/useLeaderboard'
import PageContainer from '../components/layout/PageContainer'
import LeaderboardTable from '../components/leaderboard/LeaderboardTable'

export default function Leaderboard() {
  const { data, isLoading } = useLeaderboard()

  return (
    <PageContainer>
      <div className="mb-10 animate-[modal-enter_300ms_cubic-bezier(0.16,1,0.3,1)]">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-text-primary mb-2">
          Builders
        </h1>
        <p className="text-text-secondary text-sm sm:text-base">
          Ranked by total community score.
        </p>
      </div>
      <LeaderboardTable data={data} isLoading={isLoading} />
    </PageContainer>
  )
}
