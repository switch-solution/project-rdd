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

class IteratorV0002 extends Seed {
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
                        label: 'Individu'
                    }
                })

                await prisma.standard_Field.createMany({
                    data: [
                        {
                            table: 'Person',
                            field: 'numSS',
                            label: 'Individu numéro de sécurité sociale',
                            type: 'string',
                            minLength: 13,
                            maxLength: 13,
                        },
                        {
                            table: 'Person',
                            field: 'lastname',
                            label: 'Individu nom',
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },
                        {
                            table: 'Person',
                            field: 'surname',
                            label: 'Individu nom d\'usage',
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },
                        {
                            table: 'Person',
                            field: 'firstname',
                            label: 'Individu prénom',
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },
                        {
                            table: 'Person',
                            field: 'sex',
                            label: 'Individu sexe',
                            type: 'string',
                            minLength: 1,
                            maxLength: 2,
                        },
                        {
                            table: 'Person',
                            field: 'birthday',
                            label: 'Individu date de naissance',
                            type: 'date',
                        },
                        {
                            table: 'Person',
                            field: 'placeOfBith',
                            label: 'Individu lieu de naissance',
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },
                        {
                            table: 'Person',
                            field: 'address1',
                            label: 'Individu adresse 1',
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },
                        {
                            table: 'Person',
                            field: 'codeZip',
                            label: 'Individu code postal',
                            type: 'string',
                            minLength: 1,
                            maxLength: 5,
                        },
                        {
                            table: 'Person',
                            field: 'city',
                            label: 'Individu ville',
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },
                        {
                            table: 'Person',
                            field: 'country',
                            label: 'Individu adresse pays',
                            type: 'string',
                            minLength: 2,
                            maxLength: 2,
                        },
                        {
                            table: 'Person',
                            field: 'codeZipBith',
                            label: 'Individu département de naissance',
                            type: 'string',
                            minLength: 5,
                            maxLength: 5,
                        },
                        {
                            table: 'Person',
                            field: 'countryBirth',
                            label: 'Individu pays de naissance',
                            type: 'string',
                            minLength: 2,
                            maxLength: 2,
                        },
                        {
                            table: 'Person',
                            field: 'address2',
                            label: 'Individu adresse 2',
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },
                        {
                            table: 'Person',
                            field: 'address3',
                            label: 'Individu adresse 3',
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },
                        {
                            table: 'Person',
                            field: 'email',
                            label: 'Individu email',
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },
                        {
                            table: 'Person',
                            field: 'employeeId',
                            label: 'Individu matricule',
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },



                    ]
                })
                await prisma.iterator_Standard_Field.createMany({
                    data: [
                        {
                            iteratorLabel: 'Individu',
                            fieldLabel: 'Individu numéro de sécurité sociale'
                        },
                        {
                            iteratorLabel: 'Individu',
                            fieldLabel: 'Individu nom'
                        },
                        {
                            iteratorLabel: 'Individu',
                            fieldLabel: 'Individu nom d\'usage'
                        },
                        {
                            iteratorLabel: 'Individu',
                            fieldLabel: 'Individu prénom'
                        },
                        {
                            iteratorLabel: 'Individu',
                            fieldLabel: 'Individu sexe'
                        },
                        {
                            iteratorLabel: 'Individu',
                            fieldLabel: 'Individu date de naissance'
                        },
                        {
                            iteratorLabel: 'Individu',
                            fieldLabel: 'Individu lieu de naissance'
                        },
                        {
                            iteratorLabel: 'Individu',
                            fieldLabel: 'Individu adresse 1'
                        },
                        {
                            iteratorLabel: 'Individu',
                            fieldLabel: 'Individu code postal'
                        },
                        {
                            iteratorLabel: 'Individu',
                            fieldLabel: 'Individu ville'
                        },
                        {
                            iteratorLabel: 'Individu',
                            fieldLabel: 'Individu adresse pays'
                        },
                        {
                            iteratorLabel: 'Individu',
                            fieldLabel: 'Individu département de naissance'
                        },
                        {
                            iteratorLabel: 'Individu',
                            fieldLabel: 'Individu pays de naissance'
                        },
                        {
                            iteratorLabel: 'Individu',
                            fieldLabel: 'Individu adresse 2'
                        },
                        {
                            iteratorLabel: 'Individu',
                            fieldLabel: 'Individu adresse 3'
                        },
                        {
                            iteratorLabel: 'Individu',
                            fieldLabel: 'Individu email'
                        },
                        {
                            iteratorLabel: 'Individu',
                            fieldLabel: 'Individu matricule'
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

export const iteratorV0002 = new IteratorV0002("Iterator_V0002", "Champ person", 4, "File_V0001")

