import { githubApi } from '@/lib/axios'
import { Repository } from '@/types/Repository'

interface getRepositoryBody {
  user: string
  repoName: string
}

class RepositoriesService {
  getRepository({ user, repoName }: getRepositoryBody) {
    return githubApi.get<Repository[]>(`/repos/${user}/${repoName}`)
  }
}

export const repositoriesService = new RepositoriesService()
