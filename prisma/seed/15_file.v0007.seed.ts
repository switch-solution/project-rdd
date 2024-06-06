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

class FileV0007 extends Seed {
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
                        label: 'Enfant',
                        slug: 'hru-enfant',
                        description: 'Fichier de reprise des enfants',
                        fileFormat: 'csv',
                        separator: ';',
                        iteratorLabel: 'Enfant',
                        Column: {
                            create: [
                                {
                                    label: 'MATRI',
                                    slug: 'hru-enfant-matri',
                                    typeValue: 'Champ standard',
                                    standardFieldLabel: 'Individu transcodification matricule',
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
                                                slug: 'hru-enfant-matri-1',
                                            },
                                            {
                                                order: 2,
                                                value: 'MATRICULE',
                                                slug: 'hru-enfant-matri-2',
                                            },
                                            {
                                                order: 3,
                                                value: 'Obligatoire',
                                                slug: 'hru-enfant-matri-3',
                                            },

                                        ]
                                    }
                                },
                                {
                                    label: 'DNENF',
                                    slug: 'hru-enfant-dnenf',
                                    typeValue: 'Champ standard',
                                    standardFieldLabel: 'Enfant date de naissance',
                                    description: "DAT.NAIS.ENFANT",
                                    type: "date",
                                    format: 'AAAAMMJJ',
                                    order: 2,
                                    isRequired: true,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'N(8,0)',
                                                slug: 'hru-enfant-dnenf-1',
                                            },
                                            {
                                                order: 2,
                                                value: 'DAT.NAIS.ENFANT',
                                                slug: 'hru-enfant-dnenf-2',
                                            },
                                            {
                                                order: 3,
                                                value: 'Obligatoire',
                                                slug: 'hru-enfant-dnenf-3',
                                            },

                                        ]
                                    }
                                },
                                {
                                    label: 'NMENF',
                                    slug: 'hru-enfant-nmenf',
                                    typeValue: 'Champ standard',
                                    standardFieldLabel: 'Enfant nom',
                                    description: "NOM.ENFANT",
                                    type: "string",
                                    order: 3,
                                    minLength: 1,
                                    maxLength: 100,
                                    isRequired: true,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(100)',
                                                slug: 'hru-enfant-nmenf-1',
                                            },
                                            {
                                                order: 2,
                                                value: 'NOM.ENFANT',
                                                slug: 'hru-enfant-nmenf-2',
                                            },
                                            {
                                                order: 3,
                                                value: 'Obligatoire',
                                                slug: 'hru-enfant-nmenf-3',
                                            },

                                        ]
                                    }
                                },
                                {
                                    label: 'PRENF',
                                    slug: 'hru-enfant-prenf',
                                    typeValue: 'Champ standard',
                                    standardFieldLabel: 'Enfant prénom',
                                    description: "PRENOM.ENFANT",
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
                                                slug: 'hru-enfant-prenf-1',
                                            },
                                            {
                                                order: 2,
                                                value: 'PRENOM.ENFANT',
                                                slug: 'hru-enfant-prenf-2',
                                            },
                                            {
                                                order: 3,
                                                value: 'Obligatoire',
                                                slug: 'hru-enfant-prenf-3',
                                            },

                                        ]
                                    }
                                },
                                {
                                    label: 'SXENF',
                                    slug: 'hru-enfant-sxenf',
                                    typeValue: 'Champ standard',
                                    standardFieldLabel: 'Enfant sexe',
                                    description: "SEXE.ENFANT",
                                    type: "string",
                                    order: 5,
                                    minLength: 2,
                                    maxLength: 2,
                                    isRequired: true,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(2)',
                                                slug: 'hru-enfant-sxenf-1',
                                            },
                                            {
                                                order: 2,
                                                value: 'SEXE.ENFANT',
                                                slug: 'hru-enfant-sxenf-2',
                                            },
                                            {
                                                order: 3,
                                                value: 'Obligatoire',
                                                slug: 'hru-enfant-sxenf-3',
                                            },

                                        ]
                                    }
                                },

                            ]
                        }
                    }
                })


                await this.seedUpdateStatus("completed")
            }

        } catch (err) {
            console.error(err)
            await this.seedUpdateStatus("error")
        }


    }


}

export const filev0007 = new FileV0007("File_V0007", "Fichier HRU enfants", 15, "Iterator_V0004")

