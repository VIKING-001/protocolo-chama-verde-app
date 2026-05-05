'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/dashboard', label: 'Início',    icon: '🏠' },
  { href: '/plano',     label: 'Plano',     icon: '📅' },
  { href: '/receitas',  label: 'Receitas',  icon: '🌿' },
  { href: '/progresso', label: 'Progresso', icon: '📊' },
  { href: '/bonus',     label: 'Bônus',     icon: '🎁' },
]

export default function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 border-t z-50"
      style={{ backgroundColor: 'white', borderColor: '#e8e2d9' }}>
      <div className="flex">
        {NAV.map(item => {
          const active = pathname === item.href
          return (
            <Link key={item.href} href={item.href}
              className="flex-1 flex flex-col items-center py-2.5 gap-0.5 transition-all"
              style={{ color: active ? '#195f52' : '#9b9289' }}>
              <span className="text-xl leading-none">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
