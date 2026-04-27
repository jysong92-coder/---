import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format, differenceInDays, isPast, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import { ArrowLeft, Calendar, Building2, MapPin, Users, Banknote, FileText, ExternalLink, Share2, Bookmark, Clock, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SubsidyCard } from '@/components/cards/subsidy-card'
import { Icon3D } from '@/components/icons/icon-3d'
import type { Subsidy } from '@/lib/types'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const { data: subsidy } = await supabase
    .from('subsidies')
    .select('title, summary')
    .eq('id', id)
    .single()

  if (!subsidy) {
    return { title: '지원금을 찾을 수 없습니다' }
  }

  return {
    title: subsidy.title,
    description: subsidy.summary || undefined,
  }
}

const categoryLabels: Record<string, string> = {
  general: '일반',
  startup: '창업',
  restart: '재도전',
  emergency: '긴급',
  market: '전통시장',
}

function getDeadlineStatus(endDate: string | null) {
  if (!endDate) return { label: '상시 모집', variant: 'secondary' as const, daysLeft: null }
  
  const end = parseISO(endDate)
  if (isPast(end)) return { label: '마감됨', variant: 'destructive' as const, daysLeft: 0 }
  
  const daysLeft = differenceInDays(end, new Date())
  if (daysLeft <= 7) return { label: `D-${daysLeft}`, variant: 'destructive' as const, daysLeft }
  if (daysLeft <= 14) return { label: `D-${daysLeft}`, variant: 'secondary' as const, daysLeft }
  return { label: `D-${daysLeft}`, variant: 'outline' as const, daysLeft }
}

export default async function SubsidyDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: subsidy, error } = await supabase
    .from('subsidies')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !subsidy) {
    notFound()
  }

  // Get related subsidies
  const { data: relatedSubsidies } = await supabase
    .from('subsidies')
    .select('*')
    .eq('is_published', true)
    .neq('id', id)
    .eq('category', subsidy.category)
    .order('created_at', { ascending: false })
    .limit(3)

  const typedSubsidy = subsidy as Subsidy
  const typedRelatedSubsidies = (relatedSubsidies || []) as Subsidy[]
  const deadline = getDeadlineStatus(typedSubsidy.application_end)

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/subsidies">
          <ArrowLeft className="mr-2 h-4 w-4" />
          지원금 목록
        </Link>
      </Button>

      {/* Header */}
      <header>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={deadline.variant}>{deadline.label}</Badge>
          <Badge variant="outline">{categoryLabels[typedSubsidy.category] || typedSubsidy.category}</Badge>
          {typedSubsidy.region && <Badge variant="secondary">{typedSubsidy.region}</Badge>}
        </div>
        <h1 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
          {typedSubsidy.title}
        </h1>
        {typedSubsidy.organization && (
          <div className="mt-4 flex items-center gap-2 text-muted-foreground">
            <Building2 className="h-4 w-4" />
            <span>{typedSubsidy.organization}</span>
          </div>
        )}
      </header>

      {/* Key Info Card */}
      <Card className="mt-8">
        <CardContent className="grid gap-6 p-6 sm:grid-cols-2">
          {typedSubsidy.amount && (
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Banknote className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">지원금액</p>
                <p className="text-lg font-bold text-foreground">{typedSubsidy.amount}</p>
              </div>
            </div>
          )}
          {typedSubsidy.target_audience && (
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-accent/10 p-2">
                <Users className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">지원대상</p>
                <p className="font-medium text-foreground">{typedSubsidy.target_audience}</p>
              </div>
            </div>
          )}
          {(typedSubsidy.application_start || typedSubsidy.application_end) && (
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-secondary p-2">
                <Calendar className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">신청기간</p>
                <p className="font-medium text-foreground">
                  {typedSubsidy.application_start && format(parseISO(typedSubsidy.application_start), 'yyyy.M.d', { locale: ko })}
                  {typedSubsidy.application_start && typedSubsidy.application_end && ' ~ '}
                  {typedSubsidy.application_end && format(parseISO(typedSubsidy.application_end), 'yyyy.M.d', { locale: ko })}
                </p>
              </div>
            </div>
          )}
          {typedSubsidy.region && (
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-muted p-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">지원지역</p>
                <p className="font-medium text-foreground">{typedSubsidy.region}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary */}
      {typedSubsidy.summary && (
        <Card className="mt-6 border-l-4 border-l-primary">
          <CardContent className="p-4">
            <p className="text-lg font-medium text-foreground">{typedSubsidy.summary}</p>
          </CardContent>
        </Card>
      )}

      {/* Content */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-foreground">상세 내용</h2>
        <div className="prose prose-lg mt-4 max-w-none dark:prose-invert">
          {typedSubsidy.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Requirements */}
      {typedSubsidy.requirements && (
        <section className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                신청 자격 요건
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground whitespace-pre-wrap">{typedSubsidy.requirements}</p>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Documents */}
      {typedSubsidy.documents && (
        <section className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                필요 서류
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground whitespace-pre-wrap">{typedSubsidy.documents}</p>
            </CardContent>
          </Card>
        </section>
      )}

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
        {typedSubsidy.application_url && (
          <Button asChild>
            <a href={typedSubsidy.application_url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              신청하러 가기
            </a>
          </Button>
        )}
      </div>

      {/* Related Subsidies */}
      {typedRelatedSubsidies.length > 0 && (
        <section className="mt-12 border-t border-border pt-8">
          <div className="flex items-center gap-3">
            <Icon3D type="money" size="md" />
            <h2 className="text-xl font-bold text-foreground">관련 지원금</h2>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {typedRelatedSubsidies.map((item) => (
              <SubsidyCard key={item.id} subsidy={item} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
