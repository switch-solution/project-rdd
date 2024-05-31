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

class IteratorV0001 extends Seed {
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
                await prisma.iterator.create({
                    data: {
                        label: 'Société'
                    }
                })

                await prisma.standard_Field.createMany({
                    data: [
                        {
                            table: 'Society',
                            field: 'siren',
                            label: 'Société SIREN',
                            type: 'string',
                            minLength: 9,
                            maxLength: 9,
                        },
                        {
                            table: 'Society',
                            field: 'apen',
                            label: 'Société APEN',
                            type: 'string',
                            minLength: 5,
                            maxLength: 5,
                        },
                        {
                            table: 'Society',
                            field: 'zipCode',
                            label: 'Société Code postal',
                            type: 'string',
                            minLength: 5,
                            maxLength: 5,
                        },
                        {
                            table: 'Society',
                            field: 'city',
                            label: 'Société ville',
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },
                    ]
                })
                await prisma.iterator_Standard_Field.createMany({
                    data: [
                        {
                            iteratorLabel: 'Société',
                            fieldLabel: 'Société SIREN',
                        },
                        {
                            iteratorLabel: 'Société',
                            fieldLabel: 'Société APEN',
                        },
                        {
                            iteratorLabel: 'Société',
                            fieldLabel: 'Société Code postal',
                        },
                        {
                            iteratorLabel: 'Société',
                            fieldLabel: 'Société ville',
                        },
                    ]
                })
                await this.seedUpdateStatus("completed")


            }



        } catch (err) {
            console.error(err)
            await this.seedUpdateStatus("error")
        }


    }




}

export const iteratorV0001 = new IteratorV0001("Iterator_V0001", "Champ société", 2, "Software_V0001")

