import './globals.scss'
import './reset.css'
import type { Metadata } from 'next'
import StyledComponentsRegistry from "@/lib/registry";

export const metadata: Metadata = {
  title: 'Katrix',
  description: 'A Kanban app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
    <StyledComponentsRegistry>
      <body>{children}</body>
    </StyledComponentsRegistry>
    </html>
  )
}
