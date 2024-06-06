import { NextRequest } from 'next/server'
import { env } from "@/lib/env"
const node_env = env.NODE_ENV
const API_ROOT = env.API_ROOT
const DOMAIN = env.DOMAIN

export async function middleware(request: NextRequest) {
    //Application is only available in France 
    if (request.geo?.country !== "FR" && node_env === "production") {
        return new Response(`Blocked for legal reasons this service is not available in ${request.geo?.country}`, { status: 451 })
    }
    if (request.url.startsWith(`${DOMAIN}/api/v1/`)) {
        const authorization = request.headers.get('Authorization')
        if (!authorization) {
            return new Response('Unauthorized', { status: 401 })
        }
        const token = authorization.split(' ')[1]
        if (token !== API_ROOT) {
            return new Response('Your API KEY is not valid', { status: 401 })
        }

    }

}