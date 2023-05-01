import { githubApi } from '@/lib/axios'
import { Repository } from '@/types/Repository'
import { User } from '@/types/User'

class UsersService {
  getUser(username: string) {
    return githubApi.get<User>(`/users/${username}`)
  }

  getUserRepos(username: string) {
    return githubApi.get<Repository[]>(`/users/${username}/repos?sort=created`)
  }
}

export const usersService = new UsersService()
