-- 소상공인 지원 플랫폼 데이터베이스 스키마

-- 사용자 프로필 테이블 (구독자 정보)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  name TEXT,
  phone TEXT,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  age_group TEXT CHECK (age_group IN ('20s', '30s', '40s', '50s', '60s', '70+')),
  region TEXT,
  business_type TEXT,
  is_subscribed BOOLEAN DEFAULT false,
  push_enabled BOOLEAN DEFAULT false,
  push_token TEXT,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 뉴스 기사 테이블
CREATE TABLE IF NOT EXISTS public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  summary TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  source TEXT,
  source_url TEXT,
  category TEXT DEFAULT 'general',
  is_published BOOLEAN DEFAULT true,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 지원금 정보 테이블
CREATE TABLE IF NOT EXISTS public.subsidies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  summary TEXT,
  content TEXT NOT NULL,
  organization TEXT,
  target_audience TEXT,
  amount TEXT,
  application_start DATE,
  application_end DATE,
  application_url TEXT,
  requirements TEXT,
  documents TEXT,
  category TEXT DEFAULT 'general',
  region TEXT,
  is_published BOOLEAN DEFAULT true,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 복지 정보 테이블
CREATE TABLE IF NOT EXISTS public.welfare (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  summary TEXT,
  content TEXT NOT NULL,
  organization TEXT,
  target_audience TEXT,
  benefits TEXT,
  application_method TEXT,
  application_url TEXT,
  requirements TEXT,
  category TEXT DEFAULT 'general',
  region TEXT,
  is_published BOOLEAN DEFAULT true,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 알림 테이블
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT CHECK (type IN ('news', 'subsidy', 'welfare', 'announcement')),
  target_audience TEXT DEFAULT 'all',
  related_id UUID,
  sent_at TIMESTAMPTZ,
  is_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 알림 수신 기록 테이블
CREATE TABLE IF NOT EXISTS public.notification_receipts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_id UUID REFERENCES public.notifications(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 북마크 테이블
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  content_type TEXT CHECK (content_type IN ('news', 'subsidy', 'welfare')),
  content_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, content_type, content_id)
);

-- 방문자 통계 테이블
CREATE TABLE IF NOT EXISTS public.visitor_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  total_visits INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  page_views JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 페이지뷰 로그 테이블
CREATE TABLE IF NOT EXISTS public.page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  session_id TEXT,
  page_path TEXT NOT NULL,
  content_type TEXT,
  content_id UUID,
  referrer TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 활성화
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subsidies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.welfare ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- 프로필 정책
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- 관리자용 프로필 조회 정책
CREATE POLICY "profiles_admin_select" ON public.profiles FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- 뉴스 정책 (공개 읽기)
CREATE POLICY "news_public_select" ON public.news FOR SELECT USING (is_published = true);
CREATE POLICY "news_admin_all" ON public.news FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- 지원금 정책 (공개 읽기)
CREATE POLICY "subsidies_public_select" ON public.subsidies FOR SELECT USING (is_published = true);
CREATE POLICY "subsidies_admin_all" ON public.subsidies FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- 복지 정책 (공개 읽기)
CREATE POLICY "welfare_public_select" ON public.welfare FOR SELECT USING (is_published = true);
CREATE POLICY "welfare_admin_all" ON public.welfare FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- 알림 정책
CREATE POLICY "notifications_admin_all" ON public.notifications FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- 알림 수신 정책
CREATE POLICY "notification_receipts_select_own" ON public.notification_receipts FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "notification_receipts_update_own" ON public.notification_receipts FOR UPDATE USING (user_id = auth.uid());

-- 북마크 정책
CREATE POLICY "bookmarks_select_own" ON public.bookmarks FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "bookmarks_insert_own" ON public.bookmarks FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "bookmarks_delete_own" ON public.bookmarks FOR DELETE USING (user_id = auth.uid());

-- 방문자 통계 정책 (관리자만)
CREATE POLICY "visitor_stats_admin_all" ON public.visitor_stats FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- 페이지뷰 정책 (삽입은 모두 가능, 조회는 관리자만)
CREATE POLICY "page_views_insert_all" ON public.page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "page_views_admin_select" ON public.page_views FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- 프로필 자동 생성 트리거
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, is_admin)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data ->> 'name', NULL),
    COALESCE((new.raw_user_meta_data ->> 'is_admin')::boolean, false)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- updated_at 트리거 생성
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON public.news FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_subsidies_updated_at BEFORE UPDATE ON public.subsidies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_welfare_updated_at BEFORE UPDATE ON public.welfare FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_visitor_stats_updated_at BEFORE UPDATE ON public.visitor_stats FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
