'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { AIScoreBadge } from '@/components/ai-score-badge'
import { StatusBadge } from '@/components/status-badge'
import { applications, formatDate } from '@/lib/mock-data'
import { ArrowRight } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export function RecentApplications() {
  const recentApps = applications.slice(0, 5)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Applications</CardTitle>
          <CardDescription>Latest candidate applications across all positions</CardDescription>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/applications" className="gap-1">
            View all <ArrowRight className="size-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>AI Score</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentApps.map((app) => (
              <TableRow key={app.id}>
                <TableCell>
                  <Link
                    href={`/applications/${app.id}`}
                    className="font-medium hover:underline"
                  >
                    {app.candidate.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {app.candidate.currentTitle}
                  </p>
                </TableCell>
                <TableCell>{app.jobOpening.title}</TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(app.applicationDate)}
                </TableCell>
                <TableCell>
                  <AIScoreBadge score={app.aiScore} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={app.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export function RecentApplicationsSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <Skeleton className="mb-2 h-5 w-40" />
          <Skeleton className="h-4 w-60" />
        </div>
        <Skeleton className="h-9 w-20" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
