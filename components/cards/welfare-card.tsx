'use client'

import Link from 'next/link'
import { Building2, MapPin, Users, Gift, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Icon3D } from '@/components/icons/icon-3d'
import type { Welfare } from '@/lib/types'

interface WelfareCardProps {
  welfare: Welfare
  variant?: 'default' | 'featured'
}

const categoryLabels: Record<string, string> = {
  health: '건강',
  education: '교육',
  mental: '심리',
  leisure: '여가',
  insurance: '보험',
  general: '일반',
}

const categoryIcons: Record<string, 'welfare' | 'gift' | 'shield' | 'user'> = {
  health: 'shield',
  education: 'gift',
  mental: 'welfare',
  leisure: 'gift',
  insurance: 'shield',
  general: 'welfare',
}

export function WelfareCard({ welfare, variant = 'default' }: WelfareCardProps) {
  const iconType = categoryIcons[welfare.category] || 'welfare'

  if (variant === 'featured') {
    return (
      <Link href={`/welfare/${welfare.id}`}>
        <Card className="group relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
          <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 opacity-10">
            <Icon3D type={iconType} size="xl" />
          </div>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-2">
              <Badge className="bg-accent text-accent-foreground">
                {categoryLabels[welfare.category] || welfare.category}
              </Badge>
              <Icon3D type={iconType} size="md" />
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="line-clamp-2 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {welfare.title}
            </h3>
            {welfare.summary && (
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {welfare.summary}
              </p>
            )}
            {welfare.benefits && (
              <div className="mt-4 flex items-start gap-2 rounded-lg bg-accent/10 p-3">
                <Gift className="h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="text-xs font-medium text-accent">혜택</p>
                  <p className="mt-0.5 text-sm font-semibold text-foreground">{welfare.benefits}</p>
                </div>
              </div>
            )}
            <div className="mt-4 grid grid-cols-2 gap-3">
              {welfare.organization && (
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground truncate">{welfare.organization}</span>
                </div>
              )}
              {welfare.target_audience && (
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground truncate">{welfare.target_audience}</span>
                </div>
              )}
              {welfare.region && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{welfare.region}</span>
                </div>
              )}
            </div>
            <Button className="mt-4 w-full group-hover:bg-primary" variant="outline">
              자세히 보기
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={`/welfare/${welfare.id}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <Badge className="bg-accent/80 text-accent-foreground">
              {categoryLabels[welfare.category] || welfare.category}
            </Badge>
            <Icon3D type={iconType} size="sm" />
          </div>
          <h3 className="mt-3 line-clamp-2 font-semibold text-foreground group-hover:text-primary transition-colors">
            {welfare.title}
          </h3>
          {welfare.benefits && (
            <div className="mt-2 flex items-center gap-2">
              <Gift className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent truncate">{welfare.benefits}</span>
            </div>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {welfare.organization && (
              <span className="flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                {welfare.organization}
              </span>
            )}
            {welfare.region && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {welfare.region}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
