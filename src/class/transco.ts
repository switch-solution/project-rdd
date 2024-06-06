import { prisma } from "@/lib/prisma"
import type { TypeTransco } from "@/src/helpers/typeTransco"
export class Transco {
    slug: string
    type: TypeTransco
    constructor(slug: string, type: TypeTransco) {
        this.slug = slug
        this.type = type

    }
    getTransco = async () => {
        try {
            switch (this.type) {
                case "society":
                    const society = await prisma.transco_Society.findUniqueOrThrow({
                        where: {
                            slug: this.slug
                        },
                        select: {
                            transcoSocietyNewId: true
                        }

                    })
                    return society.transcoSocietyNewId
                    break;
                case "establishment":
                    const establishment = await prisma.transco_Establishment.findUniqueOrThrow({
                        where: {
                            slug: this.slug,
                        },
                        select: {
                            transcoEstablishmentNewId: true
                        }
                    })
                    return establishment.transcoEstablishmentNewId
                    break;
                case "person":
                    const person = await prisma.transco_Person.findUniqueOrThrow({
                        where: {
                            slug: this.slug
                        },
                        select: {
                            transcoEmployeeNewId: true
                        }
                    })
                    return person.transcoEmployeeNewId
                    break;
                case "workcontract":
                    const workContract = await prisma.transco_WorkContract.findUniqueOrThrow({
                        where: {
                            slug: this.slug
                        },
                        select: {
                            transcoContractNewId: true
                        }
                    })
                    return workContract.transcoContractNewId
                    break;
                case "domainEmail":
                    const domainEmail = await prisma.transco_Domain_Email.findUniqueOrThrow({
                        where: {
                            slug: this.slug
                        },
                        select: {
                            type: true
                        }
                    })
                    return domainEmail.type
                    break;
                default: throw new Error('Type de transcodification inconnu')
            }
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération de la transcodification')
        }

    }

    newIdExist = async (newId: string, projectId: string) => {
        try {
            switch (this.type) {
                case "society":
                    const society = await prisma.transco_Society.findFirst({
                        where: {
                            transcoSocietyNewId: newId,
                            projectId
                        }
                    })
                    if (society) {
                        return true
                    } else {
                        return false
                    }
                    break;
                case "establishment":
                    const establishment = await prisma.transco_Establishment.findFirst({
                        where: {
                            transcoEstablishmentNewId: newId,
                            projectId
                        }
                    })
                    if (establishment) {
                        return true
                    } else {
                        return false
                    }
                    break;
                case "person":
                    const person = await prisma.transco_Person.findFirst({
                        where: {
                            transcoEmployeeNewId: newId,
                            projectId
                        }
                    })
                    if (person) {
                        return true
                    } else {
                        return false
                    }
                    break;
                case "workcontract":
                    const workContract = await prisma.transco_WorkContract.findFirst({
                        where: {
                            transcoContractNewId: newId,
                            projectId
                        }
                    })
                    if (workContract) {
                        return true
                    } else {
                        return false
                    }

                    break;
                case "domainEmail":
                    const domainEmail = await prisma.transco_Domain_Email.findFirst({
                        where: {
                            type: newId,
                            projectId
                        }
                    })
                    break

                default: throw new Error('Type de transcodification inconnu')
            }
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la suppression de la transcodification')
        }
    }

    editTransco = async (newId: string) => {
        try {
            switch (this.type) {
                case "society":
                    return await prisma.transco_Society.update({
                        where: {
                            slug: this.slug
                        },
                        data: {
                            transcoSocietyNewId: newId
                        }
                    })
                    break;
                case "establishment":
                    return await prisma.transco_Establishment.update({
                        where: {
                            slug: this.slug
                        },
                        data: {
                            transcoEstablishmentNewId: newId
                        }
                    })
                    break;
                case "person":
                    return await prisma.transco_Person.update({
                        where: {
                            slug: this.slug
                        },
                        data: {
                            transcoEmployeeNewId: newId
                        }
                    })
                    break;
                case "workcontract":
                    return await prisma.transco_WorkContract.update({
                        where: {
                            slug: this.slug
                        },
                        data: {
                            transcoContractNewId: newId
                        }
                    })
                    break;
                case "domainEmail":
                    const values = ['personnel', 'professionnel']
                    if (!values.includes(newId)) {
                        throw new Error(`Type d'email non valide ${newId}`)
                    }
                    return await prisma.transco_Domain_Email.update({
                        where: {
                            slug: this.slug
                        },
                        data: {
                            type: newId
                        }
                    })
                    break;
                default: throw new Error('Type de transcodification inconnu impossible de mttre à jour')
            }
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de l\'edition de la transcodification')
        }
    }


    deleteTransco = async () => {
        try {
            switch (this.type) {
                case "society":
                    return await prisma.transco_Society.delete({
                        where: {
                            slug: this.slug
                        }
                    })
                    break;
                case "establishment":
                    return await prisma.transco_Establishment.delete({
                        where: {
                            slug: this.slug
                        }
                    })
                    break;
                case "person":
                    return await prisma.transco_Person.delete({
                        where: {
                            slug: this.slug
                        }
                    })
                    break;
                case "workcontract":
                    return await prisma.transco_WorkContract.delete({
                        where: {
                            slug: this.slug
                        }
                    })
                    break;
                default: throw new Error('Type de transcodification inconnu')
            }
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la suppression de la transcodification')
        }
    }
}