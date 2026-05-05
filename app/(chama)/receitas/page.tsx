'use client'

import { useState } from 'react'
import { RECEITAS } from '@/lib/data'
import type { Objetivo } from '@/lib/data'

const TABS: { key: Objetivo; label: string }[] = [
  { key: 'desinchar',    label: 'Desinchar'    },
  { key: 'reduzir_fome', label: 'Reduzir Fome' },
  { key: 'perder_peso',  label: 'Perder Peso'  },
  { key: 'mais_energia', label: 'Mais Energia' },
]

export default function ReceitasPage() {
  const [ativo, setAtivo] = useState<Objetivo>('desinchar')
  const r = RECEITAS[ativo]

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-5 fade-in">
      <div>
        <h1 className="text-xl font-bold" style={{ color: '#195f52' }}>Receitas</h1>
        <p className="text-sm mt-0.5" style={{ color: '#6b6459' }}>4 variações do Protocolo por objetivo</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4" style={{ scrollbarWidth: 'none' }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => setAtivo(t.key)}
            className="shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all border"
            style={{ backgroundColor: ativo === t.key ? '#195f52' : 'white', color: ativo === t.key ? 'white' : '#6b6459', borderColor: ativo === t.key ? '#195f52' : '#e8e2d9' }}>
            {t.label}
          </button>
        ))}
      </div>

      <div key={ativo} className="space-y-4 fade-in">
        <div className="rounded-2xl p-6 flex items-center gap-4" style={{ backgroundColor: '#195f52' }}>
          <span className="text-5xl">{r.emoji}</span>
          <div>
            <h2 className="text-xl font-bold text-white">{r.nome}</h2>
            <p className="text-xs mt-1" style={{ color: '#b5d4ce' }}>🕐 {r.melhorHorario}</p>
          </div>
        </div>

        <div className="rounded-2xl p-4 flex items-start gap-3" style={{ backgroundColor: '#eef4f2' }}>
          <span className="text-xl">✨</span>
          <p className="text-sm" style={{ color: '#195f52' }}>{r.beneficios}</p>
        </div>

        <div className="rounded-2xl border" style={{ backgroundColor: 'white', borderColor: '#e8e2d9' }}>
          <p className="px-5 py-4 font-semibold text-sm border-b" style={{ borderColor: '#f0ece6', color: '#195f52' }}>🧂 Ingredientes</p>
          <div className="p-5 space-y-3">
            {r.ingredientes.map((ing, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#195f52' }} />
                  <span className="text-sm" style={{ color: '#3a3530' }}>{ing.item}</span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: '#f6f3ee', color: '#195f52' }}>{ing.quantidade}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border" style={{ backgroundColor: 'white', borderColor: '#e8e2d9' }}>
          <p className="px-5 py-4 font-semibold text-sm border-b" style={{ borderColor: '#f0ece6', color: '#195f52' }}>📋 Modo de Preparo</p>
          <div className="p-5 space-y-4">
            {r.preparo.map((passo, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ backgroundColor: '#195f52', color: 'white' }}>{i + 1}</div>
                <p className="text-sm leading-relaxed flex-1" style={{ color: '#3a3530' }}>{passo}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-4 flex items-center gap-3" style={{ backgroundColor: '#b5873a' }}>
          <span className="text-2xl">🕐</span>
          <div>
            <p className="text-xs font-medium text-white opacity-80">Melhor horário</p>
            <p className="font-bold text-white">{r.melhorHorario}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
