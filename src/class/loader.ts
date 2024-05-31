import { prisma } from "@/lib/prisma"
export class Loader {
    dsnId: string
    constructor(dsnId: string) {
        this.dsnId = dsnId

    }
    getSociety = async (siren: string) => {
        try {

            return await prisma.society.findFirstOrThrow({
                where: {
                    siren,
                    dsnId: this.dsnId
                }
            })
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération de la société')
        }

    }
    getTranscoSociety = async (siren: string, projectId: string) => {
        try {
            const transcoSociety = await prisma.transco_Society.findFirstOrThrow({
                where: {
                    siren,
                    projectId
                }
            })
            return transcoSociety
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération de la société')
        }
    }
}