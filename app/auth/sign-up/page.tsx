'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, Loader2, User, Phone, MapPin, Building } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Icon3D } from '@/components/icons/icon-3d'
import { toast } from 'sonner'

const ageGroups = [
  { value: '20s', label: '20대' },
  { value: '30s', label: '30대' },
  { value: '40s', label: '40대' },
  { value: '50s', label: '50대' },
  { value: '60s', label: '60대' },
  { value: '70+', label: '70대 이상' },
]

const regions = [
  '서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종',
  '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'
]

export default function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    gender: '',
    ageGroup: '',
    region: '',
    businessType: '',
    isSubscribed: true,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error('비밀번호 불일치', {
        description: '비밀번호가 일치하지 않습니다.',
      })
      return
    }

    if (formData.password.length < 6) {
      toast.error('비밀번호 오류', {
        description: '비밀번호는 6자 이상이어야 합니다.',
      })
      return
    }

    setIsLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? 
          `${window.location.origin}/auth/callback`,
        data: {
          name: formData.name,
          phone: formData.phone,
          gender: formData.gender,
          age_group: formData.ageGroup,
          region: formData.region,
          business_type: formData.businessType,
          is_subscribed: formData.isSubscribed,
        },
      },
    })

    if (error) {
      toast.error('회원가입 실패', {
        description: error.message,
      })
      setIsLoading(false)
      return
    }

    toast.success('회원가입 완료', {
      description: '이메일을 확인하여 계정을 인증해주세요.',
    })
    router.push('/auth/sign-up-success')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Icon3D type="user" size="lg" />
          </div>
          <CardTitle className="text-2xl">회원가입</CardTitle>
          <CardDescription>
            맞춤형 지원 정보를 받아보세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">이메일 *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호 *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="6자 이상"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">비밀번호 확인 *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="비밀번호 확인"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Name & Phone */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">전화번호</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="010-0000-0000"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Gender & Age */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>성별</Label>
                <Select value={formData.gender} onValueChange={(v) => handleChange('gender', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">남성</SelectItem>
                    <SelectItem value="female">여성</SelectItem>
                    <SelectItem value="other">기타</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>연령대</Label>
                <Select value={formData.ageGroup} onValueChange={(v) => handleChange('ageGroup', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {ageGroups.map((age) => (
                      <SelectItem key={age.value} value={age.value}>{age.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Region & Business Type */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>지역</Label>
                <Select value={formData.region} onValueChange={(v) => handleChange('region', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessType">업종</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="businessType"
                    type="text"
                    placeholder="예: 음식점, 소매업"
                    value={formData.businessType}
                    onChange={(e) => handleChange('businessType', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="subscribe"
                checked={formData.isSubscribed}
                onCheckedChange={(checked) => handleChange('isSubscribed', checked as boolean)}
              />
              <Label htmlFor="subscribe" className="text-sm font-normal cursor-pointer">
                새로운 지원금, 복지 정보 알림 받기
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  가입 중...
                </>
              ) : (
                '회원가입'
              )}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">이미 계정이 있으신가요?</span>{' '}
            <Link href="/auth/login" className="text-primary hover:underline">
              로그인
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
