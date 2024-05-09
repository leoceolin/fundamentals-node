import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (req: any, res: any) => {
      const { search } = req.query

      const users = database.select('users', search ? {
        name: search,
        email: search
      } : null)

      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: (req: any, res: any) => {
      const { name, email } = req.body

      const user = {
        id: randomUUID(),
        name,
        email,
      }


      database.insert('users', user)

      return res.writeHead(201).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req: any, res: any) => {
      const { id } = req.params

      database.delete('users', id)

      return res.writeHead(204).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handler: (req: any, res: any) => {
      const { id } = req.params
      const { name, email } = req.body

      if (name && email) {
        database.update('users', id, {
          id,
          name,
          email,
        })
      }


      return res.writeHead(204).end()
    }
  },
]
