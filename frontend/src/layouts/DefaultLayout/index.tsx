import { ReactNode } from 'react'

interface DefaultLayoutProps {
  children: ReactNode
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="w-full max-w-4xl my-0 mx-auto">
      <h1>header</h1>

      {children}
    </div>
  )
}
