import { Header } from '@/components/Header'
import { ReactNode } from 'react'

interface DefaultLayoutProps {
  children: ReactNode
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="w-full max-w-4xl mt-24 mx-auto">
      <Header />

      {children}
    </div>
  )
}
