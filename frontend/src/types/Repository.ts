import { User } from './User'

export interface Repository {
  name: string
  description: string
  created_at: string
  updated_at: string
  owner: User
  html_url: string
  forks_count: number
  watchers_count: number
  stargazers_count: number
}
