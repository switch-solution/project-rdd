import { prisma } from "@/lib/prisma"
import { RedirectType } from "next/navigation"
export class Loader {
    dsnId: string
    constructor(dsnId: string) {
        this.dsnId = dsnId

    }
    getPerson = async (numSS: string) => {
        try {
            return await prisma.person.findFirstOrThrow({
                where: {
                    numSS,
                    dsnId: this.dsnId
                }
            })
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération de la personne')
        }

    }
    getTranscoPerson = async (numSS: string, projectId: string) => {
        try {
            const transcoPerson = await prisma.transco_Person.findFirstOrThrow({
                where: {
                    numSS,
                    projectId
                }
            })
            return transcoPerson
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération de la personne')
        }
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