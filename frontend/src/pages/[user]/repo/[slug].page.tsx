import { InfoLabel } from '@/components/InfoLabel'
import { repositoriesService } from '@/services/repositories'
import { Repository } from '@/types/Repository'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import {
  ArrowLeft,
  Eye,
  GitFork,
  GithubLogo,
  Share,
  Star,
} from 'phosphor-react'

import { formatDistanceToNow } from '@/utils/formatDistanceToNow'

interface RepoDetailsProps {
  repo: Repository
}

export default function RepoDetails({ repo }: RepoDetailsProps) {
  console.log(repo)

  return (
    <div>
      <Link
        href="/"
        className="w-fit flex gap-1 leading-none items-center self-end font-bold text-blue-500"
      >
        <ArrowLeft weight="bold" />
        Voltar
      </Link>

      <main className="mt-4 w-full flex flex-col rounded-md bg-gray-800 p-6">
        <header className="w-full flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <h1 className="text-2xl font-bold text-white">{repo.name}</h1>

            <InfoLabel
              icon={<Star size={20} />}
              value={repo.stargazers_count}
            />

            <InfoLabel icon={<GitFork size={20} />} value={repo.forks_count} />

            <InfoLabel icon={<Eye size={20} />} value={repo.watchers_count} />
          </div>

          <a
            href={repo.html_url}
            className="flex items-center gap-1 text-blue-500"
            target="_blank"
            rel="noreferrer"
          >
            <span className="text-sm font-bold leading-0">VER NO GITHUB</span>
            <Share size={14} weight="bold" />
          </a>
        </header>

        <section className="mt-4">
          <p className="text-gray-400">
            {repo.description ?? 'Não possui descrição.'}
          </p>
        </section>

        <footer className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-gray-400">
            <GithubLogo size={16} />
            <span>{repo.owner.login}</span>
          </div>

          <div className="flex items-center text-sm text-gray-400">
            <p>Criado {formatDistanceToNow(new Date(repo.created_at))}</p>
            <div className="mx-2 w-px h-4 bg-gray-400" />
            <p>
              Ultima atualização{' '}
              {formatDistanceToNow(new Date(repo.updated_at))}
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { user, slug } = params as { user: string; slug: string }

  const { data: repository } = await repositoriesService.getRepository({
    repoName: slug,
    user,
  })

  return {
    props: {
      repo: repository,
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
