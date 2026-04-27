import Link from 'next/link'
import { Mail, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Icon3D } from '@/components/icons/icon-3d'

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">이메일을 확인해주세요</CardTitle>
          <CardDescription className="mt-2">
            회원가입을 완료하려면 이메일에서 인증 링크를 클릭해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
            <p>인증 이메일이 도착하지 않았다면:</p>
            <ul className="mt-2 list-inside list-disc text-left">
              <li>스팸 폴더를 확인해주세요</li>
              <li>이메일 주소가 올바른지 확인해주세요</li>
              <li>몇 분 후 다시 시도해주세요</li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <Button asChild>
              <Link href="/auth/login">
                로그인 페이지로
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">홈으로 돌아가기</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
