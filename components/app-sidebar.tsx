'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  FileText,
  CheckSquare,
  Bell,
  Sparkles,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar'
import { Badge } from '@/components/ui/badge'
import { notifications } from '@/lib/mock-data'

const navItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Candidates',
    href: '/candidates',
    icon: Users,
  },
  {
    title: 'Applications',
    href: '/applications',
    icon: FileText,
  },
  {
    title: 'Approvals',
    href: '/approvals',
    icon: CheckSquare,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const unreadNotifications = notifications.filter((n) => !n.read).length

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">AI Recruitment</span>
            <span className="text-xs text-muted-foreground">Management System</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Alerts</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/notifications'}>
                  <Link href="/notifications" className="flex w-full items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Bell className="size-4" />
                      <span>Notifications</span>
                    </span>
                    {unreadNotifications > 0 && (
                      <Badge variant="destructive" className="ml-auto size-5 justify-center rounded-full p-0 text-xs">
                        {unreadNotifications}
                      </Badge>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Users className="size-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">HR Admin</span>
            <span className="text-xs text-muted-foreground">admin@company.com</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
