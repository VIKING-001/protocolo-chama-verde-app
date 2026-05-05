import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import PWAInstallPrompt from '@/components/PWAInstallPrompt'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Protocolo Chama Verde',
  description: 'Acompanhamento diário de saúde e emagrecimento',
  manifest: '/manifest.json',
  themeColor: '#195f52',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Chama Verde',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full`}>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="h-full antialiased" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', backgroundColor: '#f6f3ee' }}>
        {children}
        <PWAInstallPrompt />
      </body>
    </html>
  )
}
