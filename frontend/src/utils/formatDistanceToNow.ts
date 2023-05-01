import { formatDistanceToNow as dateFnsformatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

export function formatDistanceToNow(date: Date) {
  return dateFnsformatDistanceToNow(date, {
    addSuffix: true,
    locale: ptBr,
  })
}
