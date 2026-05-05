'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

type Entry = { id?: string; date: string; humor: number; inchaco: number; fome: boolean; energia: number }

const today = new Date().toISOString().slice(0, 10)

export default function ProgressoPage() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [uid, setUid] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({ humor: 3, inchaco: 3, fome: false, energia: 3 })

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return
      setUid(data.user.id)
      supabase.from('progress_entries').select('id,date,humor,inchaco,fome,energia')
        .eq('user_id', data.user.id).order('date', { ascending: true }).limit(14)
        .then(({ data: rows }) => {
          const e = (rows as Entry[]) ?? []
          setEntries(e)
          const t = e.find(x => x.date === today)
          if (t) setForm({ humor: t.humor, inchaco: t.inchaco, fome: t.fome, energia: t.energia })
          setLoading(false)
        })
    })
  }, [])

  async function save() {
    if (!uid) return
    setSaving(true)
    const existing = entries.find(e => e.date === today)
    if (existing?.id) await supabase.from('progress_entries').update(form).eq('id', existing.id)
    else              await supabase.from('progress_entries').insert({ user_id: uid, date: today, ...form })
    setEntries(prev => [...prev.filter(e => e.date !== today), { date: today, ...form }].sort((a,b) => a.date.localeCompare(b.date)))
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000)
  }

  const avg = (k: 'humor' | 'inchaco' | 'energia') =>
    entries.length ? (entries.reduce((s, e) => s + e[k], 0) / entries.length).toFixed(1) : '–'

  const chartData = entries.map(e => ({
    data: new Date(e.date + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    Humor: e.humor, Inchaço: e.inchaco, Energia: e.energia,
  }))

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-6 h-6 border-2 border-t-transparent rounded-full spin" style={{ borderColor: '#195f52' }} /></div>

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-5 fade-in">
      <div>
        <h1 className="text-xl font-bold" style={{ color: '#195f52' }}>Meu Progresso</h1>
        <p className="text-sm mt-0.5" style={{ color: '#6b6459' }}>Registre diariamente e acompanhe sua evolução</p>
      </div>

      {/* Formulário */}
      <div className="rounded-2xl border" style={{ backgroundColor: 'white', borderColor: '#e8e2d9' }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: '#f0ece6' }}>
          <p className="font-semibold text-sm" style={{ color: '#195f52' }}>📝 Como você está hoje?</p>
          <p className="text-xs mt-0.5" style={{ color: '#9b9289' }}>{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        </div>
        <div className="p-5 space-y-5">
          {([
            { key: 'humor',   label: 'Como acordei hoje', emoji: '😊' },
            { key: 'inchaco', label: 'Nível de inchaço',  emoji: '💧' },
            { key: 'energia', label: 'Energia geral',     emoji: '⚡' },
          ] as const).map(({ key, label, emoji }) => (
            <div key={key}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium" style={{ color: '#3a3530' }}>{emoji} {label}</p>
                <span className="text-sm font-bold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: '#eef4f2', color: '#195f52' }}>{form[key]}/5</span>
              </div>
              <div className="flex gap-2">
                {[1,2,3,4,5].map(v => (
                  <button key={v} onClick={() => setForm(f => ({ ...f, [key]: v }))}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all"
                    style={{ backgroundColor: form[key] === v ? '#195f52' : 'white', borderColor: form[key] === v ? '#195f52' : '#e8e2d9', color: form[key] === v ? 'white' : '#9b9289' }}>
                    {v}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div>
            <p className="text-sm font-medium mb-2" style={{ color: '#3a3530' }}>🍽️ Fome fora de hora?</p>
            <div className="flex gap-3">
              {[{ v: false, l: 'Não' }, { v: true, l: 'Sim' }].map(({ v, l }) => (
                <button key={String(v)} onClick={() => setForm(f => ({ ...f, fome: v }))}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition-all"
                  style={{ backgroundColor: form.fome === v ? '#195f52' : 'white', borderColor: form.fome === v ? '#195f52' : '#e8e2d9', color: form.fome === v ? 'white' : '#9b9289' }}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <button onClick={save} disabled={saving}
            className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all"
            style={{ backgroundColor: saved ? '#2a7a68' : saving ? '#8ab5ac' : '#195f52' }}>
            {saving ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full spin" />Salvando...</span>
              : saved ? '✓ Salvo!' : 'Salvar registro de hoje'}
          </button>
        </div>
      </div>

      {/* Médias */}
      {entries.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {[{ label: 'Humor', value: avg('humor'), emoji: '😊' }, { label: 'Inchaço', value: avg('inchaco'), emoji: '💧' }, { label: 'Energia', value: avg('energia'), emoji: '⚡' }].map(c => (
            <div key={c.label} className="rounded-2xl p-4 border text-center" style={{ backgroundColor: 'white', borderColor: '#e8e2d9' }}>
              <p className="text-xl">{c.emoji}</p>
              <p className="text-xl font-bold mt-1" style={{ color: '#195f52' }}>{c.value}</p>
              <p className="text-xs mt-0.5" style={{ color: '#9b9289' }}>{c.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Gráfico */}
      {chartData.length > 1 ? (
        <div className="rounded-2xl border p-5" style={{ backgroundColor: 'white', borderColor: '#e8e2d9' }}>
          <p className="font-semibold text-sm mb-4" style={{ color: '#195f52' }}>📈 Evolução (últimos 14 dias)</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ece6" />
              <XAxis dataKey="data" tick={{ fontSize: 10, fill: '#9b9289' }} />
              <YAxis domain={[0,5]} tick={{ fontSize: 10, fill: '#9b9289' }} />
              <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e8e2d9', borderRadius: 12, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="Humor"   stroke="#195f52" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="Inchaço" stroke="#b5873a" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="Energia" stroke="#2a7a68" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="rounded-2xl p-8 text-center border" style={{ backgroundColor: 'white', borderColor: '#e8e2d9' }}>
          <p className="text-4xl mb-3">📊</p>
          <p className="font-semibold" style={{ color: '#195f52' }}>Ainda sem dados</p>
          <p className="text-sm mt-1" style={{ color: '#6b6459' }}>Salve seu primeiro registro para ver o gráfico.</p>
        </div>
      )}
    </div>
  )
}
