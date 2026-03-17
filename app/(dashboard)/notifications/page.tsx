'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { notifications, type Notification } from '@/lib/mock-data'
import {
  Bell,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  Mail,
  Eye,
  Check,
  CheckCheck,
  Trash2,
} from 'lucide-react'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty'
import { cn } from '@/lib/utils'

const notificationIcons: Record<Notification['type'], React.ComponentType<{ className?: string }>> = {
  'high-priority': Sparkles,
  'approval-required': AlertTriangle,
  'approval-completed': CheckCircle,
}

const notificationColors: Record<Notification['type'], string> = {
  'high-priority': 'bg-blue-100 text-blue-600',
  'approval-required': 'bg-amber-100 text-amber-600',
  'approval-completed': 'bg-green-100 text-green-600',
}

function formatRelativeTime(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  return date.toLocaleDateString()
}

export default function NotificationsPage() {
  const [notificationState, setNotificationState] = useState(notifications)

  const unreadCount = notificationState.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotificationState((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotificationState((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotificationState((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated on high-priority candidates and approval workflows.
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckCheck className="mr-2 size-4" />
            Mark all as read
          </Button>
        )}
      </div>

      {/* Summary */}
      <div className="flex items-center gap-4">
        <Badge variant={unreadCount > 0 ? 'default' : 'secondary'}>
          {unreadCount} unread
        </Badge>
        <Badge variant="outline">{notificationState.length} total</Badge>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="size-5" />
            All Notifications
          </CardTitle>
          <CardDescription>
            Email-style alerts for important recruitment events
          </CardDescription>
        </CardHeader>
        <CardContent>
          {notificationState.length === 0 ? (
            <Empty className="py-12">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Bell />
                </EmptyMedia>
                <EmptyTitle>No notifications</EmptyTitle>
                <EmptyDescription>
                  You are all caught up. New notifications will appear here.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <div className="divide-y">
              {notificationState.map((notification) => {
                const Icon = notificationIcons[notification.type]
                return (
                  <div
                    key={notification.id}
                    className={cn(
                      'flex items-start gap-4 py-4 transition-colors',
                      !notification.read && 'bg-primary/5'
                    )}
                  >
                    {/* Icon */}
                    <div
                      className={cn(
                        'flex size-10 shrink-0 items-center justify-center rounded-full',
                        notificationColors[notification.type]
                      )}
                    >
                      <Icon className="size-5" />
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3
                              className={cn(
                                'text-sm font-medium',
                                !notification.read && 'font-semibold'
                              )}
                            >
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <span className="size-2 rounded-full bg-primary" />
                            )}
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                          <p className="mt-2 text-xs text-muted-foreground">
                            {formatRelativeTime(notification.timestamp)}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex shrink-0 items-center gap-1">
                          {notification.applicationId && (
                            <Button variant="ghost" size="icon" className="size-8" asChild>
                              <Link href={`/applications/${notification.applicationId}`}>
                                <Eye className="size-4" />
                                <span className="sr-only">View application</span>
                              </Link>
                            </Button>
                          )}
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="size-4" />
                              <span className="sr-only">Mark as read</span>
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-muted-foreground hover:text-destructive"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <Trash2 className="size-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notification Types Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Notification Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-blue-100">
                <Sparkles className="size-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">High Priority Candidate</p>
                <p className="text-xs text-muted-foreground">AI Score 85+</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-amber-100">
                <AlertTriangle className="size-4 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Approval Required</p>
                <p className="text-xs text-muted-foreground">Pending review</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="size-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Approval Completed</p>
                <p className="text-xs text-muted-foreground">Action taken</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
