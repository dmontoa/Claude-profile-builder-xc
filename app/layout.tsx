import React from "react"
import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Learning Profile Builder - Claude Code',
  description: 'Answer 10 questions. Get a personalized CLAUDE.md that makes Claude Code teach the way YOU learn best.',
  generator: 'v0.app',
  openGraph: {
    title: 'Learning Profile Builder - Claude Code',
    description: 'Answer 10 questions. Get a personalized CLAUDE.md that makes Claude Code teach the way YOU learn best.',
    url: 'https://learning-profile-builder.vercel.app',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learning Profile Builder - Claude Code',
    description: 'Answer 10 questions. Get a personalized CLAUDE.md that makes Claude Code teach the way YOU learn best.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
