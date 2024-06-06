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

class IteratorV0003 extends Seed {
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
                    data:
                    {
                        label: 'Email'
                    },

                })

                await prisma.standard_Field.createMany({
                    data: [
                        {
                            typeValue: 'Champ standard',
                            table: 'Person',
                            field: 'emailPerso',
                            label: 'Individu email personnel',
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Person',
                            field: 'emailPro',
                            label: 'Individu email professionnel',
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },

                    ]
                })


                await prisma.iterator_Standard_Field.createMany({
                    data: [
                        {
                            iteratorLabel: 'Email',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Individu numéro de sécurité sociale'
                        },
                        {
                            iteratorLabel: 'Email',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Individu email personnel'
                        },
                        {
                            iteratorLabel: 'Email',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Individu email professionnel'
                        },
                        {
                            iteratorLabel: 'Individu',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Individu email personnel'
                        },
                        {
                            iteratorLabel: 'Individu',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Individu email professionnel'
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

export const iteratorV0003 = new IteratorV0003("Iterator_V0003", "Email", 12, "Temmplate_V0002")
