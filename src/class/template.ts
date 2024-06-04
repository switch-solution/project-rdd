import { prisma } from "@/lib/prisma"

export class Template {
    slug: string
    constructor(slug: string) {
        this.slug = slug
    }

    makeFile = async () => {
        try {
            const columns = await prisma.template.findUnique({
                where: {
                    slug: this.slug
                },
                include: {
                    Template_Column: true
                }
            })
            if (!columns?.Template_Column) {
                throw new Error("Aucune colonne n'a été trouvée pour ce template")
            }
            const template: { [key: string]: "" }[] = []

            for (const column of columns.Template_Column) {
                template.push({
                    [column.label]: ""
                })
            }

            return template

        } catch (err: unknown) {
            console.error(err)
            throw new Error("Une erreur est survenue lors de la création du fichier")
        }
    }

    getColumns = async () => {
        try {
            const columns = await prisma.template.findUniqueOrThrow({
                where: {
                    slug: this.slug
                },
                include: {
                    Template_Column: true
                }
            })
            return columns
        } catch (err: unknown) {
            console.error(err)
            throw new Error("Une erreur est survenue lors de la récupération des colonnes")
        }
    }

    deleteBank = async (projectId: string) => {
        try {
            await prisma.person_Bank.deleteMany({
                where: {
                    projectId: projectId
                }
            })
        } catch (err: unknown) {
            console.error(err)
            throw new Error("Une erreur est survenue lors de la suppression des RIB")
        }
    }

    insertBank = async ({
        projectId,
        ribs,
        userId

    }: {
        projectId: string,
        ribs: {
            'Numéro de sécurité sociale'?: string | undefined,
            'Siren'?: string | undefined,
            'IBAN 1'?: string | undefined,
            'BIC 1'?: string | undefined,
            'Banque 1'?: string | undefined,
            'BIC 2'?: string | undefined,
            'Banque 2'?: string | undefined,
            'Rib salaire'?: string | undefined,
            'Rib acompte'?: string | undefined

        }[]
        userId: string
    }) => {
        try {
            const ribList = []
            for (const rib of ribs) {
                ribList.push({
                    projectId: projectId,
                    numSS: rib['Numéro de sécurité sociale'] ? rib['Numéro de sécurité sociale'] : '',
                    siren: rib['Siren'] ? rib['Siren'] : '',
                    iban1: rib['IBAN 1'] ? rib['IBAN 1'] : '',
                    bic1: rib['BIC 1'] ? rib['BIC 1'] : '',
                    bank1: rib['Banque 1'] ? rib['Banque 1'] : '',
                    bic2: rib['BIC 2'] ? rib['BIC 2'] : '',
                    bank2: rib['Banque 2'] ? rib['Banque 2'] : '',
                    payrool: rib['Rib salaire'] ? true : false,
                    expense: false,
                    advance: rib['Rib acompte'] ? true : false,
                    createdBy: userId,

                })
            }

            await prisma.person_Bank.createMany({
                data: ribList
            })

        } catch (err: unknown) {
            console.error(err)
            throw new Error("Une erreur est survenue lors de l'insertion des RIB")
        }
    }


}