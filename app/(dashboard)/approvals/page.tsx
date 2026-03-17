'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AIScoreBadge } from '@/components/ai-score-badge'
import { StatusBadge } from '@/components/status-badge'
import { applications, formatDate, formatCurrency, type ApprovalStatus } from '@/lib/mock-data'
import {
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  CheckSquare,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty'

export default function ApprovalsPage() {
  const [selectedApp, setSelectedApp] = useState<string | null>(null)
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null)
  const [notes, setNotes] = useState('')

  // Filter applications that have offers
  const approvalApplications = applications.filter((app) => app.offerAmount)

  const pendingApprovals = approvalApplications.filter(
    (app) => app.approvalStatus === 'Pending'
  )
  const approvedApprovals = approvalApplications.filter(
    (app) => app.approvalStatus === 'Approved'
  )
  const rejectedApprovals = approvalApplications.filter(
    (app) => app.approvalStatus === 'Rejected'
  )

  const selectedApplication = applications.find((app) => app.id === selectedApp)

  const handleAction = () => {
    // In a real app, this would update the backend
    setSelectedApp(null)
    setActionType(null)
    setNotes('')
  }

  const renderApprovalCard = (app: (typeof applications)[0]) => (
    <Card key={app.id} className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <span className="font-semibold">
                {app.candidate.name.split(' ').map((n) => n[0]).join('')}
              </span>
            </div>
            <div>
              <h3 className="font-semibold">{app.candidate.name}</h3>
              <p className="text-sm text-muted-foreground">{app.jobOpening.title}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <AIScoreBadge score={app.aiScore} />
                <StatusBadge status={app.approvalStatus as ApprovalStatus} />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Offer Amount</p>
              <p className="text-lg font-bold">{formatCurrency(app.offerAmount!)}</p>
            </div>
            <p className="text-xs text-muted-foreground">
              Applied {formatDate(app.applicationDate)}
            </p>
          </div>
        </div>

        {app.offerAmount! > 1000000 && (
          <div className="flex items-center gap-2 border-t bg-amber-50 px-4 py-2 text-sm text-amber-800">
            <AlertTriangle className="size-4" />
            <span>Exceeds $1,000,000 threshold - requires management approval</span>
          </div>
        )}

        <div className="flex items-center justify-between border-t bg-muted/30 px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium">AI Recommendation:</span>
            <span
              className={
                app.aiInsights.recommendation === 'Approve'
                  ? 'text-green-600'
                  : app.aiInsights.recommendation === 'Reject'
                    ? 'text-red-600'
                    : 'text-amber-600'
              }
            >
              {app.aiInsights.recommendation}
            </span>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/applications/${app.id}`}>
                <Eye className="mr-1 size-4" />
                View Details
              </Link>
            </Button>
            {app.approvalStatus === 'Pending' && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={() => {
                    setSelectedApp(app.id)
                    setActionType('reject')
                  }}
                >
                  <ThumbsDown className="mr-1 size-4" />
                  Reject
                </Button>
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    setSelectedApp(app.id)
                    setActionType('approve')
                  }}
                >
                  <ThumbsUp className="mr-1 size-4" />
                  Approve
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Approvals</h1>
        <p className="text-muted-foreground">
          Review and manage offer approvals for high-value candidates.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-amber-100">
              <Clock className="size-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{pendingApprovals.length}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-green-100">
              <CheckCircle className="size-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{approvedApprovals.length}</p>
              <p className="text-sm text-muted-foreground">Approved</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-red-100">
              <XCircle className="size-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{rejectedApprovals.length}</p>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="size-4" />
            Pending
            {pendingApprovals.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {pendingApprovals.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved" className="gap-2">
            <CheckCircle className="size-4" />
            Approved
          </TabsTrigger>
          <TabsTrigger value="rejected" className="gap-2">
            <XCircle className="size-4" />
            Rejected
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-4 space-y-4">
          {pendingApprovals.length === 0 ? (
            <Empty className="py-12">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <CheckSquare />
                </EmptyMedia>
                <EmptyTitle>No pending approvals</EmptyTitle>
                <EmptyDescription>
                  All offers have been reviewed. New approvals will appear here.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            pendingApprovals.map(renderApprovalCard)
          )}
        </TabsContent>

        <TabsContent value="approved" className="mt-4 space-y-4">
          {approvedApprovals.length === 0 ? (
            <Empty className="py-12">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <CheckCircle />
                </EmptyMedia>
                <EmptyTitle>No approved offers yet</EmptyTitle>
                <EmptyDescription>
                  Approved offers will appear here once they are processed.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            approvedApprovals.map(renderApprovalCard)
          )}
        </TabsContent>

        <TabsContent value="rejected" className="mt-4 space-y-4">
          {rejectedApprovals.length === 0 ? (
            <Empty className="py-12">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <XCircle />
                </EmptyMedia>
                <EmptyTitle>No rejected offers</EmptyTitle>
                <EmptyDescription>
                  Rejected offers will appear here for reference.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            rejectedApprovals.map(renderApprovalCard)
          )}
        </TabsContent>
      </Tabs>

      {/* Action Dialog */}
      <Dialog
        open={!!selectedApp && !!actionType}
        onOpenChange={() => {
          setSelectedApp(null)
          setActionType(null)
          setNotes('')
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'approve' ? 'Approve Offer' : 'Reject Offer'}
            </DialogTitle>
            <DialogDescription>
              {actionType === 'approve'
                ? 'This will approve the offer and notify the candidate.'
                : 'This will reject the offer. Please provide a reason.'}
            </DialogDescription>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-4 py-4">
              <div className="rounded-lg bg-muted p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{selectedApplication.candidate.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedApplication.jobOpening.title}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">
                      {formatCurrency(selectedApplication.offerAmount!)}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Notes {actionType === 'reject' && <span className="text-red-500">*</span>}
                </label>
                <Textarea
                  placeholder={
                    actionType === 'approve'
                      ? 'Add any notes (optional)...'
                      : 'Please provide a reason for rejection...'
                  }
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedApp(null)
                setActionType(null)
                setNotes('')
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAction}
              className={
                actionType === 'approve'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-600 hover:bg-red-700'
              }
              disabled={actionType === 'reject' && !notes.trim()}
            >
              {actionType === 'approve' ? (
                <>
                  <CheckCircle className="mr-2 size-4" />
                  Confirm Approval
                </>
              ) : (
                <>
                  <XCircle className="mr-2 size-4" />
                  Confirm Rejection
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
