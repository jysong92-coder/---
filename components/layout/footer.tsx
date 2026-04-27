import Link from 'next/link'
import { Icon3D } from '@/components/icons/icon-3d'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card pb-20 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Icon3D type="shield" size="sm" />
              <span className="text-lg font-bold text-foreground">소상공인 지원센터</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              소상공인을 위한 지원금, 복지 정보를 한눈에 확인하세요.
              정부 및 지자체의 최신 지원 정책을 빠르게 전달해드립니다.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">빠른 링크</h3>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <Link href="/news" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  뉴스
                </Link>
              </li>
              <li>
                <Link href="/subsidies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  지원금 정보
                </Link>
              </li>
              <li>
                <Link href="/welfare" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  복지 정보
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  통합 검색
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">고객 지원</h3>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  문의하기
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  개인정보처리방침
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">연락처</h3>
            <ul className="mt-4 flex flex-col gap-2">
              <li className="text-sm text-muted-foreground">
                이메일: support@sosanggongin.kr
              </li>
              <li className="text-sm text-muted-foreground">
                전화: 1588-0000
              </li>
              <li className="text-sm text-muted-foreground">
                운영시간: 평일 09:00 - 18:00
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <p className="text-center text-xs text-muted-foreground">
            &copy; 2026 소상공인 지원센터. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
