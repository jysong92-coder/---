import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { WelfareCard } from '@/components/cards/welfare-card'
import { Icon3D } from '@/components/icons/icon-3d'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import type { Welfare } from '@/lib/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '복지 혜택',
  description: '소상공인을 위한 건강, 교육, 심리상담 등 다양한 복지 혜택을 확인하세요.',
}

const categories = [
  { id: 'all', label: '전체' },
  { id: 'health', label: '건강' },
  { id: 'education', label: '교육' },
  { id: 'mental', label: '심리' },
  { id: 'leisure', label: '여가' },
  { id: 'insurance', label: '보험' },
]

async function WelfareList() {
  const supabase = await createClient()
  const { data: welfare, error } = await supabase
    .from('welfare')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (error || !welfare || welfare.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Icon3D type="welfare" size="xl" />
        <h3 className="mt-4 text-lg font-semibold text-foreground">복지 정보가 없습니다</h3>
        <p className="mt-2 text-sm text-muted-foreground">새로운 복지 정보가 등록되면 알려드릴게요.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {(welfare as Welfare[]).map((item) => (
        <WelfareCard key={item.id} welfare={item} variant="featured" />
      ))}
    </div>
  )
}

function WelfareListSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Skeleton key={i} className="h-72 rounded-lg" />
      ))}
    </div>
  )
}

export default function WelfarePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <Icon3D type="welfare" size="lg" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">복지 혜택</h1>
          <p className="mt-1 text-muted-foreground">소상공인을 위한 다양한 복지 서비스</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant={category.id === 'all' ? 'default' : 'outline'}
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {category.label}
          </Badge>
        ))}
      </div>

      {/* Welfare List */}
      <Suspense fallback={<WelfareListSkeleton />}>
        <WelfareList />
      </Suspense>
    </div>
  )
}
