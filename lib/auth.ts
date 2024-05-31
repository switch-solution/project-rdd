import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import GitHub from "next-auth/providers/github"
import { Logger } from "@/src/class/logger"
export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [GitHub],
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
    theme: {
        colorScheme: "auto", // "auto" | "dark" | "light"
        brandColor: "", // Hex color code
        logo: "", // Absolute URL to image
        buttonText: "" // Hex color code
    }

})