'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { applications } from '@/lib/mock-data'
import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'

export function AIInsightsOverview() {
  const avgScore = Math.round(
    applications.reduce((acc, app) => acc + app.aiScore, 0) / applications.length
  )

  const highRiskCount = applications.filter(
    (app) => app.aiInsights.hiringRisk === 'High'
  ).length

  const approvedCount = applications.filter(
    (app) => app.aiInsights.recommendation === 'Approve'
  ).length

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Insights Summary</CardTitle>
        <CardDescription>Automated analysis overview</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="size-4" />
              Average AI Score
            </span>
            <span className="font-medium">{avgScore}/100</span>
          </div>
          <Progress value={avgScore} className="h-2" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-green-50 p-3">
            <span className="flex items-center gap-2 text-sm text-green-800">
              <CheckCircle className="size-4" />
              Recommended to Approve
            </span>
            <span className="font-semibold text-green-800">{approvedCount}</span>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-amber-50 p-3">
            <span className="flex items-center gap-2 text-sm text-amber-800">
              <AlertTriangle className="size-4" />
              High Risk Candidates
            </span>
            <span className="font-semibold text-amber-800">{highRiskCount}</span>
          </div>
        </div>

        <div className="rounded-lg border bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">
            AI recommendations are based on experience match, skill alignment, and salary expectations.
            Always verify with manual review.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
