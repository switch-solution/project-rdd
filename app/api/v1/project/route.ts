import { type NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
export async function GET(request: NextRequest) {
    const projects = await prisma.project.findMany()
    return new Response(JSON.stringify(projects), { status: 200 })

}