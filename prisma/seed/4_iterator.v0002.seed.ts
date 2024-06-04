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
                await prisma.iterator.createMany({
                    data: [
                        {
                            label: 'Etablissement'
                        },
                        {
                            label: 'Individu'
                        },
                        {
                            label: 'Contrat de travail'
                        },
                    ]
                })

                await prisma.standard_Field.createMany({
                    data: [
                        {
                            typeValue: 'Champ standard',
                            table: 'Person',
                            field: 'numSS',
                            label: 'Individu numéro de sécurité sociale',
                            type: 'string',
                            minLength: 13,
                            maxLength: 13,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Person',
                            field: 'lastname',
                            label: 'Individu nom',
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Person',
                            field: 'surname',
                            label: 'Individu nom d\'usage',
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Person',
                            field: 'firstname',
                            label: 'Individu prénom',
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Person',
                            field: 'sex',
                            label: 'Individu sexe',
                            type: 'string',
                            minLength: 1,
                            maxLength: 2,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Person',
                            field: 'birthday',
                            label: 'Individu date de naissance',
                            type: 'date',
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Person',
                            field: 'placeOfBith',
                            label: 'Individu lieu de naissance',
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Person',
                            field: 'address1',
                            label: 'Individu adresse 1',
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Person',
                            field: 'codeZip',
                            label: 'Individu code postal',
                            type: 'string',
                            minLength: 1,
                            maxLength: 5,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Person',
                            field: 'city',
                            label: 'Individu ville',
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Person',
                            field: 'country',
                            label: 'Individu adresse pays',
                            type: 'string',
                            minLength: 2,
                            maxLength: 2,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Person',
                            field: 'codeZipBith',
                            label: 'Individu département de naissance',
                            type: 'string',
                            minLength: 5,
                            maxLength: 5,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Person',
                            field: 'countryBirth',
                            label: 'Individu pays de naissance',
                            type: 'string',
                            minLength: 2,
                            maxLength: 2,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Person',
                            field: 'address2',
                            label: 'Individu adresse 2',
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Person',
                            field: 'address3',
                            label: 'Individu adresse 3',
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Person',
                            field: 'email',
                            label: 'Individu email',
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Person',
                            field: 'employeeId',
                            label: 'Individu matricule',
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },
                        {
                            typeValue: 'Méthode',
                            table: 'Person',
                            field: 'numSS',
                            label: 'Individu numéro de sécurité sociale sans clé',
                            type: 'string',
                            minLength: 13,
                            maxLength: 13,
                        },
                        {
                            typeValue: 'Méthode',
                            table: 'Person',
                            field: 'numSS',
                            label: 'Individu numéro de sécurité sociale clé',
                            type: 'string',
                            minLength: 2,
                            maxLength: 2,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Person_Bank',
                            field: 'iban1',
                            label: 'Individu IBAN 1',
                            type: 'string',
                            minLength: 1,
                            maxLength: 35,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Person_Bank',
                            field: 'bic1',
                            label: 'Individu bic 1',
                            type: 'string',
                            minLength: 1,
                            maxLength: 35,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Person_Bank',
                            field: 'iban2',
                            label: 'Individu IBAN 2',
                            type: 'string',
                            minLength: 1,
                            maxLength: 35,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Person_Bank',
                            field: 'bic2',
                            label: 'Individu bic 2',
                            type: 'string',
                            minLength: 1,
                            maxLength: 35,
                        },

                        {
                            typeValue: 'Champ standard',
                            table: 'Transco_Person',
                            field: 'newId',
                            label: 'Individu transcodification matricule',
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
                            typeValue: 'Champ standard',
                            fieldLabel: 'Individu numéro de sécurité sociale'
                        },
                        {
                            iteratorLabel: 'Individu',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Individu nom'
                        },
                        {
                            iteratorLabel: 'Individu',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Individu nom d\'usage'
                        },
                        {
                            iteratorLabel: 'Individu',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Individu prénom'
                        },
                        {
                            iteratorLabel: 'Individu',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Individu sexe'
                        },
                        {
                            iteratorLabel: 'Individu',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Individu date de naissance'
                        },
                        {
                            iteratorLabel: 'Individu',
                            typeValue: 'Champ standard',

                            fieldLabel: 'Individu lieu de naissance'
                        },
                        {
                            iteratorLabel: 'Individu',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Individu adresse 1'
                        },
                        {
                            iteratorLabel: 'Individu',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Individu code postal'
                        },
                        {
                            iteratorLabel: 'Individu',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Individu ville'
                        },
                        {
                            iteratorLabel: 'Individu',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Individu adresse pays'
                        },
                        {
                            iteratorLabel: 'Individu',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Individu département de naissance'
                        },
                        {
                            iteratorLabel: 'Individu',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Individu pays de naissance'
                        },
                        {
                            iteratorLabel: 'Individu',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Individu adresse 2'
                        },
                        {
                            iteratorLabel: 'Individu',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Individu adresse 3'
                        },
                        {
                            iteratorLabel: 'Individu',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Individu email'
                        },
                        {
                            iteratorLabel: 'Individu',
                            typeValue: 'Méthode',
                            fieldLabel: 'Individu numéro de sécurité sociale sans clé'
                        },
                        {
                            iteratorLabel: 'Individu',
                            typeValue: 'Méthode',
                            fieldLabel: 'Individu numéro de sécurité sociale clé'
                        },
                        {
                            iteratorLabel: 'Individu',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Individu IBAN 1'
                        },
                        {
                            iteratorLabel: 'Individu',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Individu bic 1'
                        },
                        {
                            iteratorLabel: 'Individu',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Individu IBAN 2'
                        },
                        {
                            iteratorLabel: 'Individu',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Individu bic 2'
                        },
                        {
                            iteratorLabel: 'Individu',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Individu transcodification matricule'
                        },

                    ]
                })

                await prisma.standard_Field.createMany({
                    data: [
                        {
                            typeValue: 'Champ standard',
                            table: 'WorkContract',
                            field: 'numSS',
                            label: 'Contrat de travail numéro de sécurité sociale',
                            type: 'string',
                            minLength: 13,
                            maxLength: 13,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'WorkContract',
                            field: 'contractId',
                            label: 'Contrat de travail numéro de contrat DSN',
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'WorkContract',
                            field: 'siren',
                            label: 'Contrat de travail numéro de siren',
                            type: 'string',
                            minLength: 9,
                            maxLength: 9,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'WorkContract',
                            field: 'nic',
                            label: 'Contrat de travail numéro nic',
                            type: 'string',
                            minLength: 9,
                            maxLength: 9,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'WorkContract',
                            field: 'startDate',
                            label: 'Contrat de travail date de début',
                            type: 'string',
                            minLength: 8,
                            maxLength: 8,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'WorkContract',
                            field: 'status',
                            label: 'Contrat de travail statut',
                            type: 'string',
                            minLength: 9,
                            maxLength: 9,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'WorkContract',
                            field: 'pcs',
                            label: 'Contrat de travail code PCS',
                            type: 'string',
                            minLength: 5,
                            maxLength: 5,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'WorkContract',
                            field: 'pcsBis',
                            label: 'Contrat de travail code complément PCS',
                            type: 'string',
                            minLength: 5,
                            maxLength: 5,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'WorkContract',
                            field: 'mal',
                            label: 'Contrat de travail régime de sécurité sociale maladie',
                            type: 'string',
                            minLength: 3,
                            maxLength: 3,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'WorkContract',
                            field: 'employmentLabel',
                            label: 'Contrat de travail libellé emploi',
                            type: 'string',
                            minLength: 3,
                            maxLength: 3,
                        },
                    ]
                })

                await prisma.iterator_Standard_Field.createMany({
                    data: [
                        {
                            iteratorLabel: 'Contrat de travail',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Contrat de travail numéro de sécurité sociale'
                        },
                        {
                            iteratorLabel: 'Contrat de travail',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Contrat de travail numéro de contrat DSN'
                        },
                        {
                            iteratorLabel: 'Contrat de travail',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Contrat de travail numéro de siren'
                        },
                        {
                            iteratorLabel: 'Contrat de travail',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Contrat de travail numéro nic'
                        },
                        {
                            iteratorLabel: 'Contrat de travail',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Contrat de travail date de début'
                        },
                        {
                            iteratorLabel: 'Contrat de travail',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Contrat de travail statut'
                        },
                        {
                            iteratorLabel: 'Contrat de travail',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Contrat de travail code PCS'
                        },
                        {
                            iteratorLabel: 'Contrat de travail',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Contrat de travail code complément PCS'
                        },
                        {
                            iteratorLabel: 'Contrat de travail',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Contrat de travail régime de sécurité sociale maladie'
                        },
                        {
                            iteratorLabel: 'Contrat de travail',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Contrat de travail libellé emploi'
                        }


                    ]
                })

                await prisma.standard_Field.createMany({
                    data: [
                        {
                            typeValue: 'Champ standard',
                            table: 'Establishment',
                            field: 'siren',
                            label: 'Etablissement siren',
                            type: 'string',
                            minLength: 9,
                            maxLength: 9,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Establishment',
                            field: 'nic',
                            label: 'Etablissement nic',
                            type: 'string',
                            minLength: 5,
                            maxLength: 5,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Establishment',
                            field: 'ape',
                            label: 'Etablissement ape',
                            type: 'string',
                            minLength: 5,
                            maxLength: 5,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Establishment',
                            field: 'postalCode',
                            label: 'Etablissement code postal',
                            type: 'string',
                            minLength: 5,
                            maxLength: 5,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Establishment',
                            field: 'city',
                            label: 'Etablissement ville',
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Establishment',
                            field: 'legalStatus',
                            label: 'Etablissement statut juridique',
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },
                        {
                            typeValue: 'Champ standard',
                            table: 'Transco_Establishment',
                            field: 'newId',
                            label: 'Etablissement transcodification code',
                            type: 'string',
                            minLength: 1,
                            maxLength: 50,
                        },

                    ],
                })

                await prisma.iterator_Standard_Field.createMany({
                    data: [
                        {
                            iteratorLabel: 'Etablissement',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Etablissement siren'
                        },
                        {
                            iteratorLabel: 'Etablissement',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Etablissement nic'
                        },
                        {
                            iteratorLabel: 'Etablissement',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Etablissement ape'
                        },
                        {
                            iteratorLabel: 'Etablissement',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Etablissement code postal'
                        },
                        {
                            iteratorLabel: 'Etablissement',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Etablissement ville'
                        },
                        {
                            iteratorLabel: 'Etablissement',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Etablissement statut juridique'
                        },
                        {
                            iteratorLabel: 'Etablissement',
                            typeValue: 'Champ standard',
                            fieldLabel: 'Etablissement transcodification code'
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

export const iteratorV0002 = new IteratorV0002("Iterator_V0002", "HRU Individu, Gencontrat", 4, "File_V0001")
