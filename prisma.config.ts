import { defineConfig } from '@prisma/cli'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables from the .env file in the current working directory
dotenv.config({ path: path.join(__dirname, '.env') })

console.log('DATABASE_URL from config:', process.env.DATABASE_URL)

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
})