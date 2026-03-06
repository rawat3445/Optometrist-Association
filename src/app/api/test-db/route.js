import  prisma  from '@/lib/prisma'

export async function GET() {
  try {
    // Test database connection
    const result = await prisma.$queryRaw`SELECT NOW() as timestamp, 1 as test_value`
    
    return Response.json({
      success: true,
      message: 'Database connection successful!',
      data: result[0],
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return Response.json({
      success: false,
      message: 'Database connection failed',
      error: error.message,
      fix: 'Check if DATABASE_URL is correct in .env'
    }, { status: 500 })
  }
}
