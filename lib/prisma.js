import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query'] : ['error'],
})

export const prisma = prismaClient
export default prismaClient
