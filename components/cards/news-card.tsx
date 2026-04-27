'use client'

import Link from 'next/link'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Eye, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { News } from '@/lib/types'

interface NewsCardProps {
  news: News
  variant?: 'default' | 'featured' | 'compact'
}

const categoryLabels: Record<string, string> = {
  policy: '정책',
  digital: '디지털',
  market: '전통시장',
  general: '일반',
}

export function NewsCard({ news, variant = 'default' }: NewsCardProps) {
  const timeAgo = formatDistanceToNow(new Date(news.created_at), {
    addSuffix: true,
    locale: ko,
  })

  if (variant === 'featured') {
    return (
      <Link href={`/news/${news.id}`}>
        <Card className="group overflow-hidden transition-all hover:shadow-lg">
          <div className="relative aspect-[16/9] overflow-hidden">
            {news.image_url ? (
              <Image
                src={news.image_url}
                alt={news.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <span className="text-4xl">📰</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <Badge variant="secondary" className="mb-2 bg-primary/90 text-primary-foreground">
                {categoryLabels[news.category] || news.category}
              </Badge>
              <h3 className="line-clamp-2 text-xl font-bold text-white md:text-2xl">
                {news.title}
              </h3>
              {news.summary && (
                <p className="mt-2 line-clamp-2 text-sm text-white/80">
                  {news.summary}
                </p>
              )}
              <div className="mt-3 flex items-center gap-4 text-xs text-white/60">
                <span>{news.source}</span>
                <span>{timeAgo}</span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {news.view_count.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link href={`/news/${news.id}`}>
        <div className="group flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
            {news.image_url ? (
              <Image
                src={news.image_url}
                alt={news.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <span className="text-lg">📰</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="line-clamp-2 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
              {news.title}
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">{timeAgo}</p>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/news/${news.id}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="relative aspect-[16/10] overflow-hidden">
          {news.image_url ? (
            <Image
              src={news.image_url}
              alt={news.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-3xl">📰</span>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {categoryLabels[news.category] || news.category}
            </Badge>
            {news.source && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <ExternalLink className="h-3 w-3" />
                {news.source}
              </span>
            )}
          </div>
          <h3 className="mt-2 line-clamp-2 font-semibold text-foreground group-hover:text-primary transition-colors">
            {news.title}
          </h3>
          {news.summary && (
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {news.summary}
            </p>
          )}
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>{timeAgo}</span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {news.view_count.toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
