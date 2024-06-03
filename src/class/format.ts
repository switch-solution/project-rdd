import { prisma } from "@/lib/prisma"

export class Format {

    getFormat = async () => {
        try {
            const format = await prisma.format.findMany()
            return format
        } catch (error) {
            console.error(error)
            throw new Error("Erreur lors de la récupération du format")
        }
    }
}