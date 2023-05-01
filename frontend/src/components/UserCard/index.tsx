import { User } from '@/types/User'
import Image from 'next/image'
import { Buildings, GithubLogo, Share, Users } from 'phosphor-react'
import { Button } from '../Button'

interface UserCardProps {
  user: User
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="w-full h-36 flex items-center gap-6 rounded-md bg-gray-800 p-6 relative">
      <Image
        src={user.avatar_url}
        alt={user.name}
        width={96}
        height={96}
        className="rounded-md object-cover"
      />

      <a
        href={user.html_url}
        className="absolute top-4 right-4"
        target="_blank"
        rel="noreferrer"
      >
        <Button>
          <span className="text-sm font-bold leading-0">GITHUB</span>
          <Share size={14} weight="bold" />
        </Button>
      </a>

      <div className="w-full flex flex-col justify-between gap-2">
        <header className="flex items-center justify-between">
          <h2 className="text-white">{user.name ?? 'Sem nome.'}</h2>
        </header>

        <p className="text-gray-400">{user.bio}</p>

        <footer className="flex items-center gap-6 text-gray-400">
          <div className="flex items-center gap-2">
            <GithubLogo size={16} />
            <span>{user.login}</span>
          </div>

          {!!user.company && (
            <div className="flex items-center gap-2">
              <Buildings size={16} />
              <span>{user.company}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Users />
            <span>{user.followers} seguidores</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
