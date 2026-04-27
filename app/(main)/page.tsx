import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowRight, Newspaper, Coins, Heart, Bell, TrendingUp, Shield } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { NewsCard } from '@/components/cards/news-card'
import { SubsidyCard } from '@/components/cards/subsidy-card'
import { WelfareCard } from '@/components/cards/welfare-card'
import { Icon3D } from '@/components/icons/icon-3d'
import type { News, Subsidy, Welfare } from '@/lib/types'

// Hero Section
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/80 py-16 md:py-24">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="text-center md:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
              <TrendingUp className="h-4 w-4" />
              2026년 최신 지원 정책 업데이트
            </div>
            <h1 className="text-balance text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              소상공인을 위한
              <br />
              <span className="text-amber-300">맞춤형 지원 정보</span>
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-white/80 md:text-xl">
              정부 지원금, 복지 혜택, 최신 정책 뉴스까지
              <br className="hidden md:block" />
              소상공인에게 필요한 모든 정보를 한눈에
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/subsidies">
                  <Coins className="mr-2 h-5 w-5" />
                  지원금 찾아보기
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20" asChild>
                <Link href="/auth/sign-up">
                  <Bell className="mr-2 h-5 w-5" />
                  알림 구독하기
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="hidden md:flex md:justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-white/5 blur-2xl" />
              <div className="relative grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                  <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                    <Icon3D type="money" size="lg" />
                    <p className="mt-2 font-semibold text-white">지원금</p>
                    <p className="text-sm text-white/70">최대 1억원</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                    <Icon3D type="welfare" size="lg" />
                    <p className="mt-2 font-semibold text-white">복지</p>
                    <p className="text-sm text-white/70">건강검진 지원</p>
                  </div>
                </div>
                <div className="mt-8 flex flex-col gap-4">
                  <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                    <Icon3D type="news" size="lg" />
                    <p className="mt-2 font-semibold text-white">뉴스</p>
                    <p className="text-sm text-white/70">실시간 정책</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                    <Icon3D type="bell" size="lg" />
                    <p className="mt-2 font-semibold text-white">알림</p>
                    <p className="text-sm text-white/70">맞춤 알림</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Stats Section
function StatsSection() {
  const stats = [
    { label: '누적 지원금 정보', value: '500+', icon: 'money' as const },
    { label: '복지 혜택', value: '200+', icon: 'welfare' as const },
    { label: '월간 방문자', value: '10만+', icon: 'user' as const },
    { label: '구독자', value: '5천+', icon: 'bell' as const },
  ]

  return (
    <section className="border-b border-border bg-card py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mx-auto mb-3 flex justify-center">
                <Icon3D type={stat.icon} size="md" />
              </div>
              <div className="text-2xl font-bold text-foreground md:text-3xl">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Category Section
function CategorySection() {
  const categories = [
    {
      title: '최신 뉴스',
      description: '소상공인 관련 최신 정책 뉴스',
      icon: <Icon3D type="news" size="lg" />,
      href: '/news',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: '지원금 정보',
      description: '정부 및 지자체 지원금 안내',
      icon: <Icon3D type="money" size="lg" />,
      href: '/subsidies',
      color: 'from-green-500 to-green-600',
    },
    {
      title: '복지 혜택',
      description: '건강, 교육, 심리상담 등 복지',
      icon: <Icon3D type="welfare" size="lg" />,
      href: '/welfare',
      color: 'from-pink-500 to-pink-600',
    },
  ]

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">카테고리</h2>
          <p className="mt-2 text-muted-foreground">필요한 정보를 빠르게 찾아보세요</p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.title} href={category.href}>
              <Card className="group h-full transition-all hover:shadow-lg hover:-translate-y-1">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 transition-transform group-hover:scale-110">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{category.description}</p>
                  <Button variant="ghost" className="mt-4 group-hover:text-primary">
                    자세히 보기
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// News Section
async function NewsSection() {
  const supabase = await createClient()
  const { data: news } = await supabase
    .from('news')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(4)

  if (!news || news.length === 0) return null

  return (
    <section className="bg-muted/50 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon3D type="news" size="md" />
            <div>
              <h2 className="text-2xl font-bold text-foreground">최신 뉴스</h2>
              <p className="text-sm text-muted-foreground">소상공인 관련 최신 소식</p>
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link href="/news">
              전체보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {(news as News[]).map((item, index) => (
            <NewsCard key={item.id} news={item} variant={index === 0 ? 'featured' : 'default'} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Subsidies Section
async function SubsidiesSection() {
  const supabase = await createClient()
  const { data: subsidies } = await supabase
    .from('subsidies')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(3)

  if (!subsidies || subsidies.length === 0) return null

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon3D type="money" size="md" />
            <div>
              <h2 className="text-2xl font-bold text-foreground">지원금 정보</h2>
              <p className="text-sm text-muted-foreground">놓치지 말아야 할 지원금</p>
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link href="/subsidies">
              전체보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {(subsidies as Subsidy[]).map((item) => (
            <SubsidyCard key={item.id} subsidy={item} variant="featured" />
          ))}
        </div>
      </div>
    </section>
  )
}

// Welfare Section
async function WelfareSection() {
  const supabase = await createClient()
  const { data: welfare } = await supabase
    .from('welfare')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(3)

  if (!welfare || welfare.length === 0) return null

  return (
    <section className="bg-muted/50 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon3D type="welfare" size="md" />
            <div>
              <h2 className="text-2xl font-bold text-foreground">복지 혜택</h2>
              <p className="text-sm text-muted-foreground">소상공인을 위한 복지 서비스</p>
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link href="/welfare">
              전체보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {(welfare as Welfare[]).map((item) => (
            <WelfareCard key={item.id} welfare={item} variant="featured" />
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CTASection() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/80">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-accent/20 blur-2xl" />
          <CardContent className="relative flex flex-col items-center p-8 text-center md:p-12">
            <Icon3D type="bell" size="lg" />
            <h2 className="mt-4 text-2xl font-bold text-white md:text-3xl">
              맞춤형 알림 서비스
            </h2>
            <p className="mt-3 max-w-xl text-white/80">
              관심 있는 지원금과 복지 정보를 놓치지 마세요.
              새로운 정보가 등록되면 바로 알려드립니다.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/auth/sign-up">무료로 구독하기</Link>
              </Button>
              <Button size="lg" className="border border-white/60 hover:opacity-90" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff' }} asChild>
                <Link href="/about">더 알아보기</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

// Loading Skeleton
function SectionSkeleton() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Skeleton className="h-8 w-48" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <CategorySection />
      <Suspense fallback={<SectionSkeleton />}>
        <NewsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <SubsidiesSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <WelfareSection />
      </Suspense>
      <CTASection />
    </>
  )
}
