import { MagnifyingGlass } from 'phosphor-react'

export function Header() {
  return (
    <div className="flex items-center w-full gap-2 justify-center mb-12">
      <MagnifyingGlass size={36} color="#4E9F3D" weight="bold" />

      <strong className="text-4xl text-white font-bold">
        <span className="text-green-500">GitHub</span>
        Details
      </strong>
    </div>
  )
}
