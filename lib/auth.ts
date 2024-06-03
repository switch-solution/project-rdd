import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import GitHub from "next-auth/providers/github"
import Nodemailer from "next-auth/providers/nodemailer"
import { Logger } from "@/src/class/logger"
import { env } from "./env"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHub,
        Nodemailer({
            server: env.EMAIL_SERVER,
            from: env.EMAIL_FROM,
        }),
    ],
    debug: env.NODE_ENV === "development" ? true : false,
    callbacks: {
        //https://next-auth.js.org/configuration/callbacks
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }

    },
    events: {
        async signIn(message) {
            const logger = new Logger()
            await logger.writeLog({
                level: "info",
                message: `L'utilisateur ${message.user.email} s'est connecté`,
                userId: message.user.id ? message.user.id : ''
            })
        },
    },


})