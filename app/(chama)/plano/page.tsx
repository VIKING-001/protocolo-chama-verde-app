'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { PLANO_7_DIAS, RECEITAS } from '@/lib/data'

type PP = { day_number: number; completed: boolean }

export default function PlanoPage() {
  const [progress, setProgress] = useState<PP[]>([])
  const [uid, setUid] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<number | null>(1)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return
      setUid(data.user.id)
      supabase.from('plan_progress').select('day_number,completed').eq('user_id', data.user.id)
        .then(({ data: p }) => { setProgress((p as PP[]) ?? []); setLoading(false) })
    })
  }, [])

  async function toggleDay(day: number) {
    if (!uid) return
    const cur = progress.find(p => p.day_number === day)
    const next = !cur?.completed
    if (cur) await supabase.from('plan_progress').update({ completed: next, completed_at: next ? new Date().toISOString() : null }).eq('user_id', uid).eq('day_number', day)
    else      await supabase.from('plan_progress').insert({ user_id: uid, day_number: day, completed: true, completed_at: new Date().toISOString() })
    setProgress(prev => [...prev.filter(p => p.day_number !== day), { day_number: day, completed: next }])
  }

  const done = progress.filter(p => p.completed).length
  const pct  = Math.round((done / 7) * 100)

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-6 h-6 border-2 border-t-transparent rounded-full spin" style={{ borderColor: '#195f52' }} /></div>

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-5 fade-in">
      <div>
        <h1 className="text-xl font-bold" style={{ color: '#195f52' }}>Plano de 7 Dias</h1>
        <p className="text-sm mt-0.5" style={{ color: '#6b6459' }}>Siga a sequência para melhores resultados</p>
      </div>

      <div className="rounded-2xl p-5 border" style={{ backgroundColor: 'white', borderColor: '#e8e2d9' }}>
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-sm" style={{ color: '#195f52' }}>Progresso geral</p>
          <span className="text-xl font-bold" style={{ color: '#b5873a' }}>{pct}%</span>
        </div>
        <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: '#e8e2d9' }}>
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: '#195f52' }} />
        </div>
        <p className="text-xs mt-2" style={{ color: '#9b9289' }}>{done} de 7 dias concluídos</p>
      </div>

      <div className="space-y-3">
        {PLANO_7_DIAS.map(d => {
          const isDone = progress.find(p => p.day_number === d.dia)?.completed ?? false
          const open   = expanded === d.dia
          const receita = RECEITAS[d.receitaKey]
          return (
            <div key={d.dia} className="rounded-2xl border overflow-hidden"
              style={{ backgroundColor: isDone ? '#eef4f2' : 'white', borderColor: isDone ? '#c0d9d3' : '#e8e2d9' }}>
              <button className="w-full flex items-center gap-4 p-4 text-left" onClick={() => setExpanded(open ? null : d.dia)}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ backgroundColor: isDone ? '#195f52' : '#f6f3ee', color: isDone ? 'white' : '#9b9289' }}>
                  {isDone ? '✓' : d.dia}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm" style={{ color: '#195f52' }}>Dia {d.dia}: {d.titulo}</p>
                  <p className="text-xs mt-0.5 truncate" style={{ color: '#6b6459' }}>{d.foco}</p>
                </div>
                <span className="text-sm" style={{ color: '#9b9289' }}>{open ? '▲' : '▼'}</span>
              </button>

              {open && (
                <div className="px-4 pb-4 space-y-4 border-t" style={{ borderColor: '#e8e2d9' }}>
                  <div className="pt-4">
                    <p className="text-xs font-medium mb-2" style={{ color: '#9b9289' }}>RECEITA DO DIA</p>
                    <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: '#f6f3ee' }}>
                      <span className="text-xl">{receita.emoji}</span>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: '#195f52' }}>{receita.nome}</p>
                        <p className="text-xs" style={{ color: '#6b6459' }}>{receita.melhorHorario}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-1.5" style={{ color: '#9b9289' }}>DICA DO DIA</p>
                    <p className="text-sm leading-relaxed" style={{ color: '#3a3530' }}>{d.dica}</p>
                  </div>
                  <button onClick={() => toggleDay(d.dia)}
                    className="w-full py-3 rounded-xl font-semibold text-sm transition-all"
                    style={{ backgroundColor: isDone ? '#f6f3ee' : '#195f52', color: isDone ? '#195f52' : 'white', border: isDone ? '2px solid #195f52' : 'none' }}>
                    {isDone ? '✓ Concluído — Desmarcar?' : 'Marcar como concluído'}
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
