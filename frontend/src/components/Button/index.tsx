import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      className="flex items-center gap-1 leading-none font-bold text-blue-500"
      {...rest}
    >
      {children}
    </button>
  )
}
