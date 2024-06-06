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

class FileV0006 extends Seed {
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
                        label: 'Email',
                        slug: 'hru-email',
                        description: 'Fichier de reprise des emails',
                        fileFormat: 'csv',
                        separator: ';',
                        iteratorLabel: 'Email',
                        Column: {
                            create: [
                                {
                                    label: 'MATRI',
                                    slug: 'hru-email-matri',
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
                                                slug: 'hru-email-matri-1',
                                            },
                                            {
                                                order: 2,
                                                value: 'MATRICULE',
                                                slug: 'hru-email-matri-2',
                                            },
                                            {
                                                order: 3,
                                                value: 'Obligatoire',
                                                slug: 'hru-email-matri-3',
                                            },

                                        ]
                                    }
                                },
                                {
                                    label: 'CEMP',
                                    slug: 'hru-email-cemp',
                                    typeValue: 'Champ standard',
                                    standardFieldLabel: 'Société transcodification code',
                                    description: "EMPLOYEUR.",
                                    type: "string",
                                    order: 2,
                                    minLength: 4,
                                    maxLength: 4,
                                    isRequired: true,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'N(4,0)',
                                                slug: 'hru-email-cemp-1',
                                            },
                                            {
                                                order: 2,
                                                value: 'EMPLOYEUR',
                                                slug: 'hru-email-cemp-2',
                                            },
                                            {
                                                order: 3,
                                                value: 'Obligatoire',
                                                slug: 'hru-email-cemp-3',
                                            },

                                        ]
                                    }
                                },
                                {
                                    label: 'EMAIL',
                                    slug: 'hru-email-email',
                                    typeValue: 'Champ standard',
                                    standardFieldLabel: 'Individu email professionnel',
                                    description: "EMAIL.",
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
                                                slug: 'hru-email-email-1',
                                            },
                                            {
                                                order: 2,
                                                value: 'EMAIL',
                                                slug: 'hru-email-email-2',
                                            },
                                            {
                                                order: 3,
                                                value: 'Obligatoire',
                                                slug: 'hru-email-email-3',
                                            },

                                        ]
                                    }
                                }
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

export const filev0006 = new FileV0006("File_V0006", "Fichier HRU Email", 13, "Iterator_V0003")

