'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { AIScoreBadge } from '@/components/ai-score-badge'
import { StatusBadge } from '@/components/status-badge'
import {
  applications,
  formatDate,
  formatCurrency,
  getExperienceLevel,
} from '@/lib/mock-data'
import {
  ArrowLeft,
  Mail,
  Phone,
  Linkedin,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  DollarSign,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Send,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ApplicationDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const application = applications.find((app) => app.id === id)
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false)

  if (!application) {
    notFound()
  }

  const { candidate, jobOpening, aiInsights } = application
  const requiresApproval = application.offerAmount && application.offerAmount > 1000000

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/applications">
            <ArrowLeft className="size-4" />
            <span className="sr-only">Back to applications</span>
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Application Details
          </h1>
          <p className="text-muted-foreground">
            {candidate.name} for {jobOpening.title}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <AIScoreBadge score={application.aiScore} />
          <StatusBadge status={application.status} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Candidate Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Candidate Information</CardTitle>
              <CardDescription>Profile and contact details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6 sm:flex-row">
                <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-2xl font-semibold">
                    {candidate.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">{candidate.name}</h3>
                    <p className="text-muted-foreground">{candidate.currentTitle}</p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="size-4 text-muted-foreground" />
                      <a href={`mailto:${candidate.email}`} className="hover:underline">
                        {candidate.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="size-4 text-muted-foreground" />
                      <a href={`tel:${candidate.phone}`} className="hover:underline">
                        {candidate.phone}
                      </a>
                    </div>
                    {candidate.linkedinUrl && (
                      <div className="flex items-center gap-2 text-sm">
                        <Linkedin className="size-4 text-muted-foreground" />
                        <a
                          href={candidate.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          LinkedIn Profile
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="size-4 text-muted-foreground" />
                      <span>{jobOpening.location}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <Briefcase className="mt-0.5 size-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Experience</p>
                        <p className="text-sm text-muted-foreground">
                          {candidate.yearsOfExperience} years ({getExperienceLevel(candidate.yearsOfExperience)})
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <GraduationCap className="mt-0.5 size-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Education</p>
                        <p className="text-sm text-muted-foreground">{candidate.education}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <DollarSign className="mt-0.5 size-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Expected Salary</p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(candidate.expectedSalary)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="mt-0.5 size-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Applied</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(application.applicationDate)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-medium">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Score Breakdown Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="size-5" />
                AI Score Breakdown
              </CardTitle>
              <CardDescription>
                Detailed scoring analysis for this application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border p-4 text-center">
                  <div className="text-3xl font-bold text-primary">
                    {application.aiScore}
                  </div>
                  <p className="text-sm text-muted-foreground">Overall Score</p>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <div className="text-3xl font-bold">
                    {application.experienceMatchScore}
                  </div>
                  <p className="text-sm text-muted-foreground">Experience Match</p>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <div className="text-3xl font-bold">
                    {application.skillMatchScore}
                  </div>
                  <p className="text-sm text-muted-foreground">Skill Match</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Experience Match</span>
                    <span>{application.experienceMatchScore}%</span>
                  </div>
                  <Progress value={application.experienceMatchScore} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Skill Match</span>
                    <span>{application.skillMatchScore}%</span>
                  </div>
                  <Progress value={application.skillMatchScore} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Salary Alignment</span>
                    <span>{application.salaryAlignmentScore}%</span>
                  </div>
                  <Progress value={application.salaryAlignmentScore} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Approval Workflow Card */}
          {application.offerAmount && (
            <Card>
              <CardHeader>
                <CardTitle>Offer Details</CardTitle>
                <CardDescription>Compensation and approval status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Offer Amount</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(application.offerAmount)}
                    </p>
                  </div>
                  {application.approvalStatus && (
                    <StatusBadge status={application.approvalStatus} />
                  )}
                </div>

                {requiresApproval && (
                  <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
                    <AlertTriangle className="mt-0.5 size-5 text-amber-600" />
                    <div>
                      <p className="font-medium text-amber-800">
                        Management Approval Required
                      </p>
                      <p className="text-sm text-amber-700">
                        Offer exceeds $1,000,000 threshold. This requires management approval before proceeding.
                      </p>
                    </div>
                  </div>
                )}

                {requiresApproval && application.approvalStatus === 'Pending' && (
                  <Dialog open={approvalDialogOpen} onOpenChange={setApprovalDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full">
                        <Send className="mr-2 size-4" />
                        Send for Approval
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Send for Approval</DialogTitle>
                        <DialogDescription>
                          This offer will be sent to management for review.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="rounded-lg bg-muted p-4">
                          <p className="text-sm text-muted-foreground">Candidate</p>
                          <p className="font-medium">{candidate.name}</p>
                        </div>
                        <div className="rounded-lg bg-muted p-4">
                          <p className="text-sm text-muted-foreground">Position</p>
                          <p className="font-medium">{jobOpening.title}</p>
                        </div>
                        <div className="rounded-lg bg-muted p-4">
                          <p className="text-sm text-muted-foreground">Offer Amount</p>
                          <p className="font-medium">{formatCurrency(application.offerAmount!)}</p>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setApprovalDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setApprovalDialogOpen(false)}>
                          Confirm & Send
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* AI Insights Panel */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="size-5 text-primary" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Summary */}
              <div>
                <p className="mb-2 text-sm font-medium">Candidate Summary</p>
                <p className="text-sm text-muted-foreground">{aiInsights.summary}</p>
              </div>

              <Separator />

              {/* Risk Assessment */}
              <div>
                <p className="mb-2 text-sm font-medium">Hiring Risk</p>
                <div
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                    aiInsights.hiringRisk === 'Low'
                      ? 'bg-green-100 text-green-800'
                      : aiInsights.hiringRisk === 'Medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                  }`}
                >
                  {aiInsights.hiringRisk === 'Low' && <CheckCircle className="size-4" />}
                  {aiInsights.hiringRisk === 'Medium' && <AlertTriangle className="size-4" />}
                  {aiInsights.hiringRisk === 'High' && <XCircle className="size-4" />}
                  {aiInsights.hiringRisk} Risk
                </div>
              </div>

              <Separator />

              {/* Recommendation */}
              <div>
                <p className="mb-2 text-sm font-medium">AI Recommendation</p>
                <div
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                    aiInsights.recommendation === 'Approve'
                      ? 'bg-green-100 text-green-800'
                      : aiInsights.recommendation === 'Reject'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {aiInsights.recommendation === 'Approve' && <ThumbsUp className="size-4" />}
                  {aiInsights.recommendation === 'Reject' && <ThumbsDown className="size-4" />}
                  {aiInsights.recommendation === 'Review' && <AlertTriangle className="size-4" />}
                  {aiInsights.recommendation}
                </div>
              </div>

              <Separator />

              {/* Strengths */}
              <div>
                <p className="mb-2 text-sm font-medium text-green-700">Strengths</p>
                <ul className="space-y-2">
                  {aiInsights.strengths.map((strength, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 size-4 shrink-0 text-green-600" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Concerns */}
              <div>
                <p className="mb-2 text-sm font-medium text-amber-700">Concerns</p>
                <ul className="space-y-2">
                  {aiInsights.concerns.map((concern, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600" />
                      <span>{concern}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Position Info */}
          <Card>
            <CardHeader>
              <CardTitle>Position Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Title</p>
                <p className="font-medium">{jobOpening.title}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Department</p>
                <p className="font-medium">{jobOpening.department}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{jobOpening.location}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Salary Range</p>
                <p className="font-medium">
                  {formatCurrency(jobOpening.salaryMin)} - {formatCurrency(jobOpening.salaryMax)}
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm text-muted-foreground">Required Skills</p>
                <div className="flex flex-wrap gap-1">
                  {jobOpening.requiredSkills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
