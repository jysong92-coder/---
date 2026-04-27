import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Icon3D } from '@/components/icons/icon-3d'
import { Users, MapPin, Calendar, Mail } from 'lucide-react'
import type { Profile } from '@/lib/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '구독자 관리',
}

const ageGroupLabels: Record<string, string> = {
  '20s': '20대',
  '30s': '30대',
  '40s': '40대',
  '50s': '50대',
  '60s': '60대',
  '70+': '70대 이상',
}

const genderLabels: Record<string, string> = {
  male: '남성',
  female: '여성',
  other: '기타',
}

async function SubscriberStats() {
  const supabase = await createClient()
  
  // Get total subscribers
  const { count: totalCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('is_subscribed', true)

  // Get gender distribution
  const { data: genderData } = await supabase
    .from('profiles')
    .select('gender')
    .eq('is_subscribed', true)
    .not('gender', 'is', null)

  const genderCounts = (genderData || []).reduce((acc, { gender }) => {
    acc[gender] = (acc[gender] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Get age distribution
  const { data: ageData } = await supabase
    .from('profiles')
    .select('age_group')
    .eq('is_subscribed', true)
    .not('age_group', 'is', null)

  const ageCounts = (ageData || []).reduce((acc, { age_group }) => {
    acc[age_group] = (acc[age_group] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Get region distribution
  const { data: regionData } = await supabase
    .from('profiles')
    .select('region')
    .eq('is_subscribed', true)
    .not('region', 'is', null)

  const regionCounts = (regionData || []).reduce((acc, { region }) => {
    acc[region] = (acc[region] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const topRegions = Object.entries(regionCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">전체 구독자</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{(totalCount || 0).toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">알림 수신 동의</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">성별 분포</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(genderCounts).map(([gender, count]) => (
              <div key={gender} className="flex items-center justify-between">
                <span className="text-sm">{genderLabels[gender] || gender}</span>
                <Badge variant="secondary">{count}명</Badge>
              </div>
            ))}
            {Object.keys(genderCounts).length === 0 && (
              <p className="text-sm text-muted-foreground">데이터 없음</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">연령대 분포</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(ageCounts).map(([age, count]) => (
              <div key={age} className="flex items-center justify-between">
                <span className="text-sm">{ageGroupLabels[age] || age}</span>
                <Badge variant="secondary">{count}명</Badge>
              </div>
            ))}
            {Object.keys(ageCounts).length === 0 && (
              <p className="text-sm text-muted-foreground">데이터 없음</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">지역 분포 (TOP 5)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {topRegions.map(([region, count]) => (
              <div key={region} className="flex items-center justify-between">
                <span className="text-sm">{region}</span>
                <Badge variant="secondary">{count}명</Badge>
              </div>
            ))}
            {topRegions.length === 0 && (
              <p className="text-sm text-muted-foreground">데이터 없음</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

async function SubscriberList() {
  const supabase = await createClient()
  const { data: subscribers } = await supabase
    .from('profiles')
    .select('*')
    .eq('is_subscribed', true)
    .order('created_at', { ascending: false })
    .limit(50)

  if (!subscribers || subscribers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Icon3D type="user" size="xl" />
        <h3 className="mt-4 text-lg font-semibold">구독자가 없습니다</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          아직 알림을 구독한 사용자가 없습니다.
        </p>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>구독자 목록</CardTitle>
        <CardDescription>최근 50명의 구독자</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>이름/이메일</TableHead>
              <TableHead>성별</TableHead>
              <TableHead>연령대</TableHead>
              <TableHead>지역</TableHead>
              <TableHead>업종</TableHead>
              <TableHead>가입일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(subscribers as Profile[]).map((sub) => (
              <TableRow key={sub.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{sub.name || '이름 없음'}</p>
                    <p className="text-xs text-muted-foreground">{sub.email}</p>
                  </div>
                </TableCell>
                <TableCell>{sub.gender ? genderLabels[sub.gender] : '-'}</TableCell>
                <TableCell>{sub.age_group ? ageGroupLabels[sub.age_group] : '-'}</TableCell>
                <TableCell>{sub.region || '-'}</TableCell>
                <TableCell>{sub.business_type || '-'}</TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(sub.created_at).toLocaleDateString('ko-KR')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function StatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-40" />
      ))}
    </div>
  )
}

export default function SubscribersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">구독자 관리</h2>
        <p className="text-muted-foreground">구독자 현황과 통계를 확인하세요.</p>
      </div>

      <Suspense fallback={<StatsSkeleton />}>
        <SubscriberStats />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-96" />}>
        <SubscriberList />
      </Suspense>
    </div>
  )
}
