import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient(
    {
        log: [
            {
                emit: 'stdout',
                level: 'query',
            },
            {
                emit: 'stdout',
                level: 'error',
            },
            {
                emit: 'stdout',
                level: 'info',
            },
            {
                emit: 'stdout',
                level: 'warn',
            },
        ],
    }
)
import { Seed } from "./seedModel"

class FileV0002 extends Seed {
    constructor(
        protected name: string,
        protected description: string,
        protected order: number,
        protected previousLabel: string
    ) {
        super(name, description, order, previousLabel)
    }

    async run() {
        const seedExist = await this.seedIsComplete()
        const previousStatus = await this.previousSeedIsComplete()
        try {
            if (previousStatus && !seedExist) {
                await this.seedUpdateStatus("pending")
                await prisma.file.create({
                    data: {
                        softwareLabel: 'Hr Ultimate',
                        label: 'Individu',
                        slug: 'hru-individu',
                        description: 'Fichier de reprise des individus',
                        fileFormat: 'csv',
                        separator: ';',
                        iteratorLabel: 'Individu',
                        Column: {
                            create: [
                                {
                                    label: 'MATRI',
                                    slug: 'hru-individu-matri',
                                    typeValue: 'Champ standard',
                                    standardFieldLabel: 'Individu transcodification matricule', description: "Matricule du salarié.",
                                    type: "string",
                                    order: 1,
                                    minLength: 1,
                                    maxLength: 11,
                                    isRequired: true,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(11)',
                                                slug: 'hru-individu-matri-1',
                                            },
                                            {
                                                order: 2,
                                                value: 'MATRICULE',
                                                slug: 'hru-individu-matri-2',
                                            },
                                            {
                                                order: 3,
                                                value: 'Obligatoire',
                                                slug: 'hru-individu-matri-3',
                                            },

                                        ]
                                    }
                                },
                                {
                                    label: 'DVIND',
                                    slug: 'hru-individu-dvind',
                                    typeValue: 'Champ standard',
                                    standardFieldLabel: 'Individu date de naissance',
                                    description: "Date de validité.",
                                    type: "date",
                                    order: 2,
                                    isRequired: true,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'N(8,0)',
                                                slug: 'hru-individu-dvind-1',
                                            },
                                            {
                                                order: 2,
                                                value: 'Date Validité',
                                                slug: 'hru-individu-dvind-2',
                                            },
                                            {
                                                order: 3,
                                                value: 'Obligatoire',
                                                slug: 'hru-individu-dvind-3',
                                            },

                                        ]
                                    }
                                },
                                {
                                    label: 'LTITS',
                                    slug: 'hru-individu-ltits',
                                    description: "TITRE.SALAR",
                                    type: "string",
                                    order: 3,
                                    isRequired: true,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(2)',
                                                slug: 'hru-individu-ltits-1',
                                            },
                                            {
                                                order: 2,
                                                value: 'TITRE.SALAR',
                                                slug: 'hru-individu-ltits-2',
                                            },
                                            {
                                                order: 3,
                                                value: 'Obligatoire',
                                                slug: 'hru-individu-ltits-3',
                                            },

                                        ]
                                    }
                                },
                                {
                                    label: 'NMFAM',
                                    slug: 'hru-individu-nmfam',
                                    typeValue: 'Champ standard',
                                    description: "NOM.FAMILLE",
                                    standardFieldLabel: 'Individu nom',
                                    type: "string",
                                    order: 4,
                                    minLength: 1,
                                    maxLength: 100,
                                    isRequired: true,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(100)',
                                                slug: 'hru-individu-nmfam-1',
                                            },
                                            {
                                                order: 2,
                                                value: 'NOM.FAMILLE',
                                                slug: 'hru-individu-nmfam-2',
                                            },
                                            {
                                                order: 3,
                                                value: 'Obligatoire',
                                                slug: 'hru-individu-nmfam-3',
                                            },

                                        ]
                                    }
                                },
                                {
                                    label: 'NMUSA',
                                    slug: 'hru-individu-nmusa',
                                    typeValue: 'Champ standard',
                                    description: "NOM.USAGE",
                                    standardFieldLabel: 'Individu nom d\'usage',
                                    type: "string",
                                    order: 5,
                                    minLength: 1,
                                    maxLength: 100,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(100)',
                                                slug: 'hru-individu-nmusa-1',
                                            },
                                            {
                                                order: 2,
                                                value: 'NOM.USAGE',
                                                slug: 'hru-individu-nmusa-2',
                                            },
                                            {
                                                order: 3,
                                                value: 'Facultatif',
                                                slug: 'hru-individu-nmusa-3',
                                            },

                                        ]
                                    }
                                },
                                {
                                    label: 'LPNOM',
                                    slug: 'hru-individu-lpnom',
                                    typeValue: 'Champ standard',
                                    description: "PRENOM.SALAR",
                                    standardFieldLabel: 'Individu prénom',
                                    type: "string",
                                    order: 6,
                                    isRequired: true,
                                    minLength: 1,
                                    maxLength: 100,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(100)',
                                                slug: 'hru-individu-lpnom-1',
                                            },
                                            {
                                                order: 2,
                                                value: 'PRENOM.SALAR',
                                                slug: 'hru-individu-lpnom-2',
                                            },
                                            {
                                                order: 3,
                                                value: 'Obligatoire',
                                                slug: 'hru-individu-lpnom-3',
                                            },

                                        ]
                                    }
                                },
                                {
                                    label: 'CPNOM',
                                    slug: 'hru-individu-cpnom',
                                    typeValue: 'Champ standard',
                                    description: "PRENOM.CPL.SAL",
                                    standardFieldLabel: 'Individu prénom',
                                    type: "string",
                                    order: 7,
                                    minLength: 1,
                                    maxLength: 100,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(100)',
                                                slug: 'hru-individu-cpnom-1',
                                            },
                                            {
                                                order: 2,
                                                slug: 'hru-individu-cpnom-2',
                                                value: 'PRENOM.CPL.SAL',
                                            },
                                            {
                                                order: 3,
                                                value: 'Facultatif',
                                                slug: 'hru-individu-cpnom-3',
                                            },

                                        ]
                                    }
                                },
                                {
                                    label: 'CISEX',
                                    slug: 'hru-individu-cisex',
                                    typeValue: 'Champ standard',
                                    description: "C.SEXE",
                                    standardFieldLabel: 'Individu sexe',
                                    type: "string",
                                    order: 8,
                                    minLength: 2,
                                    maxLength: 2,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(2)',
                                                slug: 'hru-individu-cisex-1',
                                            },
                                            {
                                                order: 2,
                                                slug: 'hru-individu-cisex-2',
                                                value: 'C.SEXE',
                                            },
                                            {
                                                order: 3,
                                                value: 'Obligatoire',
                                                slug: 'hru-individu-cisex-3',
                                            },

                                        ]
                                    }
                                },
                                {
                                    label: 'DNAIS',
                                    slug: 'hru-individu-dnais',
                                    typeValue: 'Champ standard',
                                    description: "Date de naissance",
                                    standardFieldLabel: 'Individu date de naissance',
                                    type: "date",
                                    order: 9,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'N(8,0)',
                                                slug: 'hru-individu-dnais-1',
                                            },
                                            {
                                                order: 2,
                                                slug: 'hru-individu-dnais-2',
                                                value: 'DATE.NAIS',
                                            },
                                            {
                                                order: 3,
                                                value: 'Obligatoire',
                                                slug: 'hru-individu-dnais-3',
                                            },

                                        ]
                                    }
                                },
                                {
                                    label: 'LNAIS',
                                    slug: 'hru-individu-lnais',
                                    typeValue: 'Champ standard',
                                    description: "Individu lieu de naissance",
                                    standardFieldLabel: 'Individu département de naissance',
                                    type: "string",
                                    minLength: 1,
                                    maxLength: 30,
                                    order: 10,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(30)',
                                                slug: 'hru-individu-lnais-1',
                                            },
                                            {
                                                order: 2,
                                                slug: 'hru-individu-lnais-2',
                                                value: 'LIEU.NAISSANCE',
                                            },
                                            {
                                                order: 3,
                                                value: 'Obligatoire',
                                                slug: 'hru-individu-lnais-3',
                                            },
                                        ]
                                    }
                                },
                                {
                                    label: 'PNAIS',
                                    slug: 'hru-individu-pnais',
                                    typeValue: 'Champ standard',
                                    description: "PAYS.NAISSANCE",
                                    standardFieldLabel: 'Individu pays de naissance',
                                    type: "string",
                                    minLength: 2,
                                    maxLength: 2,
                                    order: 11,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(2)',
                                                slug: 'hru-individu-pnais-1',
                                            },
                                            {
                                                order: 2,
                                                slug: 'hru-individu-pnais-2',
                                                value: 'PAYS.NAISSANCE',
                                            },
                                            {
                                                order: 3,
                                                value: 'Obligatoire',
                                                slug: 'hru-individu-pnais-3',
                                            },
                                        ]
                                    }
                                },
                                {
                                    label: 'LNATI',
                                    slug: 'hru-individu-lnati',
                                    description: "NATIONALITE",
                                    type: "string",
                                    minLength: 2,
                                    maxLength: 2,
                                    order: 12,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(2)',
                                                slug: 'hru-individu-lnati-1',
                                            },
                                            {
                                                order: 2,
                                                slug: 'hru-individu-lnati-2',
                                                value: 'NATIONALITE',
                                            },
                                            {
                                                order: 3,
                                                value: 'Obligatoire',
                                                slug: 'hru-individu-lnati-3',
                                            },
                                        ]
                                    }
                                },
                                {
                                    label: 'NSECU',
                                    typeValue: 'Méthode',
                                    standardFieldLabel: 'Individu numéro de sécurité sociale clé',
                                    slug: 'hru-individu-nsecu',
                                    description: "Numéro de sécurité sociale.",
                                    type: "string",
                                    minLength: 13,
                                    maxLength: 13,
                                    order: 13,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(13)',
                                                slug: 'hru-individu-nsecu-1',
                                            },
                                            {
                                                order: 2,
                                                slug: 'hru-individu-nsecu-2',
                                                value: 'NSECU',
                                            },
                                            {
                                                order: 3,
                                                value: 'Facultatif',
                                                slug: 'hru-individu-nsecu-3',
                                            },
                                        ]
                                    }
                                },
                                {
                                    label: 'CSECU',
                                    slug: 'hru-individu-csecu',
                                    description: "Clef de sécurité sociale.",
                                    typeValue: 'Méthode',
                                    standardFieldLabel: 'Individu numéro de sécurité sociale sans clé',
                                    type: "string",
                                    minLength: 2,
                                    maxLength: 2,
                                    order: 14,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(13)',
                                                slug: 'hru-individu-csecu-1',
                                            },
                                            {
                                                order: 2,
                                                slug: 'hru-individu-csecu-2',
                                                value: 'CLEF.CTL.SS',
                                            },
                                            {
                                                order: 3,
                                                value: 'Facultatif',
                                                slug: 'hru-individu-csecu-3',
                                            },
                                        ]
                                    }
                                },
                                {
                                    label: 'CBIC1',
                                    slug: 'hru-individu-cbic1',
                                    description: "Code BIC 1",
                                    typeValue: 'Champ standard',
                                    standardFieldLabel: 'Individu bic 1',
                                    type: "string",
                                    minLength: 11,
                                    maxLength: 11,
                                    order: 15,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(11)',
                                                slug: 'hru-individu-cbic-1',
                                            },
                                            {
                                                order: 2,
                                                slug: 'hru-individu-cbic-2',
                                                value: 'CODE.BIC.1',
                                            },
                                            {
                                                order: 3,
                                                value: 'Facultatif',
                                                slug: 'hru-individu-cbic-3',
                                            },
                                        ]
                                    }
                                },
                                {
                                    label: 'IBAN1',
                                    slug: 'hru-individu-iban1',
                                    description: "Code IBAN 1",
                                    typeValue: 'Champ standard',
                                    standardFieldLabel: 'Individu IBAN 1',
                                    type: "string",
                                    minLength: 34,
                                    maxLength: 34,
                                    order: 16,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(34)',
                                                slug: 'hru-individu-iban-1',
                                            },
                                            {
                                                order: 2,
                                                slug: 'hru-individu-iban-2',
                                                value: 'COMPTE.IBAN.1',
                                            },
                                            {
                                                order: 3,
                                                value: 'Facultatif',
                                                slug: 'hru-individu-iban-3',
                                            },
                                        ]
                                    }
                                },
                            ]
                        }
                    }
                }


                )

                await this.seedUpdateStatus("completed")
            }

        } catch (err) {
            console.error(err)
            await this.seedUpdateStatus("error")
        }


    }




}

export const fileV0002 = new FileV0002("File_V0002", "Fichier individu HRU", 5, "Iterator_V0002")

