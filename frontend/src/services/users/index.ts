import { githubApi } from '@/lib/axios'

class UsersService {
  getUser(username: string) {
    return githubApi.get(`/users/${username}`)
  }

  getUserRepos(username: string) {
    return githubApi.get(`/users/${username}/repos`)
  }
}

export const usersService = new UsersService()
