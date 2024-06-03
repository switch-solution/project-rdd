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
                                    description: "Matricule du salarié.",
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
                                    description: "LIEU.NAISSANCE",
                                    standardFieldLabel: 'Individu lieu de naissance',
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

