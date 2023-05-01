import { Repository } from '@/types/Repository'
import { ArrowRight } from 'phosphor-react'
import Link from 'next/link'

import { formatDistanceToNow } from '@/utils/formatDistanceToNow'
import { Button } from '../Button'

interface RepositoryCardProps {
  repo: Repository
}

export function RepositoryCard({ repo }: RepositoryCardProps) {
  const repoDateDistanceFromNow = formatDistanceToNow(new Date(repo.created_at))

  return (
    <div className="flex flex-col justify-between w-full p-4 h-36 bg-gray-800 rounded-md">
      <div>
        <header className="flex items-center justify-between">
          <p className="text-white leading-none">{repo.name}</p>

          <span className="text-sm leading-none text-gray-400">
            {repoDateDistanceFromNow}
          </span>
        </header>

        <p className="text-gray-400 mt-2 text-sm">
          {repo.description ?? 'Não possui descrição.'}
        </p>
      </div>

      <Link
        className="self-end"
        href={`${repo.owner.login}/repo/${repo.name}`}
        passHref
      >
        <Button>
          Ver mais
          <ArrowRight weight="bold" />
        </Button>
      </Link>
    </div>
  )
}
