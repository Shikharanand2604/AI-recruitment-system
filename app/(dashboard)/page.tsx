import { DashboardStats } from '@/components/dashboard/dashboard-stats'
import { RecentApplications } from '@/components/dashboard/recent-applications'
import { AIInsightsOverview } from '@/components/dashboard/ai-insights-overview'

export default function DashboardPage(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your recruitment pipeline and AI-powered insights.
        </p>
      </div>

      <DashboardStats />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentApplications />
        </div>
        <div>
          <AIInsightsOverview />
        </div>
      </div>
    </div>
  )
}
