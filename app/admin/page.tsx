import { Suspense } from 'react'
import Link from 'next/link'
import { Users, Eye, TrendingUp, Bell, ArrowUpRight, Newspaper, Coins, Heart } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Icon3D } from '@/components/icons/icon-3d'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '관리자 대시보드',
}

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon: React.ReactNode
  trend?: { value: number; isUp: boolean }
}

function StatCard({ title, value, description, icon, trend }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <div className={`flex items-center text-xs mt-1 ${trend.isUp ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className={`h-3 w-3 mr-1 ${!trend.isUp && 'rotate-180'}`} />
            {trend.value}% 전일 대비
          </div>
        )}
      </CardContent>
    </Card>
  )
}

async function DashboardStats() {
  const supabase = await createClient()
  
  // Get today's visitor stats
  const today = new Date().toISOString().split('T')[0]
  const { data: todayStats } = await supabase
    .from('visitor_stats')
    .select('*')
    .eq('date', today)
    .single()

  // Get yesterday's stats for comparison
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  const { data: yesterdayStats } = await supabase
    .from('visitor_stats')
    .select('*')
    .eq('date', yesterday)
    .single()

  // Get subscriber count
  const { count: subscriberCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('is_subscribed', true)

  // Get content counts
  const { count: newsCount } = await supabase
    .from('news')
    .select('*', { count: 'exact', head: true })
    .eq('is_published', true)

  const { count: subsidyCount } = await supabase
    .from('subsidies')
    .select('*', { count: 'exact', head: true })
    .eq('is_published', true)

  const { count: welfareCount } = await supabase
    .from('welfare')
    .select('*', { count: 'exact', head: true })
    .eq('is_published', true)

  const visitTrend = todayStats && yesterdayStats && yesterdayStats.total_visits > 0
    ? Math.round(((todayStats.total_visits - yesterdayStats.total_visits) / yesterdayStats.total_visits) * 100)
    : 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="오늘 방문자"
        value={(todayStats?.total_visits || 0).toLocaleString()}
        description={`순 방문자 ${(todayStats?.unique_visitors || 0).toLocaleString()}명`}
        icon={<Eye className="h-4 w-4 text-muted-foreground" />}
        trend={yesterdayStats ? { value: Math.abs(visitTrend), isUp: visitTrend >= 0 } : undefined}
      />
      <StatCard
        title="구독자"
        value={(subscriberCount || 0).toLocaleString()}
        description="알림 수신 동의"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="등록 콘텐츠"
        value={((newsCount || 0) + (subsidyCount || 0) + (welfareCount || 0)).toLocaleString()}
        description={`뉴스 ${newsCount || 0} / 지원금 ${subsidyCount || 0} / 복지 ${welfareCount || 0}`}
        icon={<Newspaper className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="발송 대기"
        value="0"
        description="예약된 알림"
        icon={<Bell className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  )
}

async function RecentSubscribers() {
  const supabase = await createClient()
  const { data: subscribers } = await supabase
    .from('profiles')
    .select('*')
    .eq('is_subscribed', true)
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Icon3D type="user" size="sm" />
            최근 구독자
          </CardTitle>
          <CardDescription>새로 구독한 사용자</CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/subscribers">
            전체보기
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {!subscribers || subscribers.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-4">
            아직 구독자가 없습니다.
          </p>
        ) : (
          <div className="space-y-4">
            {subscribers.map((sub) => (
              <div key={sub.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{sub.name || sub.email}</p>
                    <p className="text-xs text-muted-foreground">
                      {sub.region && `${sub.region} · `}
                      {sub.age_group || '정보 없음'}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(sub.created_at).toLocaleDateString('ko-KR')}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function QuickActions() {
  const actions = [
    { label: '뉴스 작성', href: '/admin/news/new', icon: <Icon3D type="news" size="sm" /> },
    { label: '지원금 등록', href: '/admin/subsidies/new', icon: <Icon3D type="money" size="sm" /> },
    { label: '복지 등록', href: '/admin/welfare/new', icon: <Icon3D type="welfare" size="sm" /> },
    { label: '알림 발송', href: '/admin/notifications/new', icon: <Icon3D type="bell" size="sm" /> },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>빠른 작업</CardTitle>
        <CardDescription>자주 사용하는 기능</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <Button key={action.href} variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
              <Link href={action.href}>
                {action.icon}
                <span className="text-xs">{action.label}</span>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function StatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16" />
            <Skeleton className="mt-2 h-3 w-32" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">대시보드</h2>
        <p className="text-muted-foreground">사이트 현황을 한눈에 확인하세요.</p>
      </div>

      <Suspense fallback={<StatsSkeleton />}>
        <DashboardStats />
      </Suspense>

      <div className="grid gap-6 md:grid-cols-2">
        <Suspense fallback={<Skeleton className="h-80" />}>
          <RecentSubscribers />
        </Suspense>
        <QuickActions />
      </div>
    </div>
  )
}
