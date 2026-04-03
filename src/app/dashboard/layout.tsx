import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard – Finaxis Finance Operations',
  description: 'Finance agent operations dashboard',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
