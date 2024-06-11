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

class FileV0008 extends Seed {
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
                        label: 'Etablissement',
                        slug: 'hru-etablissement',
                        description: 'Fichier de reprise des étabissements',
                        fileFormat: 'csv',
                        separator: ';',
                        iteratorLabel: 'Etablissement',
                        Column: {
                            create: [
                                {
                                    label: 'Etablissement',
                                    slug: 'hru-etablissement-establissement',
                                    typeValue: 'Champ standard',
                                    standardFieldLabel: 'Etablissement transcodification code',
                                    description: "Etablissement",
                                    type: "string",
                                    order: 1,
                                    minLength: 1,
                                    maxLength: 8,
                                    isRequired: true,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'N(8,0)',
                                                slug: 'hru-etablissement-etablissement-1',
                                            },
                                        ]
                                    }
                                },
                                {
                                    label: 'Raison Sociale',
                                    slug: 'hru-etablissement-raison-sociale',
                                    description: "Etablissement",
                                    type: "string",
                                    order: 2,
                                    minLength: 1,
                                    maxLength: 100,
                                    isRequired: true,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'N(8,0)',
                                                slug: 'hru-etablissement-raison-sociale-1',
                                            },
                                        ]
                                    }
                                },
                                {
                                    label: 'Nic',
                                    slug: 'hru-etablissement-nic',
                                    description: "Etablissement",
                                    type: "string",
                                    typeValue: 'Champ standard',
                                    standardFieldLabel: 'Etablissement nic',
                                    order: 3,
                                    minLength: 1,
                                    maxLength: 5,
                                    isRequired: true,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'N(5,0)',
                                                slug: 'hru-etablissement-nic-1',
                                            },
                                        ]
                                    }
                                },
                                {
                                    label: 'Date ouverture',
                                    slug: 'hru-etablissement-date-ouverture',
                                    description: "Etablissement",
                                    type: "string",
                                    order: 4,
                                    minLength: 1,
                                    maxLength: 10,
                                    isRequired: true,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(10)',
                                                slug: 'hru-etablissement-date-ouverture-1',
                                            },
                                        ]
                                    }
                                },
                                {
                                    label: 'Date fermeture',
                                    slug: 'hru-etablissement-date-fermeture',
                                    description: "Etablissement",
                                    type: "string",
                                    order: 5,
                                    minLength: 1,
                                    maxLength: 10,
                                    isRequired: true,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(10)',
                                                slug: 'hru-etablissement-date-fermeture-1',
                                            },
                                        ]
                                    }
                                },
                                {
                                    label: 'Voie',
                                    slug: 'hru-etablissement-voie',
                                    description: "Etablissement",
                                    type: "string",
                                    order: 6,
                                    minLength: 1,
                                    maxLength: 10,
                                    isRequired: true,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(50)',
                                                slug: 'hru-etablissement-voie-1',
                                            },
                                        ]
                                    }
                                },
                                {
                                    label: 'Cpl. Loc Construction',
                                    slug: 'hru-etablissement-cpl-loc-construction',
                                    description: "Etablissement",
                                    type: "string",
                                    order: 7,
                                    minLength: 1,
                                    maxLength: 50,
                                    isRequired: true,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(50)',
                                                slug: 'hru-etablissement-cpl-loc-construction-1',
                                            },
                                        ]
                                    }
                                },
                                {
                                    label: 'Cpl. Loc Voie',
                                    slug: 'hru-etablissement-cpl-loc-voie',
                                    description: "Etablissement",
                                    type: "string",
                                    order: 8,
                                    minLength: 1,
                                    maxLength: 50,
                                    isRequired: true,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(50)',
                                                slug: 'hru-etablissement-cpl-loc-voie-1',
                                            },
                                        ]
                                    }
                                },
                                {
                                    label: 'Code Insee Commune',
                                    slug: 'hru-etablissement-code-insee-commune',
                                    description: "Etablissement",
                                    type: "string",
                                    order: 9,
                                    minLength: 1,
                                    maxLength: 5,
                                    isRequired: true,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(5)',
                                                slug: 'hru-etablissement-code-insee-commune-1',
                                            },
                                        ]
                                    }
                                },
                                {
                                    label: 'Localité',
                                    slug: 'hru-etablissement-localite',
                                    description: "Etablissement",
                                    typeValue: 'Champ standard',
                                    standardFieldLabel: 'Etablissement ville',
                                    type: "string",
                                    order: 10,
                                    minLength: 1,
                                    maxLength: 50,
                                    isRequired: true,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(50)',
                                                slug: 'hru-etablissement-localite-1',
                                            },
                                        ]
                                    }
                                },
                                {
                                    label: 'Code postal',
                                    slug: 'hru-etablissement-code-postal',
                                    description: "Etablissement",
                                    typeValue: 'Champ standard',
                                    standardFieldLabel: 'Etablissement code postal',
                                    type: "string",
                                    order: 11,
                                    minLength: 1,
                                    maxLength: 5,
                                    isRequired: true,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(5)',
                                                slug: 'hru-etablissement-code-postal-1',
                                            },
                                        ]
                                    }
                                },
                                {
                                    label: 'Code Pays',
                                    slug: 'hru-etablissement-code-pays',
                                    description: "Etablissement",
                                    type: "string",
                                    order: 12,
                                    minLength: 1,
                                    maxLength: 2,
                                    isRequired: true,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(2)',
                                                slug: 'hru-etablissement-code-pays-1',
                                            },
                                        ]
                                    }
                                },
                                {
                                    label: 'Code distribution Etranger',
                                    slug: 'hru-etablissement-code-distribution-etranger',
                                    description: "Etablissement",
                                    type: "string",
                                    order: 13,
                                    minLength: 1,
                                    maxLength: 50,
                                    isRequired: true,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(50)',
                                                slug: 'hru-etablissement-code-distribution-1',
                                            },
                                        ]
                                    }
                                },
                                {
                                    label: 'Code APET',
                                    slug: 'hru-etablissement-code-apet',
                                    typeValue: 'Champ standard',
                                    standardFieldLabel: 'Etablissement ape',
                                    description: "Etablissement",
                                    type: "string",
                                    order: 14,
                                    minLength: 1,
                                    maxLength: 5,
                                    isRequired: true,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(5)',
                                                slug: 'hru-etablissement-code-apet-1',
                                            },
                                        ]
                                    }
                                },
                                {
                                    label: 'Régime Base',
                                    slug: 'hru-etablissement-regime-base',
                                    description: "Etablissement",
                                    type: "string",
                                    order: 15,
                                    minLength: 1,
                                    maxLength: 3,
                                    isRequired: true,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(3)',
                                                slug: 'hru-etablissement-regime-de-base-1',
                                            },
                                        ]
                                    }
                                },
                                {
                                    label: 'Régime Local Alsace',
                                    slug: 'hru-etablissement-local-alsace',
                                    description: "Etablissement",
                                    type: "string",
                                    order: 16,
                                    minLength: 1,
                                    maxLength: 1,
                                    isRequired: true,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(1)',
                                                slug: 'hru-etablissement-local-alsace-1',
                                            },
                                        ]
                                    }
                                },
                                {
                                    label: 'Taxe salaire (O/N)',
                                    slug: 'hru-etablissement-taxe-salaire',
                                    description: "Etablissement",
                                    type: "string",
                                    order: 17,
                                    minLength: 1,
                                    maxLength: 1,
                                    isRequired: true,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(1)',
                                                slug: 'hru-etablissement-taxe-salaire-1',
                                            },
                                        ]
                                    }
                                },
                                {
                                    label: 'Code URSSAF',
                                    slug: 'hru-etablissement-code-urssaf',
                                    description: "Etablissement",
                                    type: "string",
                                    order: 18,
                                    minLength: 1,
                                    maxLength: 20,
                                    isRequired: true,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(20)',
                                                slug: 'hru-etablissement-code-urssaf-1',
                                            },
                                        ]
                                    }
                                },
                                {
                                    label: 'Code MSA',
                                    slug: 'hru-etablissement-code-msa',
                                    description: "Etablissement",
                                    type: "string",
                                    order: 19,
                                    minLength: 1,
                                    maxLength: 20,
                                    isRequired: true,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(20)',
                                                slug: 'hru-etablissement-code-msa-1',
                                            },
                                        ]
                                    }
                                },
                                {
                                    label: 'Code retraite complémentaire',
                                    slug: 'hru-etablissement-code-retraite-complementaire',
                                    description: "Etablissement",
                                    type: "string",
                                    order: 20,
                                    minLength: 1,
                                    maxLength: 20,
                                    isRequired: true,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(20)',
                                                slug: 'hru-etablissement-code-retraite-complementaire-1',
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

export const filev0008 = new FileV0008("File_V0008", "Fichier HRU établissement", 16, "File_V0007")

