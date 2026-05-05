'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { getSaudacao, getDiaDoProtocolo, calcularStreak, getUltimos7Dias, RECEITAS } from '@/lib/data'
import type { Objetivo } from '@/lib/data'

type Profile = { nome: string; objetivo: Objetivo; created_at: string }
type Log = { date: string; bebida_feita: boolean; agua_feita: boolean; registro_feito: boolean }

const today = new Date().toISOString().slice(0, 10)

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [logs, setLogs] = useState<Log[]>([])
  const [todayLog, setTodayLog] = useState<Log | null>(null)
  const [saving, setSaving] = useState(false)
  const [uid, setUid] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return
      setUid(data.user.id)
      Promise.all([
        supabase.from('profiles').select('nome,objetivo,created_at').eq('user_id', data.user.id).single(),
        supabase.from('daily_logs').select('date,bebida_feita,agua_feita,registro_feito').eq('user_id', data.user.id).order('date', { ascending: false }).limit(30),
      ]).then(([{ data: p }, { data: l }]) => {
        if (p) setProfile(p as Profile)
        if (l) { setLogs(l as Log[]); setTodayLog((l as Log[]).find(x => x.date === today) ?? null) }
      })
    })
  }, [])

  async function toggle(field: keyof Omit<Log, 'date'>) {
    if (!uid) return
    setSaving(true)
    const base = todayLog ?? { date: today, bebida_feita: false, agua_feita: false, registro_feito: false }
    const updated = { ...base, [field]: !base[field] }
    if (todayLog) await supabase.from('daily_logs').update({ [field]: updated[field] }).eq('user_id', uid).eq('date', today)
    else          await supabase.from('daily_logs').insert({ user_id: uid, ...updated })
    setTodayLog(updated as Log)
    setLogs(prev => [updated as Log, ...prev.filter(l => l.date !== today)])
    setSaving(false)
  }

  if (!profile) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-t-transparent rounded-full spin" style={{ borderColor: '#195f52' }} />
    </div>
  )

  const streak  = calcularStreak(logs)
  const dia     = getDiaDoProtocolo(profile.created_at)
  const receita = RECEITAS[profile.objetivo]
  const checks  = { bebida_feita: todayLog?.bebida_feita ?? false, agua_feita: todayLog?.agua_feita ?? false, registro_feito: todayLog?.registro_feito ?? false }
  const done    = Object.values(checks).filter(Boolean).length
  const feitos  = new Set(logs.filter(l => l.bebida_feita).map(l => l.date))
  const semana  = getUltimos7Dias()

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-5 fade-in">
      <div>
        <h1 className="text-xl font-bold" style={{ color: '#195f52' }}>{getSaudacao(profile.nome)} 👋</h1>
        <p className="text-sm mt-0.5" style={{ color: '#6b6459' }}>Hoje é o dia <strong>{dia}</strong> do seu protocolo</p>
      </div>

      {/* Streak + Hoje */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Sequência', value: streak, suffix: streak === 1 ? 'dia 🔥' : 'dias 🔥', sub: streak === 0 ? 'Comece hoje!' : 'Continue assim!' },
          { label: 'Hoje', value: done, suffix: '/3 ✓', sub: '' },
        ].map(c => (
          <div key={c.label} className="rounded-2xl p-4 border" style={{ backgroundColor: 'white', borderColor: '#e8e2d9' }}>
            <p className="text-xs font-medium mb-1" style={{ color: '#9b9289' }}>{c.label}</p>
            <div className="flex items-end gap-1.5">
              <span className="text-3xl font-bold" style={{ color: '#195f52' }}>{c.value}</span>
              <span className="text-sm mb-1" style={{ color: '#6b6459' }}>{c.suffix}</span>
            </div>
            {c.sub && <p className="text-xs mt-1" style={{ color: '#9b9289' }}>{c.sub}</p>}
            {c.label === 'Hoje' && (
              <div className="flex gap-1 mt-2">
                {[0,1,2].map(i => <div key={i} className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: i < done ? '#b5873a' : '#e8e2d9' }} />)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Receita do dia */}
      <div className="rounded-2xl p-5 border" style={{ backgroundColor: 'white', borderColor: '#e8e2d9' }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">{receita.emoji}</span>
          <div>
            <p className="text-xs font-medium" style={{ color: '#9b9289' }}>Protocolo do dia</p>
            <p className="font-bold" style={{ color: '#195f52' }}>{receita.nome}</p>
          </div>
        </div>
        <div className="space-y-1.5 mb-3">
          {receita.ingredientes.map((ing, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span style={{ color: '#3a3530' }}>{ing.item}</span>
              <span className="font-medium" style={{ color: '#195f52' }}>{ing.quantidade}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs" style={{ backgroundColor: '#eef4f2', color: '#195f52' }}>
          <span>🕐</span><span>{receita.melhorHorario}</span>
        </div>
      </div>

      {/* Checklist */}
      <div className="rounded-2xl border" style={{ backgroundColor: 'white', borderColor: '#e8e2d9' }}>
        <p className="px-5 py-4 font-semibold text-sm border-b" style={{ borderColor: '#f0ece6', color: '#195f52' }}>Checklist do dia</p>
        {([
          { key: 'bebida_feita',   label: 'Fiz a bebida matinal',     icon: '🌿' },
          { key: 'agua_feita',     label: 'Bebi 2L de água',          icon: '💧' },
          { key: 'registro_feito', label: 'Registrei como me senti',  icon: '📝' },
        ] as const).map(({ key, label, icon }) => (
          <button key={key} onClick={() => !saving && toggle(key)}
            className="w-full flex items-center gap-4 px-5 py-4 border-b last:border-b-0 text-left"
            style={{ borderColor: '#f0ece6' }}>
            <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
              style={{ borderColor: checks[key] ? '#195f52' : '#d4cec6', backgroundColor: checks[key] ? '#195f52' : 'transparent' }}>
              {checks[key] && <span className="text-white text-xs">✓</span>}
            </div>
            <span className="text-base">{icon}</span>
            <span className="text-sm font-medium flex-1" style={{ color: checks[key] ? '#9b9289' : '#3a3530', textDecoration: checks[key] ? 'line-through' : 'none' }}>
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Semana */}
      <div className="rounded-2xl p-5 border" style={{ backgroundColor: 'white', borderColor: '#e8e2d9' }}>
        <p className="font-semibold text-sm mb-4" style={{ color: '#195f52' }}>Progresso da semana</p>
        <div className="flex justify-between gap-1">
          {semana.map(date => {
            const feito   = feitos.has(date)
            const isToday = date === today
            const dia     = new Date(date + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'short' }).slice(0,3)
            return (
              <div key={date} className="flex flex-col items-center gap-1.5 flex-1">
                <p className="text-xs" style={{ color: isToday ? '#195f52' : '#9b9289', fontWeight: isToday ? 600 : 400 }}>{dia}</p>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm border-2"
                  style={{ backgroundColor: feito ? '#195f52' : isToday ? '#eef4f2' : '#f6f3ee', borderColor: feito ? '#195f52' : isToday ? '#195f52' : '#e8e2d9', color: feito ? 'white' : '#9b9289' }}>
                  {feito ? '✓' : isToday ? '·' : ''}
                </div>
                <p className="text-xs" style={{ color: '#9b9289' }}>{new Date(date + 'T12:00:00').getDate()}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Dica */}
      <div className="rounded-2xl p-4 flex items-start gap-3" style={{ backgroundColor: '#195f52' }}>
        <span className="text-xl">🌱</span>
        <div>
          <p className="text-sm font-semibold text-white">Lembre-se</p>
          <p className="text-xs mt-0.5" style={{ color: '#b5d4ce' }}>{receita.beneficios}</p>
        </div>
      </div>
    </div>
  )
}
