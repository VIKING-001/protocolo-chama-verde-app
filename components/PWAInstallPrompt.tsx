'use client'

import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function PWAInstallPrompt() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').catch(() => {})
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setPrompt(e as BeforeInstallPromptEvent)
      setVisible(true)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  async function instalar() {
    if (!prompt) return
    await prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === 'accepted') setVisible(false)
    setPrompt(null)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 md:left-auto md:right-6 md:bottom-6 md:w-80">
      <div className="rounded-2xl shadow-xl p-4 flex items-start gap-3" style={{ backgroundColor: 'white', border: '1px solid #e8e2d9' }}>
        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-2xl" style={{ backgroundColor: '#195f52' }}>
          🌿
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm" style={{ color: '#195f52' }}>Instalar o app</p>
          <p className="text-xs mt-0.5 leading-relaxed" style={{ color: '#6b6459' }}>
            Adicione o Chama Verde à sua tela inicial para acesso rápido.
          </p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={instalar}
              className="flex-1 py-2 rounded-xl text-xs font-semibold text-white"
              style={{ backgroundColor: '#195f52' }}>
              Instalar
            </button>
            <button
              onClick={() => setVisible(false)}
              className="px-3 py-2 rounded-xl text-xs font-medium"
              style={{ backgroundColor: '#f0ece6', color: '#6b6459' }}>
              Agora não
            </button>
          </div>
        </div>
        <button onClick={() => setVisible(false)} className="text-lg leading-none shrink-0" style={{ color: '#c8c0b0' }}>×</button>
      </div>
    </div>
  )
}
