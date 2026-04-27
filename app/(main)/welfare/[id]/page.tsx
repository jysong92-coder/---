import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Building2, MapPin, Users, Gift, FileText, ExternalLink, Share2, Bookmark, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { WelfareCard } from '@/components/cards/welfare-card'
import { Icon3D } from '@/components/icons/icon-3d'
import type { Welfare } from '@/lib/types'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const { data: welfare } = await supabase
    .from('welfare')
    .select('title, summary')
    .eq('id', id)
    .single()

  if (!welfare) {
    return { title: '복지 정보를 찾을 수 없습니다' }
  }

  return {
    title: welfare.title,
    description: welfare.summary || undefined,
  }
}

const categoryLabels: Record<string, string> = {
  health: '건강',
  education: '교육',
  mental: '심리',
  leisure: '여가',
  insurance: '보험',
  general: '일반',
}

export default async function WelfareDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: welfare, error } = await supabase
    .from('welfare')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !welfare) {
    notFound()
  }

  // Get related welfare
  const { data: relatedWelfare } = await supabase
    .from('welfare')
    .select('*')
    .eq('is_published', true)
    .neq('id', id)
    .eq('category', welfare.category)
    .order('created_at', { ascending: false })
    .limit(3)

  const typedWelfare = welfare as Welfare
  const typedRelatedWelfare = (relatedWelfare || []) as Welfare[]

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/welfare">
          <ArrowLeft className="mr-2 h-4 w-4" />
          복지 목록
        </Link>
      </Button>

      {/* Header */}
      <header>
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-accent text-accent-foreground">
            {categoryLabels[typedWelfare.category] || typedWelfare.category}
          </Badge>
          {typedWelfare.region && <Badge variant="secondary">{typedWelfare.region}</Badge>}
        </div>
        <h1 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
          {typedWelfare.title}
        </h1>
        {typedWelfare.organization && (
          <div className="mt-4 flex items-center gap-2 text-muted-foreground">
            <Building2 className="h-4 w-4" />
            <span>{typedWelfare.organization}</span>
          </div>
        )}
      </header>

      {/* Benefits Highlight */}
      {typedWelfare.benefits && (
        <Card className="mt-8 border-l-4 border-l-accent bg-accent/5">
          <CardContent className="flex items-start gap-4 p-6">
            <div className="rounded-lg bg-accent/10 p-3">
              <Gift className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-accent">제공 혜택</p>
              <p className="mt-1 text-xl font-bold text-foreground">{typedWelfare.benefits}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Info Card */}
      <Card className="mt-6">
        <CardContent className="grid gap-6 p-6 sm:grid-cols-2">
          {typedWelfare.target_audience && (
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">지원대상</p>
                <p className="font-medium text-foreground">{typedWelfare.target_audience}</p>
              </div>
            </div>
          )}
          {typedWelfare.application_method && (
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-secondary p-2">
                <FileText className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">신청방법</p>
                <p className="font-medium text-foreground">{typedWelfare.application_method}</p>
              </div>
            </div>
          )}
          {typedWelfare.organization && (
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-muted p-2">
                <Building2 className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">담당기관</p>
                <p className="font-medium text-foreground">{typedWelfare.organization}</p>
              </div>
            </div>
          )}
          {typedWelfare.region && (
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-muted p-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">지원지역</p>
                <p className="font-medium text-foreground">{typedWelfare.region}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary */}
      {typedWelfare.summary && (
        <Card className="mt-6 border-l-4 border-l-primary">
          <CardContent className="p-4">
            <p className="text-lg font-medium text-foreground">{typedWelfare.summary}</p>
          </CardContent>
        </Card>
      )}

      {/* Content */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-foreground">상세 내용</h2>
        <div className="prose prose-lg mt-4 max-w-none dark:prose-invert">
          {typedWelfare.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Requirements */}
      {typedWelfare.requirements && (
        <section className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                신청 자격 요건
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground whitespace-pre-wrap">{typedWelfare.requirements}</p>
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
        {typedWelfare.application_url && (
          <Button asChild>
            <a href={typedWelfare.application_url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              신청하러 가기
            </a>
          </Button>
        )}
      </div>

      {/* Related Welfare */}
      {typedRelatedWelfare.length > 0 && (
        <section className="mt-12 border-t border-border pt-8">
          <div className="flex items-center gap-3">
            <Icon3D type="welfare" size="md" />
            <h2 className="text-xl font-bold text-foreground">관련 복지 혜택</h2>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {typedRelatedWelfare.map((item) => (
              <WelfareCard key={item.id} welfare={item} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
