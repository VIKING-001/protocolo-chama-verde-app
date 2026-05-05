'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/components/chama/Sidebar'
import BottomNav from '@/components/chama/BottomNav'

export default function ChamaLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) { router.push('/auth'); return }
      const { data: profile } = await supabase.from('profiles').select('id').eq('user_id', data.session.user.id).maybeSingle()
      if (!profile) { router.push('/onboarding'); return }
      setReady(true)
    })
  }, [router])

  if (!ready) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f6f3ee' }}>
      <div className="flex flex-col items-center gap-3">
        <span className="text-3xl">🌿</span>
        <div className="w-6 h-6 border-2 border-t-transparent rounded-full spin" style={{ borderColor: '#195f52' }} />
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#f6f3ee' }}>
      <Sidebar />
      <main className="flex-1 overflow-auto pb-20 lg:pb-0">{children}</main>
      <BottomNav />
    </div>
  )
}
