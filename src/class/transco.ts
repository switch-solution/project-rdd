import { prisma } from "@/lib/prisma"
export class Transco {
    slug: string
    type: 'society' | 'establishment' | 'person' | 'workcontract'
    constructor(slug: string, type: 'society' | 'establishment' | 'person' | 'workcontract') {
        this.slug = slug
        this.type = type

    }
    getTransco = async () => {
        try {
            switch (this.type) {
                case "society":
                    return await prisma.transco_Society.findUniqueOrThrow({
                        where: {
                            slug: this.slug
                        }
                    })
                    break;
                case "establishment":
                    return await prisma.transco_Establishment.findUniqueOrThrow({
                        where: {
                            slug: this.slug
                        }
                    })
                    break;
                case "person":
                    return await prisma.transco_Person.findUniqueOrThrow({
                        where: {
                            slug: this.slug
                        }
                    })
                    break;
                case "workcontract":
                    return await prisma.transco_WorkContract.findUniqueOrThrow({
                        where: {
                            slug: this.slug
                        }
                    })
                    break;
                default: throw new Error('Type de transcodification inconnu')
            }
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération de la transcodification')
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
                            newId: newId
                        }
                    })
                    break;
                case "establishment":
                    return await prisma.transco_Establishment.update({
                        where: {
                            slug: this.slug
                        },
                        data: {
                            newId: newId
                        }
                    })
                    break;
                case "person":
                    return await prisma.transco_Person.update({
                        where: {
                            slug: this.slug
                        },
                        data: {
                            newId: newId
                        }
                    })
                    break;
                case "workcontract":
                    return await prisma.transco_WorkContract.update({
                        where: {
                            slug: this.slug
                        },
                        data: {
                            newId: newId
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