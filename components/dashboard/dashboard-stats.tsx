'use client'

import { Users, FileText, Sparkles, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getDashboardStats } from '@/lib/mock-data'

const stats = getDashboardStats()

const statCards = [
  {
    title: 'Total Candidates',
    value: stats.totalCandidates,
    description: 'Registered in the system',
    icon: Users,
    trend: '+12% from last month',
  },
  {
    title: 'Active Applications',
    value: stats.activeApplications,
    description: 'In progress',
    icon: FileText,
    trend: '+5% from last month',
  },
  {
    title: 'High Priority',
    value: stats.highPriorityCandidates,
    description: 'AI Score 85+',
    icon: Sparkles,
    trend: 'Top candidates',
  },
  {
    title: 'Pending Approvals',
    value: stats.pendingApprovals,
    description: 'Awaiting review',
    icon: Clock,
    trend: 'Requires attention',
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function DashboardStatsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            <div className="size-4 animate-pulse rounded bg-muted" />
          </CardHeader>
          <CardContent>
            <div className="mb-1 h-8 w-12 animate-pulse rounded bg-muted" />
            <div className="h-3 w-20 animate-pulse rounded bg-muted" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
