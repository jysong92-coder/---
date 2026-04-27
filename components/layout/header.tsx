'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Bell, User, Search, Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { Icon3D } from '@/components/icons/icon-3d'

const navigation = [
  { name: '홈', href: '/' },
  { name: '뉴스', href: '/news' },
  { name: '지원금', href: '/subsidies' },
  { name: '복지', href: '/welfare' },
]

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Icon3D type="shield" size="sm" />
          <span className="text-lg font-bold text-foreground">소상공인 지원센터</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">검색</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/bookmarks">
              <Bookmark className="h-5 w-5" />
              <span className="sr-only">북마크</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/notifications">
              <Bell className="h-5 w-5" />
              <span className="sr-only">알림</span>
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/auth/login">
              <User className="mr-2 h-4 w-4" />
              로그인
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">메뉴 열기</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] p-0">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-border p-4">
                <span className="text-lg font-bold">메뉴</span>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex-1 p-4">
                <div className="flex flex-col gap-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'rounded-lg px-4 py-3 text-base font-medium transition-colors',
                        pathname === item.href
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-2 border-t border-border pt-6">
                  <Link
                    href="/search"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    <Search className="h-5 w-5" />
                    검색
                  </Link>
                  <Link
                    href="/bookmarks"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    <Bookmark className="h-5 w-5" />
                    북마크
                  </Link>
                  <Link
                    href="/notifications"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    <Bell className="h-5 w-5" />
                    알림
                  </Link>
                </div>
              </nav>
              <div className="border-t border-border p-4">
                <Button className="w-full" asChild>
                  <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                    <User className="mr-2 h-4 w-4" />
                    로그인
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
