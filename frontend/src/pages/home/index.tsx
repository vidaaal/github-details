import { Button } from '@/components/Button'
import { RepositoryCard } from '@/components/RepositoryCard'
import { Spinner } from '@/components/Spinner'
import { TextInput } from '@/components/TextInput'
import { UserCard } from '@/components/UserCard'
import { useDebounce } from '@/hooks/useDebounce'
import { usersService } from '@/services/users'
import { Repository } from '@/types/Repository'
import { User } from '@/types/User'
import { AxiosError } from 'axios'
import { ArrowClockwise } from 'phosphor-react'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [user, setUser] = useState<User>()
  const [repos, setRepos] = useState<Repository[]>([])
  const [hasError, setHasError] = useState(false)
  const [userNotFound, setUserNotFound] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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
        setIsLoading(true)

        localStorage.setItem('@github-deitals.username', debouncedSearchTerm)

        const [userResponse, reposResponse] = await Promise.all([
          usersService.getUser(debouncedSearchTerm),
          usersService.getUserRepos(debouncedSearchTerm),
        ])
        setUser(userResponse.data)
        setRepos(reposResponse.data)
      } else {
        localStorage.removeItem('@github-deitals.username')
        setUser(undefined)
        setRepos([])
      }
    } catch (err) {
      const errorResponse = err as AxiosError

      if (errorResponse.response?.status === 404) {
        setUserNotFound(true)
      } else {
        setHasError(true)
      }

      setUser(undefined)
      setRepos([])
    } finally {
      setIsLoading(false)
    }
  }, [debouncedSearchTerm])

  useEffect(() => {
    fetchGithubUserInfo()
  }, [fetchGithubUserInfo])

  function handleSearchTermChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value)
    setHasError(false)
    setUserNotFound(false)
  }

  const hasFoundUser = !!user
  const hasRepos = repos.length > 0
  const isEmpty = !isLoading && !searchTerm
  const isErrorOnScreen = hasError && !isLoading && searchTerm
  const isSearchLoading =
    isLoading || (searchTerm && !hasError && !userNotFound)

  console.log(isEmpty)

  return (
    <div>
      <TextInput
        prefix="github.com/"
        placeholder="seu-usuario"
        onChange={(e) => handleSearchTermChange(e)}
        value={searchTerm}
      />

      <main className="my-8">
        {isSearchLoading && (
          <div className="mt-16 flex justify-center">
            <Spinner />
          </div>
        )}

        {isEmpty && (
          <div className="mt-16 flex flex-col items-center justify-center">
            <h1 className="text-2xl mb-2 text-white">Bem-vindo!</h1>
            <p className="text-gray-400">
              Digite o nome do usuário do Github para ver suas informações
              públicas.
            </p>
          </div>
        )}

        {isErrorOnScreen && (
          <div className="mt-16 flex flex-col items-center justify-center text-gray-400 font-bold">
            <h1 className="text-2xl mb-2">Ocorreu algum erro!</h1>

            <Button onClick={fetchGithubUserInfo}>
              <ArrowClockwise size={16} weight="bold" />
              Tentar Novamente
            </Button>
          </div>
        )}

        {userNotFound && (
          <div className="mt-16 flex flex-col items-center">
            <h1 className="text-2xl text-white font-bold mb-2">
              Usuário não encontrado!
            </h1>
            <p className="text-gray-400">Confira se digitou corretamente.</p>
          </div>
        )}

        {hasFoundUser && <UserCard user={user} />}

        {hasRepos && (
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
