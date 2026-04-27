import { redirect } from 'next/navigation'
import Link from 'next/link'
import { User, Settings, Bell, Bookmark, LogOut, ChevronRight, Shield } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Icon3D } from '@/components/icons/icon-3d'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '마이페이지',
  description: '내 정보와 설정을 관리하세요.',
}

const menuItems = [
  { icon: User, label: '내 정보 수정', href: '/mypage/profile', description: '개인정보 및 관심사 설정' },
  { icon: Bell, label: '알림 설정', href: '/mypage/notifications', description: '푸시 알림 및 이메일 설정' },
  { icon: Bookmark, label: '북마크', href: '/bookmarks', description: '저장한 지원금, 복지 정보' },
  { icon: Settings, label: '계정 설정', href: '/mypage/settings', description: '비밀번호 변경, 계정 관리' },
]

export default async function MyPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <Card className="mb-6">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Icon3D type="user" size="lg" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">
              {profile?.name || user.email?.split('@')[0]}님
            </h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {profile?.region && (
                <Badge variant="outline">{profile.region}</Badge>
              )}
              {profile?.business_type && (
                <Badge variant="secondary">{profile.business_type}</Badge>
              )}
              {profile?.is_subscribed && (
                <Badge className="bg-primary/10 text-primary">알림 구독 중</Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admin Link */}
      {profile?.is_admin && (
        <Card className="mb-6 border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <Link href="/admin" className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">관리자 대시보드</p>
                  <p className="text-sm text-muted-foreground">사이트 관리 및 통계 확인</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Menu Items */}
      <Card>
        <CardHeader>
          <CardTitle>설정</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <nav className="divide-y divide-border">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between p-4 transition-colors hover:bg-muted"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Link>
            ))}
          </nav>
        </CardContent>
      </Card>

      {/* Logout */}
      <form action="/auth/logout" method="POST" className="mt-6">
        <Button type="submit" variant="outline" className="w-full text-destructive hover:bg-destructive/10">
          <LogOut className="mr-2 h-4 w-4" />
          로그아웃
        </Button>
      </form>
    </div>
  )
}
