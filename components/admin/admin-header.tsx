'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Bell, User, LogOut, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { Icon3D } from '@/components/icons/icon-3d'
import { 
  LayoutDashboard, 
  Newspaper, 
  Coins, 
  Heart, 
  Users, 
  BarChart3, 
  Settings,
  Shield
} from 'lucide-react'

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

export function AdminHeader() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const currentPage = navigation.find(
    (item) => pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
  )

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-4 md:px-6">
      {/* Mobile Menu */}
      <div className="flex items-center gap-4 md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex h-full flex-col">
              <div className="flex h-16 items-center gap-2 border-b border-border px-6">
                <Icon3D type="shield" size="sm" />
                <span className="text-lg font-bold">관리자</span>
              </div>
              <nav className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                            isActive
                              ? 'bg-primary text-primary-foreground'
                              : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
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
              <div className="border-t border-border p-4">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  사이트로 돌아가기
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <h1 className="text-lg font-semibold">{currentPage?.name || '관리자'}</h1>
      </div>

      {/* Desktop Title */}
      <h1 className="hidden text-lg font-semibold text-foreground md:block">
        {currentPage?.name || '관리자'}
      </h1>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/notifications">
            <Bell className="h-5 w-5" />
          </Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/mypage">내 프로필</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/">사이트로 이동</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/auth/logout" className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                로그아웃
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
