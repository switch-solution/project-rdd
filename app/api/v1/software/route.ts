import { type NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
export async function GET(request: NextRequest) {
    const software = await prisma.software.findMany()
    return new Response(JSON.stringify(software), { status: 200 })

}