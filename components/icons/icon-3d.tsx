'use client'

import { cn } from '@/lib/utils'

interface Icon3DProps {
  type: 'money' | 'news' | 'welfare' | 'bell' | 'chart' | 'user' | 'search' | 'bookmark' | 'home' | 'shield' | 'gift' | 'document'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
}

export function Icon3D({ type, size = 'md', className }: Icon3DProps) {
  const sizeClass = sizeClasses[size]
  
  const icons: Record<string, React.ReactNode> = {
    money: (
      <svg viewBox="0 0 100 100" className={cn(sizeClass, className)}>
        <defs>
          <linearGradient id="moneyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
          <filter id="moneyShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#16a34a" floodOpacity="0.3"/>
          </filter>
        </defs>
        <circle cx="50" cy="50" r="40" fill="url(#moneyGrad)" filter="url(#moneyShadow)"/>
        <circle cx="50" cy="50" r="35" fill="none" stroke="#15803d" strokeWidth="2" opacity="0.3"/>
        <text x="50" y="58" textAnchor="middle" fill="white" fontSize="32" fontWeight="bold" fontFamily="sans-serif">&#8361;</text>
      </svg>
    ),
    news: (
      <svg viewBox="0 0 100 100" className={cn(sizeClass, className)}>
        <defs>
          <linearGradient id="newsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <filter id="newsShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#1d4ed8" floodOpacity="0.3"/>
          </filter>
        </defs>
        <rect x="15" y="15" width="70" height="70" rx="12" fill="url(#newsGrad)" filter="url(#newsShadow)"/>
        <rect x="25" y="28" width="35" height="4" rx="2" fill="white" opacity="0.9"/>
        <rect x="25" y="38" width="50" height="3" rx="1.5" fill="white" opacity="0.6"/>
        <rect x="25" y="46" width="50" height="3" rx="1.5" fill="white" opacity="0.6"/>
        <rect x="25" y="54" width="35" height="3" rx="1.5" fill="white" opacity="0.6"/>
        <rect x="25" y="65" width="20" height="15" rx="3" fill="white" opacity="0.4"/>
        <rect x="50" y="65" width="25" height="3" rx="1.5" fill="white" opacity="0.5"/>
        <rect x="50" y="72" width="25" height="3" rx="1.5" fill="white" opacity="0.5"/>
      </svg>
    ),
    welfare: (
      <svg viewBox="0 0 100 100" className={cn(sizeClass, className)}>
        <defs>
          <linearGradient id="welfareGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#db2777" />
          </linearGradient>
          <filter id="welfareShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#db2777" floodOpacity="0.3"/>
          </filter>
        </defs>
        <path d="M50 85 L20 55 Q10 45 20 35 Q30 25 50 40 Q70 25 80 35 Q90 45 80 55 Z" fill="url(#welfareGrad)" filter="url(#welfareShadow)"/>
        <path d="M50 75 L28 53 Q22 47 28 41 Q34 35 50 46 Q66 35 72 41 Q78 47 72 53 Z" fill="white" opacity="0.3"/>
      </svg>
    ),
    bell: (
      <svg viewBox="0 0 100 100" className={cn(sizeClass, className)}>
        <defs>
          <linearGradient id="bellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <filter id="bellShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#f59e0b" floodOpacity="0.3"/>
          </filter>
        </defs>
        <path d="M50 15 C50 15 30 15 25 40 C20 65 20 70 20 70 L80 70 C80 70 80 65 75 40 C70 15 50 15 50 15" fill="url(#bellGrad)" filter="url(#bellShadow)"/>
        <rect x="20" y="70" width="60" height="8" rx="4" fill="#d97706"/>
        <circle cx="50" cy="85" r="8" fill="#fbbf24"/>
        <ellipse cx="50" cy="40" rx="15" ry="10" fill="white" opacity="0.3"/>
      </svg>
    ),
    chart: (
      <svg viewBox="0 0 100 100" className={cn(sizeClass, className)}>
        <defs>
          <linearGradient id="chartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
          <filter id="chartShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#6d28d9" floodOpacity="0.3"/>
          </filter>
        </defs>
        <rect x="15" y="15" width="70" height="70" rx="12" fill="url(#chartGrad)" filter="url(#chartShadow)"/>
        <rect x="25" y="55" width="12" height="20" rx="2" fill="white" opacity="0.9"/>
        <rect x="44" y="40" width="12" height="35" rx="2" fill="white" opacity="0.9"/>
        <rect x="63" y="30" width="12" height="45" rx="2" fill="white" opacity="0.9"/>
        <polyline points="25,50 38,40 50,35 75,25" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
    user: (
      <svg viewBox="0 0 100 100" className={cn(sizeClass, className)}>
        <defs>
          <linearGradient id="userGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
          <filter id="userShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#0891b2" floodOpacity="0.3"/>
          </filter>
        </defs>
        <circle cx="50" cy="50" r="40" fill="url(#userGrad)" filter="url(#userShadow)"/>
        <circle cx="50" cy="38" r="15" fill="white" opacity="0.9"/>
        <path d="M25 75 Q25 55 50 55 Q75 55 75 75" fill="white" opacity="0.9"/>
      </svg>
    ),
    search: (
      <svg viewBox="0 0 100 100" className={cn(sizeClass, className)}>
        <defs>
          <linearGradient id="searchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <filter id="searchShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#475569" floodOpacity="0.3"/>
          </filter>
        </defs>
        <circle cx="42" cy="42" r="25" fill="url(#searchGrad)" filter="url(#searchShadow)"/>
        <circle cx="42" cy="42" r="18" fill="white" opacity="0.3"/>
        <rect x="60" y="58" width="25" height="12" rx="6" transform="rotate(45 60 58)" fill="url(#searchGrad)" filter="url(#searchShadow)"/>
      </svg>
    ),
    bookmark: (
      <svg viewBox="0 0 100 100" className={cn(sizeClass, className)}>
        <defs>
          <linearGradient id="bookmarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <filter id="bookmarkShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#ea580c" floodOpacity="0.3"/>
          </filter>
        </defs>
        <path d="M25 15 L75 15 L75 85 L50 65 L25 85 Z" fill="url(#bookmarkGrad)" filter="url(#bookmarkShadow)"/>
        <path d="M32 22 L68 22 L68 65 L50 52 L32 65 Z" fill="white" opacity="0.2"/>
      </svg>
    ),
    home: (
      <svg viewBox="0 0 100 100" className={cn(sizeClass, className)}>
        <defs>
          <linearGradient id="homeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <filter id="homeShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#1d4ed8" floodOpacity="0.3"/>
          </filter>
        </defs>
        <path d="M50 15 L85 45 L85 85 L15 85 L15 45 Z" fill="url(#homeGrad)" filter="url(#homeShadow)"/>
        <rect x="40" y="55" width="20" height="30" rx="2" fill="white" opacity="0.9"/>
        <rect x="25" y="50" width="15" height="12" rx="2" fill="white" opacity="0.5"/>
        <rect x="60" y="50" width="15" height="12" rx="2" fill="white" opacity="0.5"/>
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 100 100" className={cn(sizeClass, className)}>
        <defs>
          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
          <filter id="shieldShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#16a34a" floodOpacity="0.3"/>
          </filter>
        </defs>
        <path d="M50 10 L85 25 L85 50 Q85 80 50 95 Q15 80 15 50 L15 25 Z" fill="url(#shieldGrad)" filter="url(#shieldShadow)"/>
        <path d="M45 55 L35 45 L40 40 L45 45 L60 30 L65 35 Z" fill="white" opacity="0.9"/>
      </svg>
    ),
    gift: (
      <svg viewBox="0 0 100 100" className={cn(sizeClass, className)}>
        <defs>
          <linearGradient id="giftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#be185d" />
          </linearGradient>
          <filter id="giftShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#be185d" floodOpacity="0.3"/>
          </filter>
        </defs>
        <rect x="15" y="40" width="70" height="45" rx="6" fill="url(#giftGrad)" filter="url(#giftShadow)"/>
        <rect x="10" y="30" width="80" height="15" rx="4" fill="#f472b6"/>
        <rect x="45" y="30" width="10" height="55" fill="#fdf2f8" opacity="0.8"/>
        <path d="M50 30 Q35 20 30 25 Q25 30 35 35 L50 30" fill="#fbbf24"/>
        <path d="M50 30 Q65 20 70 25 Q75 30 65 35 L50 30" fill="#fbbf24"/>
      </svg>
    ),
    document: (
      <svg viewBox="0 0 100 100" className={cn(sizeClass, className)}>
        <defs>
          <linearGradient id="docGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <filter id="docShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#475569" floodOpacity="0.3"/>
          </filter>
        </defs>
        <path d="M20 10 L60 10 L80 30 L80 90 L20 90 Z" fill="url(#docGrad)" filter="url(#docShadow)"/>
        <path d="M60 10 L60 30 L80 30 Z" fill="white" opacity="0.3"/>
        <rect x="30" y="45" width="40" height="4" rx="2" fill="white" opacity="0.7"/>
        <rect x="30" y="55" width="40" height="4" rx="2" fill="white" opacity="0.7"/>
        <rect x="30" y="65" width="30" height="4" rx="2" fill="white" opacity="0.7"/>
      </svg>
    ),
  }

  return icons[type] || null
}
