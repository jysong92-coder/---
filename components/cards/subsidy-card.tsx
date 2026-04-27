'use client'

import Link from 'next/link'
import { format, differenceInDays, isPast, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Calendar, Building2, MapPin, Users, Banknote, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Icon3D } from '@/components/icons/icon-3d'
import { cn } from '@/lib/utils'
import type { Subsidy } from '@/lib/types'

interface SubsidyCardProps {
  subsidy: Subsidy
  variant?: 'default' | 'featured'
}

const categoryLabels: Record<string, string> = {
  general: '일반',
  startup: '창업',
  restart: '재도전',
  emergency: '긴급',
  market: '전통시장',
}

function getDeadlineStatus(endDate: string | null) {
  if (!endDate) return { label: '상시', variant: 'secondary' as const, urgent: false }
  
  const end = parseISO(endDate)
  if (isPast(end)) return { label: '마감', variant: 'destructive' as const, urgent: false }
  
  const daysLeft = differenceInDays(end, new Date())
  if (daysLeft <= 7) return { label: `D-${daysLeft}`, variant: 'destructive' as const, urgent: true }
  if (daysLeft <= 14) return { label: `D-${daysLeft}`, variant: 'secondary' as const, urgent: true }
  return { label: `D-${daysLeft}`, variant: 'outline' as const, urgent: false }
}

export function SubsidyCard({ subsidy, variant = 'default' }: SubsidyCardProps) {
  const deadline = getDeadlineStatus(subsidy.application_end)

  if (variant === 'featured') {
    return (
      <Link href={`/subsidies/${subsidy.id}`}>
        <Card className={cn(
          'group relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1',
          deadline.urgent && 'ring-2 ring-destructive/50'
        )}>
          <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 opacity-10">
            <Icon3D type="money" size="xl" />
          </div>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-wrap gap-2">
                <Badge variant={deadline.variant}>{deadline.label}</Badge>
                <Badge variant="outline">{categoryLabels[subsidy.category] || subsidy.category}</Badge>
              </div>
              <Icon3D type="money" size="md" />
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="line-clamp-2 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {subsidy.title}
            </h3>
            {subsidy.summary && (
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {subsidy.summary}
              </p>
            )}
            <div className="mt-4 grid grid-cols-2 gap-3">
              {subsidy.amount && (
                <div className="flex items-center gap-2 text-sm">
                  <Banknote className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">{subsidy.amount}</span>
                </div>
              )}
              {subsidy.organization && (
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground truncate">{subsidy.organization}</span>
                </div>
              )}
              {subsidy.target_audience && (
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground truncate">{subsidy.target_audience}</span>
                </div>
              )}
              {subsidy.region && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{subsidy.region}</span>
                </div>
              )}
            </div>
            {subsidy.application_end && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-muted p-3 text-sm">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">신청 마감:</span>
                <span className="font-medium text-foreground">
                  {format(parseISO(subsidy.application_end), 'yyyy년 M월 d일', { locale: ko })}
                </span>
              </div>
            )}
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
    <Link href={`/subsidies/${subsidy.id}`}>
      <Card className={cn(
        'group h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1',
        deadline.urgent && 'ring-2 ring-destructive/50'
      )}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              <Badge variant={deadline.variant}>{deadline.label}</Badge>
              <Badge variant="outline">{categoryLabels[subsidy.category] || subsidy.category}</Badge>
            </div>
            <Icon3D type="money" size="sm" />
          </div>
          <h3 className="mt-3 line-clamp-2 font-semibold text-foreground group-hover:text-primary transition-colors">
            {subsidy.title}
          </h3>
          {subsidy.amount && (
            <div className="mt-2 flex items-center gap-2">
              <Banknote className="h-4 w-4 text-primary" />
              <span className="font-bold text-primary">{subsidy.amount}</span>
            </div>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {subsidy.organization && (
              <span className="flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                {subsidy.organization}
              </span>
            )}
            {subsidy.region && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {subsidy.region}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
