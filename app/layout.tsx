import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vojjala Aravind — AI Engineer',
  description: 'Generative AI Engineer. RAG systems, multi-agent orchestration, production-grade LLM pipelines.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
