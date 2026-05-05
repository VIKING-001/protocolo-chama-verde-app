'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthPage() {
  const router = useRouter()
  const [tab, setTab] = useState<'login' | 'cadastro'>('login')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault(); setErro(''); setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
    if (error) { setErro('Email ou senha incorretos.'); setLoading(false); return }
    const { data: { user } } = await supabase.auth.getUser()
    const { data: profile } = await supabase.from('profiles').select('id').eq('user_id', user!.id).maybeSingle()
    router.push(profile ? '/dashboard' : '/onboarding')
  }

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault(); setErro(''); setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password: senha })
    setLoading(false)
    if (error) { setErro(error.message.includes('already') ? 'Email já cadastrado.' : 'Erro ao criar conta.'); return }
    setSucesso('Conta criada! Confirme seu email e faça login.')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#f6f3ee' }}>
      <div className="w-full max-w-md fade-in">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4 shadow-md" style={{ backgroundColor: '#195f52' }}>🌿</div>
          <h1 className="text-2xl font-bold" style={{ color: '#195f52' }}>Protocolo Chama Verde</h1>
          <p className="text-sm mt-1" style={{ color: '#6b6459' }}>Sua jornada de saúde começa aqui</p>
        </div>

        <div className="rounded-2xl shadow-sm border p-8" style={{ backgroundColor: 'white', borderColor: '#e8e2d9' }}>
          <div className="flex rounded-xl p-1 mb-6" style={{ backgroundColor: '#f6f3ee' }}>
            {(['login', 'cadastro'] as const).map(t => (
              <button key={t} onClick={() => { setTab(t); setErro(''); setSucesso('') }}
                className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                style={tab === t ? { backgroundColor: '#195f52', color: 'white' } : { color: '#6b6459' }}>
                {t === 'login' ? 'Entrar' : 'Criar conta'}
              </button>
            ))}
          </div>

          {sucesso ? (
            <div className="text-center py-6">
              <p className="text-4xl mb-3">✉️</p>
              <p className="font-medium" style={{ color: '#195f52' }}>{sucesso}</p>
              <button onClick={() => { setSucesso(''); setTab('login') }} className="mt-4 text-sm underline" style={{ color: '#b5873a' }}>Ir para login</button>
            </div>
          ) : (
            <form onSubmit={tab === 'login' ? handleLogin : handleCadastro} className="space-y-4">
              {[
                { label: 'Email', type: 'email', value: email, onChange: setEmail, placeholder: 'seu@email.com' },
                { label: 'Senha', type: 'password', value: senha, onChange: setSenha, placeholder: 'Mínimo 6 caracteres' },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#3a3530' }}>{f.label}</label>
                  <input type={f.type} required minLength={f.type === 'password' ? 6 : undefined}
                    value={f.value} onChange={e => f.onChange(e.target.value)} placeholder={f.placeholder}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                    style={{ borderColor: '#d4cec6', backgroundColor: '#faf9f7' }}
                    onFocus={e => e.target.style.borderColor = '#195f52'}
                    onBlur={e => e.target.style.borderColor = '#d4cec6'} />
                </div>
              ))}
              {erro && <p className="text-sm px-3 py-2 rounded-lg" style={{ color: '#c0392b', backgroundColor: '#fdf0ed' }}>{erro}</p>}
              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-xl font-semibold text-white transition-all"
                style={{ backgroundColor: loading ? '#8ab5ac' : '#195f52' }}>
                {loading ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full spin" />Aguarde...</span>
                  : tab === 'login' ? 'Entrar' : 'Criar conta gratuita'}
              </button>
            </form>
          )}
        </div>
        <p className="text-center text-xs mt-5" style={{ color: '#9b9289' }}>Ao continuar, você concorda com os termos de uso</p>
      </div>
    </div>
  )
}
