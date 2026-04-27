'use client'

import { useState } from 'react'
import { Send, Bell, Users, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Icon3D } from '@/components/icons/icon-3d'
import { toast } from 'sonner'

const notificationTypes = [
  { value: 'announcement', label: '공지사항' },
  { value: 'news', label: '뉴스 알림' },
  { value: 'subsidy', label: '지원금 알림' },
  { value: 'welfare', label: '복지 알림' },
]

const targetAudiences = [
  { value: 'all', label: '전체 구독자' },
  { value: 'seoul', label: '서울 지역' },
  { value: 'gyeonggi', label: '경기 지역' },
  { value: '20s', label: '20대' },
  { value: '30s', label: '30대' },
  { value: '40s', label: '40대' },
  { value: '50s', label: '50대 이상' },
]

export default function NotificationsPage() {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [type, setType] = useState('announcement')
  const [targetAudience, setTargetAudience] = useState('all')
  const [isSending, setIsSending] = useState(false)

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !message.trim()) {
      toast.error('오류', { description: '제목과 내용을 입력해주세요.' })
      return
    }

    setIsSending(true)

    try {
      const supabase = createClient()
      
      // Create notification record
      const { error } = await supabase
        .from('notifications')
        .insert({
          title,
          message,
          type,
          target_audience: targetAudience,
          is_sent: true,
          sent_at: new Date().toISOString(),
        })

      if (error) throw error

      toast.success('알림 발송 완료', {
        description: '구독자들에게 알림이 발송되었습니다.',
      })

      // Reset form
      setTitle('')
      setMessage('')
      setType('announcement')
      setTargetAudience('all')
    } catch (error) {
      toast.error('발송 실패', {
        description: '알림 발송 중 오류가 발생했습니다.',
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">알림 발송</h2>
        <p className="text-muted-foreground">구독자에게 새로운 소식을 알려주세요.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon3D type="bell" size="sm" />
              새 알림 작성
            </CardTitle>
            <CardDescription>구독자들에게 전송할 알림을 작성하세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSend} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="type">알림 유형</Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {notificationTypes.map((t) => (
                        <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target">발송 대상</Label>
                  <Select value={targetAudience} onValueChange={setTargetAudience}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {targetAudiences.map((t) => (
                        <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">제목</Label>
                <Input
                  id="title"
                  placeholder="알림 제목을 입력하세요"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">내용</Label>
                <Textarea
                  id="message"
                  placeholder="알림 내용을 입력하세요"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" disabled={isSending} className="w-full">
                {isSending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    발송 중...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    알림 발송
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">미리보기</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Bell className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {title || '알림 제목'}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-3">
                      {message || '알림 내용이 여기에 표시됩니다.'}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">방금 전</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">발송 안내</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>알림은 구독 동의한 사용자에게 발송됩니다.</p>
              <p>발송 대상에 따라 해당 조건에 맞는 구독자에게만 전송됩니다.</p>
              <p>발송된 알림은 취소할 수 없으니 신중하게 작성해주세요.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
