import { NextRequest } from 'next/server'
import { env } from "@/lib/env"
const node_env = env.NODE_ENV

export async function middleware(request: NextRequest) {
    //Application is only available in France 
    if (request.geo?.country !== "FR" && env.NODE_ENV === "production") {
        return new Response(`Blocked for legal reasons this service is not available in ${request.geo?.country}`, { status: 451 })
    }

}