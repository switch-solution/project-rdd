import { prisma } from "@/lib/prisma"
export class Loader {
    dsnId: string
    constructor(dsnId: string) {
        this.dsnId = dsnId
    }
    getPerson = async (numSS: string) => {
        try {
            const person = await prisma.person.findFirstOrThrow({
                where: {
                    numSS,
                    dsnId: this.dsnId
                }
            })
            const bank = await prisma.person_Bank.findFirst({
                where: {
                    numSS
                }
            })
            const transco = await prisma.transco_Person.findFirst({
                where: {
                    numSS
                }
            })

            return {
                ...person,
                ...bank,
                ...transco
            }
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération de la personne')
        }

    }
    getWorkContract = async (numSS: string, contractId: string) => {
        try {
            const workContract = await prisma.workContract.findFirst({
                where: {
                    numSS,
                    dsnId: this.dsnId,
                    contractId
                }
            })
            const transco = await prisma.transco_WorkContract.findFirst({
                where: {
                    numSS
                }
            })
            const transcoSociety = await prisma.transco_Society.findMany({
                where: {
                    siren: workContract?.siren

                }
            })
            return {
                ...workContract,
                ...transco,
                ...transcoSociety
            }
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération du contrat de travail')
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

    getStandardFields = async () => {
        try {
            const standardFields = await prisma.standard_Field.findMany()
            return standardFields
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération des champs standards')

        }
    }
}