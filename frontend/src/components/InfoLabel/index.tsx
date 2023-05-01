import { ReactNode } from 'react'

interface InfoLabelProps {
  icon: ReactNode
  value: number
}

export function InfoLabel({ icon, value }: InfoLabelProps) {
  return (
    <div className="flex items-center text-gray-400 bg-gray-700 rounded-md">
      <figure className="px-1 py-0.5  text-gray-500">{icon}</figure>

      <div className="h-6 w-px bg-gray-800" />

      <span className="px-1 py-0.5  text-gray-400 text-md leading-none">
        {value}
      </span>
    </div>
  )
}
