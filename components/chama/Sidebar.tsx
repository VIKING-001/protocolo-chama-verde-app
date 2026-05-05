'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const NAV = [
  { href: '/dashboard',      label: 'Início',        icon: '🏠' },
  { href: '/plano',          label: 'Plano 7 Dias',  icon: '📅' },
  { href: '/receitas',       label: 'Receitas',      icon: '🌿' },
  { href: '/progresso',      label: 'Meu Progresso', icon: '📊' },
  { href: '/bonus',          label: 'Bônus',         icon: '🎁' },
  { href: '/configuracoes',  label: 'Configurações', icon: '⚙️' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 h-screen sticky top-0 border-r"
      style={{ backgroundColor: '#195f52', borderColor: '#124440' }}>
      <div className="px-6 py-6 border-b" style={{ borderColor: '#124440' }}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌿</span>
          <div>
            <p className="font-bold text-white text-sm leading-tight">Protocolo</p>
            <p className="font-bold text-sm leading-tight" style={{ color: '#b5d4ce' }}>Chama Verde</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV.map(item => {
          const active = pathname === item.href
          return (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{ backgroundColor: active ? 'rgba(255,255,255,0.15)' : 'transparent', color: active ? 'white' : 'rgba(255,255,255,0.65)' }}>
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="px-3 py-4 border-t" style={{ borderColor: '#124440' }}>
        <button onClick={async () => { await supabase.auth.signOut(); router.push('/auth') }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left"
          style={{ color: 'rgba(255,255,255,0.55)' }}>
          <span className="text-base">🚪</span> Sair
        </button>
      </div>
    </aside>
  )
}
