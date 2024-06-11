import { prisma } from '@/lib/prisma'

export class Column {
    slug: string
    constructor(slug: string) {
        this.slug = slug
    }

    getRow = async () => {
        try {
            const rows = await prisma.row.findMany({
                where: {
                    Column: {
                        slug: this.slug
                    }
                },

            })
            return rows
        } catch (err) {
            console.error(err)
            throw new Error("Impossible de récupérer les données de la colonne")
        }
    }

    getTranscoding = async () => {
        try {
            const transcoding = await prisma.column_Transco.findMany({
                where: {
                    Column: {
                        slug: this.slug
                    }
                }
            })
            return transcoding
        } catch (err) {
            console.error(err)
            throw new Error("Impossible de récupérer les données de transcodification")
        }
    }
}