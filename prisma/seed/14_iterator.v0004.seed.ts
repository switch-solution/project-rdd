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

class IteratorV0004 extends Seed {
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
                        label: 'Enfant'
                    },

                })

                await prisma.standard_Field.createMany({
                    data: [
                        {
                            typeValue: 'Champ standard',
                            table: 'Person_Children',
                            field: 'lastname',
                            label: 'Enfant nom',
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Person_Children',
                            field: 'firstname',
                            label: 'Enfant prénom',
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Person_Children',
                            field: 'birthday',
                            label: 'Enfant date de naissance',
                            type: 'date',
                            format: 'AAAA-MM-JJ',
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Person_Children',
                            field: 'sex',
                            label: 'Enfant sexe',
                            type: 'string',
                            minLength: 1,
                            maxLength: 1,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Person_Children',
                            field: 'order',
                            label: 'Enfant numéro d\'ordre',
                            type: 'number',
                        },

                    ]
                })


                await prisma.iterator_Standard_Field.createMany({
                    data: [
                        {
                            iteratorLabel: 'Enfant',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Individu transcodification matricule'
                        },
                        {
                            iteratorLabel: 'Enfant',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Enfant nom'
                        },
                        {
                            iteratorLabel: 'Enfant',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Enfant prénom'
                        },
                        {
                            iteratorLabel: 'Enfant',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Enfant date de naissance'
                        },
                        {
                            iteratorLabel: 'Enfant',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Enfant sexe'
                        },
                        {
                            iteratorLabel: 'Enfant',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Enfant numéro d\'ordre'
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

export const iteratorV0004 = new IteratorV0004("Iterator_V0004", "Enfants", 14, "File_V0006")
