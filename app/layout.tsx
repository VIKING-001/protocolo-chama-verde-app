import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Protocolo Chama Verde',
  description: 'Acompanhamento diário de saúde e emagrecimento',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full`}>
      <body className="h-full antialiased" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', backgroundColor: '#f6f3ee' }}>
        {children}
      </body>
    </html>
  )
}
