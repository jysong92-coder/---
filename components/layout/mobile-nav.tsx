'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Newspaper, Coins, Heart, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { name: '홈', href: '/', icon: Home },
  { name: '뉴스', href: '/news', icon: Newspaper },
  { name: '지원금', href: '/subsidies', icon: Coins },
  { name: '복지', href: '/welfare', icon: Heart },
  { name: '마이', href: '/mypage', icon: User },
]

export function MobileNav() {
  const pathname = usePathname()

  // Don't show mobile nav on admin pages
  if (pathname.startsWith('/admin')) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card md:hidden safe-area-bottom">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-1 flex-col items-center justify-center gap-1 py-2 transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <item.icon className={cn('h-5 w-5', isActive && 'text-primary')} />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
