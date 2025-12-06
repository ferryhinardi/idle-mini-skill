import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Crystal Clicker - Idle + Mini-Skill Hybrid Game',
  description: 'An addictive idle game with skill-based mini-games. Grow your crystal empire!',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
