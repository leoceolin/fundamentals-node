import { ArrayElement } from "./utils/array-elements"
import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

interface UserDBTable {
  id: string
  name: string
  email: string
}

interface PropsDatabase {
  users: UserDBTable[]
}

interface Search {
  name: string
  email: string
}

export class Database {
  database = {} as PropsDatabase

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then(data => {
        this.database = JSON.parse(data)
      })
      .catch(() => {
        this.persist()
      })
  }

  persist() {
    fs.writeFile(databasePath, JSON.stringify(this.database))
  }


  select(table: keyof PropsDatabase, search: Search | null) {
    let data = this.database[table] ?? []

    if (search) {
      data = data.filter((row: any) => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value?.toLowerCase())
        })
      })
    }

    return data
  }


  insert<K extends keyof PropsDatabase>(
    table: K,
    data: ArrayElement<PropsDatabase[K]>
  ) {
    if (Array.isArray(this.database[table])) {
      this.database[table].push(data)
    } else {
      this.database[table] = [data]
    }

    this.persist()

    return data
  }

  delete<K extends keyof PropsDatabase>(
    table: K,
    id: string
  ) {
    const rowIndex = this.database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.database[table].splice(rowIndex, 1)
      this.persist()
    }

  }

  update<K extends keyof PropsDatabase>(
    table: K,
    id: string,
    data: ArrayElement<PropsDatabase[K]>
  ) {
    const rowIndex = this.database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.database[table][rowIndex] = { ...data }
      this.persist()
    }

  }
}
