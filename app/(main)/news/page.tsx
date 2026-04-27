import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { NewsCard } from '@/components/cards/news-card'
import { Icon3D } from '@/components/icons/icon-3d'
import { Skeleton } from '@/components/ui/skeleton'
import type { News } from '@/lib/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '뉴스',
  description: '소상공인을 위한 최신 정책 뉴스와 정보를 확인하세요.',
}

async function NewsList() {
  const supabase = await createClient()
  const { data: news, error } = await supabase
    .from('news')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (error || !news || news.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Icon3D type="news" size="xl" />
        <h3 className="mt-4 text-lg font-semibold text-foreground">뉴스가 없습니다</h3>
        <p className="mt-2 text-sm text-muted-foreground">새로운 뉴스가 등록되면 알려드릴게요.</p>
      </div>
    )
  }

  const featuredNews = news[0] as News
  const restNews = news.slice(1) as News[]

  return (
    <div className="space-y-8">
      {/* Featured News */}
      <div className="md:col-span-2">
        <NewsCard news={featuredNews} variant="featured" />
      </div>
      
      {/* News Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {restNews.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>
    </div>
  )
}

function NewsListSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-64 w-full rounded-lg" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-72 rounded-lg" />
        ))}
      </div>
    </div>
  )
}

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <Icon3D type="news" size="lg" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">뉴스</h1>
          <p className="mt-1 text-muted-foreground">소상공인 관련 최신 정책 뉴스</p>
        </div>
      </div>

      {/* News List */}
      <Suspense fallback={<NewsListSkeleton />}>
        <NewsList />
      </Suspense>
    </div>
  )
}
