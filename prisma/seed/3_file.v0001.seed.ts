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

class FileV0001 extends Seed {
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
                        label: 'Employeur',
                        slug: 'hru-employeur',
                        description: 'Fichier de reprise des employeurs',
                        fileFormat: 'csv',
                        separator: ';',
                        iteratorLabel: 'Société',
                        Column: {
                            create: [
                                {
                                    label: 'Employeur',
                                    slug: 'hru-employeur',
                                    description: "Code employeur.",
                                    type: "string",
                                    order: 1,
                                    minLength: 4,
                                    maxLength: 4,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'N(4,0)',
                                                slug: 'hru-employeur-1',
                                            }
                                        ]
                                    }
                                },
                                {
                                    label: 'Raison Sociale',
                                    slug: 'hru-employeur-raison-sociale',
                                    description: "Raison sociale employeur.",
                                    type: "string",
                                    order: 2,
                                    minLength: 1,
                                    maxLength: 100,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(100)',
                                                slug: 'hru-employeur-raison-sociale-1',
                                            }
                                        ]
                                    }
                                },
                                {
                                    label: 'Siren',
                                    slug: 'hru-employeur-siren',
                                    description: "Siren employeur.",
                                    type: "string",
                                    standardFieldLabel: 'Société SIREN',
                                    order: 3,
                                    minLength: 9,
                                    maxLength: 9,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'N(9,0)',
                                                slug: 'hru-employeur-siren-1',
                                            }
                                        ]
                                    }
                                },
                                {
                                    label: 'Date Ouverture (jj/mm/aaaa)',
                                    slug: 'hru-employeur-date-ouverture',
                                    description: "Date ouverture de la société.",
                                    type: "string",
                                    order: 4,
                                    minLength: 10,
                                    maxLength: 10,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(10)',
                                                slug: 'hru-employeur-date-ouverture-1',
                                            }
                                        ]
                                    }
                                },
                                {
                                    label: 'Date Fermeture (jj/mm/aaaa)',
                                    slug: 'hru-employeur-date-fermeture',
                                    description: "Date fermeture de la société.",
                                    type: "string",
                                    order: 5,
                                    minLength: 10,
                                    maxLength: 10,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(10)',
                                                slug: 'hru-employeur-date-fermeture-1',
                                            }
                                        ]
                                    }
                                },
                                {
                                    label: 'Voie',
                                    slug: 'hru-employeur-voie',
                                    description: "Adresse de la société.",
                                    type: "string",
                                    order: 6,
                                    minLength: 1,
                                    maxLength: 50,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(50)',
                                                slug: 'hru-employeur-voie-1',
                                            }
                                        ]
                                    }
                                },
                                {
                                    label: 'Code postal',
                                    slug: 'hru-employeur-code-postal',
                                    description: "Code postal de la société.",
                                    type: "string",
                                    standardFieldLabel: 'Société Code postal',
                                    order: 7,
                                    minLength: 5,
                                    maxLength: 5,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(5)',
                                                slug: 'hru-employeur-code-postal-1',
                                            }
                                        ]
                                    }

                                },
                                {
                                    label: 'Cpl. loc Construction',
                                    slug: 'hru-employeur-complement-construction',
                                    description: "Adresse complémentaire de la société.",
                                    type: "string",
                                    minLength: 1,
                                    order: 8,
                                    maxLength: 50,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(50)',
                                                slug: 'hru-employeur-complement-construction-1',
                                            }
                                        ]
                                    }
                                },
                                {
                                    label: 'Cpl. loc Voie',
                                    slug: 'hru-employeur-complement-voie',
                                    description: "Adresse complémentaire de la société.",
                                    type: "string",
                                    minLength: 1,
                                    maxLength: 50,
                                    order: 9,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(50)',
                                                slug: 'hru-employeur-complement-voie-1',
                                            }
                                        ]
                                    }
                                },
                                {
                                    label: 'Code Insee Commune',
                                    slug: 'hru-employeur-insee-commune-employeur',
                                    description: "Code insee de la communne de la société.",
                                    type: "string",
                                    minLength: 1,
                                    maxLength: 5,
                                    order: 10,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(5)',
                                                slug: 'hru-employeur-insee-commune-employeur-1',
                                            }
                                        ]
                                    }
                                },
                                {
                                    label: 'Code pays',
                                    slug: 'hru-employeur-code-pays-employeur',
                                    description: "Code pays employeur.",
                                    type: "string",
                                    defaultValue: 'FR',
                                    minLength: 1,
                                    maxLength: 2,
                                    order: 11,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(2)',
                                                slug: 'hru-employeur-code-pays-employeur-1',
                                            }
                                        ]
                                    }
                                },
                                {
                                    label: 'Code distribution Etranger',
                                    slug: 'hru-employeur-code-distribution-Etranger',
                                    description: "Code distribution Etranger",
                                    type: "string",
                                    minLength: 1,
                                    maxLength: 50,
                                    order: 12,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(50)',
                                                slug: 'hru-employeur-code-distribution-Etranger-1',
                                            }
                                        ]
                                    }
                                },
                                {
                                    label: 'Nic du siège',
                                    slug: 'hru-employeur-nic-siege',
                                    description: "Nic du siège",
                                    type: "string",
                                    minLength: 1,
                                    maxLength: 5,
                                    order: 13,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(5)',
                                                slug: 'hru-employeur-nic-siege-1',
                                            }
                                        ]
                                    }
                                },
                                {
                                    label: 'Code APEN',
                                    slug: 'hru-employeur-code-apen',
                                    description: "Code APEN",
                                    standardFieldLabel: 'Société APEN',
                                    type: "string",
                                    minLength: 5,
                                    maxLength: 5,
                                    order: 14,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(5)',
                                                slug: 'hru-employeur-code-apen-1',
                                            }
                                        ]
                                    }
                                },
                                {
                                    label: 'Subrogation',
                                    slug: 'hru-employeur-subrogation',
                                    description: "Subrogation",
                                    type: "string",
                                    minLength: 1,
                                    maxLength: 1,
                                    order: 15,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(1)',
                                                slug: 'hru-employeur-subrogation-1',
                                            }
                                        ]
                                    }
                                },
                                {
                                    label: 'Régularisations des cotisations',
                                    slug: 'hru-employeur-regul-cotisations',
                                    description: "Régularisations des cotisations",
                                    type: "string",
                                    order: 16,
                                    minLength: 1,
                                    maxLength: 1,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(1)',
                                                slug: 'hru-employeur-regul-cotisations-1',
                                            }
                                        ]
                                    }
                                },
                                {
                                    label: 'BIC1',
                                    slug: 'hru-employeur-bic1',
                                    description: "BIC1",
                                    type: "string",
                                    order: 17,
                                    minLength: 1,
                                    maxLength: 11,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(11)',
                                                slug: 'hru-employeur-bic1-1',
                                            }
                                        ]
                                    }
                                },
                                {
                                    label: 'IBAN1',
                                    slug: 'hru-employeur-iban1',
                                    description: "IBAN1",
                                    type: "string",
                                    order: 18,
                                    minLength: 1,
                                    maxLength: 34,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(34)',
                                                slug: 'hru-employeur-iban1-1',
                                            }
                                        ]
                                    }
                                },
                                {
                                    label: 'DOM1',
                                    slug: 'hru-employeur-dom1',
                                    description: "DOM1",
                                    type: "string",
                                    order: 19,
                                    minLength: 1,
                                    maxLength: 50,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(50)',
                                                slug: 'hru-employeur-dom1-1',
                                            }
                                        ]
                                    }
                                },
                                {
                                    label: 'SEPA1',
                                    slug: 'hru-employeur-sepa1',
                                    description: "SEPA1",
                                    type: "string",
                                    order: 20,
                                    minLength: 1,
                                    maxLength: 35,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(35)',
                                                slug: 'hru-employeur-sepa1-1',
                                            }
                                        ]
                                    }
                                },
                                {
                                    label: 'Type paiement(0=Non utilisé, 1=Acomptes, 2=P exceptionnels, 3=A et P exceptionnels)',
                                    slug: 'hru-employeur-type-paiement',
                                    description: "Type paiement(0=Non utilisé, 1=Acomptes, 2=P exceptionnels, 3=A et P exceptionnels)",
                                    type: "string",
                                    order: 21,
                                    minLength: 1,
                                    maxLength: 1,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(1)',
                                                slug: 'hru-employeur-type-paiement-1',
                                            }
                                        ]
                                    }
                                },
                            ],
                        },

                    },

                },
                )

                await this.seedUpdateStatus("completed")
            }

        } catch (err) {
            console.error(err)
            await this.seedUpdateStatus("error")
        }


    }




}

export const fileV0001 = new FileV0001("File_V0001", "Fichier employeur HRU", 3, "Iterator_V0001")

