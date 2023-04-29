import { formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

import { Repository } from '@/types/Repository'
import { ArrowRight } from 'phosphor-react'
import Link from 'next/link'

interface ReositoryCardProps {
  repository: Repository
}

export function RepositoryCard({ repository }: ReositoryCardProps) {
  const repoDateDistanceFromNow = formatDistanceToNow(
    new Date(repository.created_at),
    {
      addSuffix: true,
      locale: ptBr,
    },
  )

  return (
    <div className="flex flex-col justify-between w-full p-4 h-36 bg-gray-800 rounded-md">
      <div>
        <header className="flex items-center justify-between">
          <p className="text-white leading-none">{repository.name}</p>

          <span className="text-sm leading-none text-gray-400">
            {repoDateDistanceFromNow}
          </span>
        </header>

        <p className="text-gray-400 mt-2 text-sm">
          {repository.description ?? 'Não possui descrição.'}
        </p>
      </div>

      <Link
        type="button"
        className="flex gap-1 leading-none items-center self-end font-bold text-blue-500"
        href={`repo/${repository.name}`}
      >
        Ver mais
        <ArrowRight weight="bold" />
      </Link>
    </div>
  )
}
