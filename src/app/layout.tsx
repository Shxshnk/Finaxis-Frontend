import type { Metadata } from 'next'
import './globals.css'
import ThemeRegistry from '@/theme/ThemeRegistry'

export const metadata: Metadata = {
  title: 'Finaxis – Finance Operations Platform',
  description: 'Streamlining accounts, vendors, finance agents & compliance with ease',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  )
}
