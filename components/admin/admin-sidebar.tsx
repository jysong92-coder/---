'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Newspaper, 
  Coins, 
  Heart, 
  Users, 
  Bell, 
  BarChart3, 
  Settings,
  Home,
  Shield
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Icon3D } from '@/components/icons/icon-3d'

const navigation = [
  { name: '대시보드', href: '/admin', icon: LayoutDashboard },
  { name: '방문자 통계', href: '/admin/analytics', icon: BarChart3 },
  { name: '구독자 관리', href: '/admin/subscribers', icon: Users },
  { name: '알림 발송', href: '/admin/notifications', icon: Bell },
  { name: '뉴스 관리', href: '/admin/news', icon: Newspaper },
  { name: '지원금 관리', href: '/admin/subsidies', icon: Coins },
  { name: '복지 관리', href: '/admin/welfare', icon: Heart },
  { name: '설정', href: '/admin/settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-sidebar-border bg-sidebar md:block">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <Icon3D type="shield" size="sm" />
          <span className="text-lg font-bold text-sidebar-foreground">관리자</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                        : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <Home className="h-5 w-5" />
            사이트로 돌아가기
          </Link>
        </div>
      </div>
    </aside>
  )
}
