'use client'

import { useState } from 'react'
import { COMPRAS_30_DIAS, ERROS, HORARIOS_REC } from '@/lib/data'

type Tab = 'compras' | 'erros' | 'horarios'

export default function BonusPage() {
  const [tab, setTab] = useState<Tab>('compras')

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-5 fade-in">
      <div>
        <h1 className="text-xl font-bold" style={{ color: '#195f52' }}>Bônus</h1>
        <p className="text-sm mt-0.5" style={{ color: '#6b6459' }}>Conteúdo extra para potencializar seus resultados</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4" style={{ scrollbarWidth: 'none' }}>
        {([
          { key: 'compras', label: 'Lista de Compras', emoji: '🛒' },
          { key: 'erros',   label: '7 Erros',          emoji: '❌' },
          { key: 'horarios',label: 'Horários',          emoji: '🕐' },
        ] as const).map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border"
            style={{ backgroundColor: tab === t.key ? '#195f52' : 'white', color: tab === t.key ? 'white' : '#6b6459', borderColor: tab === t.key ? '#195f52' : '#e8e2d9' }}>
            <span>{t.emoji}</span>{t.label}
          </button>
        ))}
      </div>

      <div key={tab} className="fade-in">
        {tab === 'compras' && (
          <div className="space-y-3">
            <div className="rounded-2xl p-4 flex items-start gap-3" style={{ backgroundColor: '#eef4f2' }}>
              <span className="text-xl">💡</span>
              <p className="text-sm" style={{ color: '#195f52' }}>Lista completa para 30 dias. Preços estimados variam por região.</p>
            </div>
            <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: 'white', borderColor: '#e8e2d9' }}>
              <div className="grid grid-cols-3 px-4 py-3 text-xs font-semibold border-b" style={{ borderColor: '#f0ece6', color: '#9b9289', backgroundColor: '#faf9f7' }}>
                <span>Ingrediente</span><span className="text-center">Quantidade</span><span className="text-right">Custo est.</span>
              </div>
              {COMPRAS_30_DIAS.map((item, i) => (
                <div key={i} className="grid grid-cols-3 px-4 py-3 border-b last:border-b-0 text-sm" style={{ borderColor: '#f0ece6' }}>
                  <span style={{ color: '#3a3530' }}>{item.ingrediente}</span>
                  <span className="text-center" style={{ color: '#6b6459' }}>{item.quantidade}</span>
                  <span className="text-right font-medium" style={{ color: '#195f52' }}>{item.custo}</span>
                </div>
              ))}
            </div>
            <div className="rounded-2xl p-4 text-center" style={{ backgroundColor: '#195f52' }}>
              <p className="text-xs text-white opacity-75">Investimento total estimado por mês</p>
              <p className="text-xl font-bold text-white mt-1">R$ 99 – R$ 161</p>
              <p className="text-xs mt-1" style={{ color: '#b5d4ce' }}>~R$ 3,30 a R$ 5,37 por dia</p>
            </div>
          </div>
        )}

        {tab === 'erros' && (
          <div className="space-y-3">
            <div className="rounded-2xl p-4 flex items-start gap-3" style={{ backgroundColor: '#fff8f0' }}>
              <span className="text-xl">⚠️</span>
              <p className="text-sm" style={{ color: '#8b5e1a' }}>Os 7 erros mais comuns que sabotam o emagrecimento mesmo seguindo um protocolo.</p>
            </div>
            {ERROS.map((item, i) => (
              <div key={i} className="rounded-2xl border overflow-hidden" style={{ backgroundColor: 'white', borderColor: '#e8e2d9' }}>
                <div className="p-4 border-b" style={{ borderColor: '#f0ece6' }}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0" style={{ backgroundColor: '#b5873a', color: 'white' }}>{i + 1}</div>
                    <p className="font-semibold text-sm" style={{ color: '#3a3530' }}>{item.erro}</p>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#6b6459' }}>{item.explicacao}</p>
                </div>
                <div className="px-4 py-3" style={{ backgroundColor: '#eef4f2' }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: '#195f52' }}>✓ SOLUÇÃO</p>
                  <p className="text-sm" style={{ color: '#195f52' }}>{item.solucao}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'horarios' && (
          <div className="space-y-3">
            <div className="rounded-2xl p-4 flex items-start gap-3" style={{ backgroundColor: '#eef4f2' }}>
              <span className="text-xl">⏰</span>
              <p className="text-sm" style={{ color: '#195f52' }}>O horário de consumo potencializa o efeito do chá. Siga a recomendação do seu objetivo.</p>
            </div>
            {HORARIOS_REC.map((h, i) => (
              <div key={i} className="rounded-2xl border p-5" style={{ backgroundColor: 'white', borderColor: '#e8e2d9' }}>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <p className="font-bold" style={{ color: '#195f52' }}>{h.objetivo}</p>
                  <span className="font-bold px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#195f52', color: 'white' }}>{h.horario}</span>
                </div>
                <div className="space-y-1.5 text-sm" style={{ color: '#6b6459' }}>
                  <p>📅 {h.freq}</p>
                  <p>💡 {h.obs}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
