import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { SubsidyCard } from '@/components/cards/subsidy-card'
import { Icon3D } from '@/components/icons/icon-3d'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import type { Subsidy } from '@/lib/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '지원금 정보',
  description: '소상공인을 위한 정부 및 지자체 지원금 정보를 확인하세요.',
}

const categories = [
  { id: 'all', label: '전체' },
  { id: 'general', label: '일반' },
  { id: 'startup', label: '창업' },
  { id: 'restart', label: '재도전' },
  { id: 'emergency', label: '긴급' },
  { id: 'market', label: '전통시장' },
]

async function SubsidyList() {
  const supabase = await createClient()
  const { data: subsidies, error } = await supabase
    .from('subsidies')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (error || !subsidies || subsidies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Icon3D type="money" size="xl" />
        <h3 className="mt-4 text-lg font-semibold text-foreground">지원금 정보가 없습니다</h3>
        <p className="mt-2 text-sm text-muted-foreground">새로운 지원금 정보가 등록되면 알려드릴게요.</p>
      </div>
    )
  }

  // Separate urgent and regular subsidies
  const urgentSubsidies = (subsidies as Subsidy[]).filter(s => {
    if (!s.application_end) return false
    const daysLeft = Math.ceil((new Date(s.application_end).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    return daysLeft > 0 && daysLeft <= 14
  })
  const regularSubsidies = (subsidies as Subsidy[]).filter(s => !urgentSubsidies.includes(s))

  return (
    <div className="space-y-12">
      {/* Urgent Deadlines */}
      {urgentSubsidies.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Badge variant="destructive" className="animate-pulse">마감 임박</Badge>
            <h2 className="text-xl font-bold text-foreground">곧 마감되는 지원금</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {urgentSubsidies.map((subsidy) => (
              <SubsidyCard key={subsidy.id} subsidy={subsidy} variant="featured" />
            ))}
          </div>
        </section>
      )}

      {/* All Subsidies */}
      <section>
        <h2 className="text-xl font-bold text-foreground mb-6">전체 지원금</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {regularSubsidies.map((subsidy) => (
            <SubsidyCard key={subsidy.id} subsidy={subsidy} variant="featured" />
          ))}
        </div>
      </section>
    </div>
  )
}

function SubsidyListSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Skeleton key={i} className="h-80 rounded-lg" />
      ))}
    </div>
  )
}

export default function SubsidiesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <Icon3D type="money" size="lg" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">지원금 정보</h1>
          <p className="mt-1 text-muted-foreground">정부 및 지자체에서 제공하는 소상공인 지원금</p>
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

      {/* Subsidy List */}
      <Suspense fallback={<SubsidyListSkeleton />}>
        <SubsidyList />
      </Suspense>
    </div>
  )
}
