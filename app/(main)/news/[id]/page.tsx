import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { ArrowLeft, Eye, ExternalLink, Share2, Bookmark } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { NewsCard } from '@/components/cards/news-card'
import { Icon3D } from '@/components/icons/icon-3d'
import type { News } from '@/lib/types'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const { data: news } = await supabase
    .from('news')
    .select('title, summary')
    .eq('id', id)
    .single()

  if (!news) {
    return { title: '뉴스를 찾을 수 없습니다' }
  }

  return {
    title: news.title,
    description: news.summary || undefined,
  }
}

const categoryLabels: Record<string, string> = {
  policy: '정책',
  digital: '디지털',
  market: '전통시장',
  general: '일반',
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: news, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !news) {
    notFound()
  }

  // Get related news
  const { data: relatedNews } = await supabase
    .from('news')
    .select('*')
    .eq('is_published', true)
    .neq('id', id)
    .eq('category', news.category)
    .order('created_at', { ascending: false })
    .limit(3)

  const typedNews = news as News
  const typedRelatedNews = (relatedNews || []) as News[]

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/news">
          <ArrowLeft className="mr-2 h-4 w-4" />
          뉴스 목록
        </Link>
      </Button>

      {/* Header */}
      <header>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{categoryLabels[typedNews.category] || typedNews.category}</Badge>
          {typedNews.source && (
            <Badge variant="outline">
              <ExternalLink className="mr-1 h-3 w-3" />
              {typedNews.source}
            </Badge>
          )}
        </div>
        <h1 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
          {typedNews.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span>{format(new Date(typedNews.created_at), 'yyyy년 M월 d일', { locale: ko })}</span>
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {typedNews.view_count.toLocaleString()}명이 읽음
          </span>
        </div>
      </header>

      {/* Featured Image */}
      {typedNews.image_url && (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl">
          <Image
            src={typedNews.image_url}
            alt={typedNews.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Summary */}
      {typedNews.summary && (
        <Card className="mt-8 border-l-4 border-l-primary">
          <CardContent className="p-4">
            <p className="text-lg font-medium text-foreground">{typedNews.summary}</p>
          </CardContent>
        </Card>
      )}

      {/* Content */}
      <div className="prose prose-lg mt-8 max-w-none dark:prose-invert">
        {typedNews.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-8">
        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          공유하기
        </Button>
        <Button variant="outline">
          <Bookmark className="mr-2 h-4 w-4" />
          북마크
        </Button>
        {typedNews.source_url && (
          <Button asChild>
            <a href={typedNews.source_url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              원문 보기
            </a>
          </Button>
        )}
      </div>

      {/* Related News */}
      {typedRelatedNews.length > 0 && (
        <section className="mt-12 border-t border-border pt-8">
          <div className="flex items-center gap-3">
            <Icon3D type="news" size="md" />
            <h2 className="text-xl font-bold text-foreground">관련 뉴스</h2>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {typedRelatedNews.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
