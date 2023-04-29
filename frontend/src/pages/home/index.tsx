import { RepositoryCard } from '@/components/RepositoryCard'
import { TextInput } from '@/components/TextInput'
import { UserCard } from '@/components/UserCard'
import { useDebounce } from '@/hooks/useDebounce'
import { usersService } from '@/services/users'
import { Repository } from '@/types/Repository'
import { User } from '@/types/User'
import { useCallback, useEffect, useState } from 'react'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [user, setUser] = useState<User>()
  const [repos, setRepos] = useState<Repository[]>([])

  const debouncedSearchTerm = useDebounce(searchTerm)

  const fetchGithubUserInfo = useCallback(async () => {
    if (searchTerm) {
      try {
        Promise.allSettled([
          usersService
            .getUser(debouncedSearchTerm)
            .then((result) => setUser(result.data)),
          usersService
            .getUserRepos(debouncedSearchTerm)
            .then((result) => setRepos(result.data)),
        ])
      } catch (err) {
        console.log(err)
      }
    }
  }, [debouncedSearchTerm])

  useEffect(() => {
    fetchGithubUserInfo()
  }, [fetchGithubUserInfo])

  return (
    <div>
      <TextInput
        prefix="github.com/"
        placeholder="seu-usuario"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <main className="mt-8">
        {!!user && <UserCard user={user} />}

        {repos.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-6">
            {repos.map((repo) => (
              <RepositoryCard key={repo.name} repository={repo} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
