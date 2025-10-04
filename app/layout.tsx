import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { BottomNav } from '@/components/bottom-nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FitBoost AI - Your Personal Fitness Coach',
  description: 'AI-powered fitness and nutrition coaching app with personalized workout plans and diet recommendations.',
  manifest: '/manifest.json',
  themeColor: '#7CFC00',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background">
            {children}
            <BottomNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
