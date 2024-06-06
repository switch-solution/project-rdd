import { prisma } from "@/lib/prisma"
import { create } from "domain"

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

    deleteChildren = async (projectId: string) => {
        try {
            await prisma.person_Children.deleteMany({
                where: {
                    projectId: projectId
                }
            })

        } catch (err: unknown) {
            console.error(err)
            throw new Error("Une erreur est survenue lors de la suppression des enfants")
        }

    }

    insertChildren = async ({
        projectId,
        children,
        userId
    }: {
        projectId: string,
        children: {
            'Numéro de sécurité sociale du salarié'?: string | null,
            "Nom de lenfant"?: string | null,
            "Prénom de lenfant"?: string | null,
            "Date anniversaire de lenfant"?: number | null,
            "Sexe de l'enfant"?: string | null,
            "Numéro d'ordre de l'enfant"?: number | null

        }[],
        userId: string
    }) => {
        try {
            const childrenList = []
            const excelDateToJSDate = (date: number) => {
                const utc_days = Math.floor(date - 25569);
                const utc_value = utc_days * 86400;
                const date_info = new Date(utc_value * 1000);

                return date_info;
            }
            for (const child of children) {
                childrenList.push({
                    projectId: projectId,
                    numSS: child['Numéro de sécurité sociale du salarié'] ? child['Numéro de sécurité sociale du salarié'] : '',
                    lastname: child["Nom de lenfant"] ? child["Nom de lenfant"] : '',
                    firstname: child["Prénom de lenfant"] ? child["Prénom de lenfant"] : '',
                    birthday: child["Date anniversaire de lenfant"] ? excelDateToJSDate(child["Date anniversaire de lenfant"]) : new Date(),
                    sex: child["Sexe de l'enfant"] ? child["Sexe de l'enfant"] : '',
                    order: child["Numéro d'ordre de l'enfant"] ? child["Numéro d'ordre de l'enfant"] : 1,
                    createdBy: userId,
                })
            }
            await prisma.person_Children.createMany({
                data: childrenList
            })
        } catch (err: unknown) {
            console.error(err)
            throw new Error("Une erreur est survenue lors de l'insertion des enfants")
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