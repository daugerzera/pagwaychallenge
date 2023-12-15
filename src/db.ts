import { Pool } from 'pg'

const connectionString = process.env.DB_CONN ?? ''

const db = new Pool({
  connectionString
})

export default db
