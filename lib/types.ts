// Database Types
export interface Profile {
  id: string
  email: string | null
  name: string | null
  phone: string | null
  gender: 'male' | 'female' | 'other' | null
  age_group: '20s' | '30s' | '40s' | '50s' | '60s' | '70+' | null
  region: string | null
  business_type: string | null
  is_subscribed: boolean
  push_enabled: boolean
  push_token: string | null
  is_admin: boolean
  created_at: string
  updated_at: string
}

export interface News {
  id: string
  title: string
  summary: string | null
  content: string
  image_url: string | null
  source: string | null
  source_url: string | null
  category: string
  is_published: boolean
  view_count: number
  created_at: string
  updated_at: string
}

export interface Subsidy {
  id: string
  title: string
  summary: string | null
  content: string
  organization: string | null
  target_audience: string | null
  amount: string | null
  application_start: string | null
  application_end: string | null
  application_url: string | null
  requirements: string | null
  documents: string | null
  category: string
  region: string | null
  is_published: boolean
  view_count: number
  created_at: string
  updated_at: string
}

export interface Welfare {
  id: string
  title: string
  summary: string | null
  content: string
  organization: string | null
  target_audience: string | null
  benefits: string | null
  application_method: string | null
  application_url: string | null
  requirements: string | null
  category: string
  region: string | null
  is_published: boolean
  view_count: number
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'news' | 'subsidy' | 'welfare' | 'announcement'
  target_audience: string
  related_id: string | null
  sent_at: string | null
  is_sent: boolean
  created_at: string
}

export interface NotificationReceipt {
  id: string
  notification_id: string
  user_id: string
  is_read: boolean
  read_at: string | null
  created_at: string
}

export interface Bookmark {
  id: string
  user_id: string
  content_type: 'news' | 'subsidy' | 'welfare'
  content_id: string
  created_at: string
}

export interface VisitorStats {
  id: string
  date: string
  total_visits: number
  unique_visitors: number
  page_views: Record<string, number>
  created_at: string
  updated_at: string
}

export interface PageView {
  id: string
  user_id: string | null
  session_id: string | null
  page_path: string
  content_type: string | null
  content_id: string | null
  referrer: string | null
  user_agent: string | null
  created_at: string
}

// UI Types
export type ContentType = 'news' | 'subsidy' | 'welfare'

export interface CategoryItem {
  id: string
  label: string
  icon: string
  href: string
}
