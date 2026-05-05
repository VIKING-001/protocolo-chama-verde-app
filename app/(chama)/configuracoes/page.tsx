'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { OBJETIVOS_LABEL } from '@/lib/data'
import type { Objetivo } from '@/lib/data'

const HORARIOS = ['06:00','06:30','07:00','07:30','08:00','08:30','09:00']

type Profile = { id: string; nome: string; peso_inicial: number; objetivo: Objetivo; horario_bebida: string; created_at: string }

export default function ConfiguracoesPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [nome, setNome] = useState('')
  const [peso, setPeso] = useState('')
  const [objetivo, setObjetivo] = useState<Objetivo>('perder_peso')
  const [horario, setHorario] = useState('07:00')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [uid, setUid] = useState<string | null>(null)
  const [email, setEmail] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return
      setUid(data.user.id); setEmail(data.user.email ?? '')
      supabase.from('profiles').select('id,nome,peso_inicial,objetivo,horario_bebida,created_at').eq('user_id', data.user.id).single()
        .then(({ data: p }) => {
          if (!p) return
          const prof = p as Profile
          setProfile(prof); setNome(prof.nome); setPeso(String(prof.peso_inicial)); setObjetivo(prof.objetivo); setHorario(prof.horario_bebida)
        })
    })
  }, [])

  async function save() {
    if (!uid) return
    setSaving(true)
    await supabase.from('profiles').update({ nome: nome.trim(), peso_inicial: parseFloat(peso), objetivo, horario_bebida: horario }).eq('user_id', uid)
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000)
  }

  if (!profile) return <div className="min-h-screen flex items-center justify-center"><div className="w-6 h-6 border-2 border-t-transparent rounded-full spin" style={{ borderColor: '#195f52' }} /></div>

  const dias = Math.max(1, Math.floor((Date.now() - new Date(profile.created_at).getTime()) / 86400000) + 1)
  const S = { borderColor: '#d4cec6', backgroundColor: '#faf9f7' }
  const focus = (e: React.FocusEvent<HTMLInputElement>) => e.target.style.borderColor = '#195f52'
  const blur  = (e: React.FocusEvent<HTMLInputElement>) => e.target.style.borderColor = '#d4cec6'

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-5 fade-in">
      <div>
        <h1 className="text-xl font-bold" style={{ color: '#195f52' }}>Configurações</h1>
        <p className="text-sm mt-0.5" style={{ color: '#6b6459' }}>Personalize seu protocolo</p>
      </div>

      <div className="rounded-2xl p-5 flex items-center gap-4" style={{ backgroundColor: '#195f52' }}>
        <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
          {profile.nome.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-bold text-white">{profile.nome}</p>
          <p className="text-sm" style={{ color: '#b5d4ce' }}>{email}</p>
          <p className="text-xs mt-1" style={{ color: '#b5d4ce' }}>Dia {dias} no protocolo 🌿</p>
        </div>
      </div>

      <div className="rounded-2xl border" style={{ backgroundColor: 'white', borderColor: '#e8e2d9' }}>
        <p className="px-5 py-4 font-semibold text-sm border-b" style={{ borderColor: '#f0ece6', color: '#195f52' }}>Editar perfil</p>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#3a3530' }}>Nome</label>
            <input type="text" value={nome} onChange={e => setNome(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={S} onFocus={focus} onBlur={blur} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#3a3530' }}>Peso atual (kg)</label>
            <input type="number" value={peso} onChange={e => setPeso(e.target.value)} step="0.1" min="30" max="250"
              className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={S} onFocus={focus} onBlur={blur} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#3a3530' }}>Objetivo</label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.entries(OBJETIVOS_LABEL) as [Objetivo, string][]).map(([key, label]) => (
                <button key={key} onClick={() => setObjetivo(key)}
                  className="py-2.5 px-3 rounded-xl border-2 text-sm font-medium text-left transition-all"
                  style={{ borderColor: objetivo === key ? '#195f52' : '#e8e2d9', backgroundColor: objetivo === key ? '#eef4f2' : 'white', color: objetivo === key ? '#195f52' : '#6b6459' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#3a3530' }}>Horário do chá</label>
            <div className="grid grid-cols-4 gap-2">
              {HORARIOS.map(h => (
                <button key={h} onClick={() => setHorario(h)}
                  className="py-2 rounded-xl border-2 text-sm font-medium transition-all"
                  style={{ borderColor: horario === h ? '#195f52' : '#e8e2d9', backgroundColor: horario === h ? '#195f52' : 'white', color: horario === h ? 'white' : '#3a3530' }}>
                  {h}
                </button>
              ))}
            </div>
          </div>
          <button onClick={save} disabled={saving}
            className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all"
            style={{ backgroundColor: saved ? '#2a7a68' : saving ? '#8ab5ac' : '#195f52' }}>
            {saving ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full spin" />Salvando...</span>
              : saved ? '✓ Alterações salvas!' : 'Salvar alterações'}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border" style={{ backgroundColor: 'white', borderColor: '#e8e2d9' }}>
        <button onClick={async () => { await supabase.auth.signOut(); router.push('/auth') }}
          className="w-full flex items-center gap-3 px-5 py-4 text-left" style={{ color: '#c0392b' }}>
          <span className="text-xl">🚪</span>
          <div>
            <p className="font-semibold text-sm">Sair da conta</p>
            <p className="text-xs mt-0.5" style={{ color: '#9b9289' }}>Você precisará fazer login novamente</p>
          </div>
        </button>
      </div>

      <p className="text-center text-xs pb-4" style={{ color: '#c8c0b0' }}>Protocolo Chama Verde · v1.0</p>
    </div>
  )
}
