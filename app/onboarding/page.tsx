'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Objetivo } from '@/lib/data'

const OBJETIVOS: { value: Objetivo; label: string; emoji: string; desc: string }[] = [
  { value: 'desinchar',    label: 'Desinchar',     emoji: '💧', desc: 'Reduzir retenção de líquidos e inchaço' },
  { value: 'reduzir_fome', label: 'Reduzir Fome',  emoji: '🎯', desc: 'Controlar a fome fora de hora' },
  { value: 'perder_peso',  label: 'Perder Peso',   emoji: '🔥', desc: 'Acelerar o metabolismo e queimar gordura' },
  { value: 'mais_energia', label: 'Mais Energia',  emoji: '⚡', desc: 'Ter disposição e energia estável' },
]
const HORARIOS = ['06:00','06:30','07:00','07:30','08:00','08:30','09:00']

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [nome, setNome] = useState('')
  const [peso, setPeso] = useState('')
  const [objetivo, setObjetivo] = useState<Objetivo | ''>('')
  const [horario, setHorario] = useState('07:00')
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push('/auth'); return }
      setUserId(data.user.id)
    })
  }, [router])

  async function handleSubmit() {
    if (!userId || !objetivo) return
    setLoading(true)
    await supabase.from('profiles').upsert({ user_id: userId, nome: nome.trim(), peso_inicial: parseFloat(peso), objetivo, horario_bebida: horario })
    router.push('/dashboard')
  }

  const canNext = step === 1 ? nome.trim().length > 1 && peso.length > 0 : step === 2 ? objetivo !== '' : true

  const S = { borderColor: '#d4cec6', backgroundColor: '#faf9f7' }
  const focus = (e: React.FocusEvent<HTMLInputElement>) => e.target.style.borderColor = '#195f52'
  const blur  = (e: React.FocusEvent<HTMLInputElement>) => e.target.style.borderColor = '#d4cec6'

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#f6f3ee' }}>
      <div className="w-full max-w-lg fade-in">
        <div className="text-center mb-6">
          <p className="text-4xl mb-2">🌿</p>
          <h1 className="text-xl font-bold" style={{ color: '#195f52' }}>Vamos personalizar seu protocolo</h1>
          <p className="text-sm mt-1" style={{ color: '#6b6459' }}>Passo {step} de 3</p>
        </div>

        <div className="flex gap-2 mb-6">
          {[1,2,3].map(s => (
            <div key={s} className="h-1.5 flex-1 rounded-full transition-all" style={{ backgroundColor: s <= step ? '#195f52' : '#d4cec6' }} />
          ))}
        </div>

        <div className="rounded-2xl shadow-sm border p-8" style={{ backgroundColor: 'white', borderColor: '#e8e2d9' }}>
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold" style={{ color: '#195f52' }}>Dados básicos</h2>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: '#3a3530' }}>Como você se chama?</label>
                <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Seu primeiro nome"
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={S} onFocus={focus} onBlur={blur} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: '#3a3530' }}>Peso atual (kg)</label>
                <input type="number" value={peso} onChange={e => setPeso(e.target.value)} placeholder="Ex: 72.5" step="0.1" min="30" max="250"
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={S} onFocus={focus} onBlur={blur} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold" style={{ color: '#195f52' }}>Qual é seu principal objetivo?</h2>
              <p className="text-sm" style={{ color: '#6b6459' }}>Isso define sua receita personalizada.</p>
              {OBJETIVOS.map(o => (
                <button key={o.value} onClick={() => setObjetivo(o.value)}
                  className="flex items-center gap-4 p-4 rounded-xl border-2 w-full text-left transition-all"
                  style={{ borderColor: objetivo === o.value ? '#195f52' : '#e8e2d9', backgroundColor: objetivo === o.value ? '#eef4f2' : 'white' }}>
                  <span className="text-2xl">{o.emoji}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm" style={{ color: '#195f52' }}>{o.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#6b6459' }}>{o.desc}</p>
                  </div>
                  {objetivo === o.value && <span style={{ color: '#195f52' }}>✓</span>}
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold" style={{ color: '#195f52' }}>Melhor horário para o chá</h2>
              <p className="text-sm" style={{ color: '#6b6459' }}>A consistência é o segredo do protocolo.</p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {HORARIOS.map(h => (
                  <button key={h} onClick={() => setHorario(h)} className="py-3 rounded-xl border-2 text-sm font-medium transition-all"
                    style={{ borderColor: horario === h ? '#195f52' : '#e8e2d9', backgroundColor: horario === h ? '#195f52' : 'white', color: horario === h ? 'white' : '#3a3530' }}>
                    {h}
                  </button>
                ))}
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: '#eef4f2' }}>
                <span className="text-xl">💡</span>
                <p className="text-sm" style={{ color: '#195f52' }}>O melhor horário é em jejum, pela manhã — potencializa a absorção dos ativos.</p>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button onClick={() => setStep(s => s - 1)} className="flex-1 py-3 rounded-xl border font-medium text-sm"
                style={{ borderColor: '#d4cec6', color: '#6b6459' }}>Voltar</button>
            )}
            {step < 3 ? (
              <button onClick={() => setStep(s => s + 1)} disabled={!canNext}
                className="flex-1 py-3 rounded-xl font-semibold text-sm text-white"
                style={{ backgroundColor: canNext ? '#195f52' : '#a8c5bf' }}>Continuar</button>
            ) : (
              <button onClick={handleSubmit} disabled={loading}
                className="flex-1 py-3 rounded-xl font-semibold text-sm text-white"
                style={{ backgroundColor: loading ? '#8ab5ac' : '#195f52' }}>
                {loading ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full spin" />Salvando...</span>
                  : 'Começar meu protocolo 🌿'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
