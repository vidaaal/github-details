import { Button } from '@/components/Button'
import { RepositoryCard } from '@/components/RepositoryCard'
import { TextInput } from '@/components/TextInput'
import { UserCard } from '@/components/UserCard'
import { useDebounce } from '@/hooks/useDebounce'
import { usersService } from '@/services/users'
import { Repository } from '@/types/Repository'
import { User } from '@/types/User'
import { ArrowClockwise } from 'phosphor-react'
import { useCallback, useEffect, useState } from 'react'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [user, setUser] = useState<User>()
  const [repos, setRepos] = useState<Repository[]>([])
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const localStorageUsername = localStorage.getItem(
      '@github-deitals.username',
    )

    if (localStorageUsername) {
      setSearchTerm(localStorageUsername)
    }
  }, [])

  const debouncedSearchTerm = useDebounce(searchTerm)

  console.log(debouncedSearchTerm)

  const fetchGithubUserInfo = useCallback(async () => {
    try {
      if (debouncedSearchTerm) {
        localStorage.setItem('@github-deitals.username', debouncedSearchTerm)

        const [userResponse, reposResponse] = await Promise.all([
          usersService.getUser(debouncedSearchTerm),
          usersService.getUserRepos(debouncedSearchTerm),
        ])

        setHasError(false)
        setUser(userResponse.data)
        setRepos(reposResponse.data)
      } else {
        setUser(undefined)
        setRepos([])
      }
    } catch (err) {
      setHasError(true)
      setUser(undefined)
      setRepos([])
    }
  }, [debouncedSearchTerm])

  useEffect(() => {
    fetchGithubUserInfo()
  }, [fetchGithubUserInfo])

  console.log(hasError)

  return (
    <div>
      <TextInput
        prefix="github.com/"
        placeholder="seu-usuario"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />

      <main className="mt-8">
        {hasError && (
          <div className="mt-16 flex flex-col items-center justify-center text-gray-400 font-bold">
            <h1 className="text-2xl mb-2">Ocorreu algum erro!</h1>

            <Button onClick={fetchGithubUserInfo}>
              <ArrowClockwise size={16} weight="bold" />
              Tentar Novamente
            </Button>
          </div>
        )}

        {!!user && <UserCard user={user} />}

        {repos.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-6">
            {repos.map((repo) => (
              <RepositoryCard key={repo.name} repo={repo} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
