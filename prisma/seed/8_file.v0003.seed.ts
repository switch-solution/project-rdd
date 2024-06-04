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

class FileV0003 extends Seed {
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
                        label: 'Gencontrat',
                        slug: 'hru-gencontrat',
                        description: 'Fichier de reprise des contrats de travail',
                        fileFormat: 'csv',
                        separator: ';',
                        iteratorLabel: 'Contrat de travail',
                        Column: {
                            create: [
                                {
                                    label: 'MATRI',
                                    slug: 'hru-gencontrat-matri',
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
                                                slug: 'hru-gencontrat-matri-1',
                                            },
                                            {
                                                order: 2,
                                                value: 'MATRICULE',
                                                slug: 'hru-gencontrat-matri-2',
                                            },
                                            {
                                                order: 3,
                                                value: 'Obligatoire',
                                                slug: 'hru-gencontrat-matri-3',
                                            },

                                        ]
                                    }
                                },
                                {
                                    label: 'CEMP',
                                    slug: 'hru-gencontrat-cemp',
                                    description: "Code employeur.",
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
                                                slug: 'hru-gencontrat-cemp-1',
                                            },
                                            {
                                                order: 2,
                                                value: 'EMPLOYEUR',
                                                slug: 'hru-gencontrat-cemp-2',
                                            },
                                            {
                                                order: 3,
                                                value: 'Obligatoire',
                                                slug: 'hru-gencontrat-cemp-3',
                                            },

                                        ]
                                    }
                                },
                                {
                                    label: 'GCREF',
                                    slug: 'hru-gencontrat-gcref',
                                    description: "Référence interne du contrat de travail.",
                                    type: "string",
                                    order: 3,
                                    minLength: 0,
                                    maxLength: 16,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(16)',
                                                slug: 'hru-gencontrat-gcref-1',
                                            },
                                            {
                                                order: 2,
                                                value: 'REFERENCE.CTR',
                                                slug: 'hru-gencontrat-gcref-2',
                                            },
                                            {
                                                order: 3,
                                                value: 'Facultatif',
                                                slug: 'hru-gencontrat-gcref-3',
                                            },

                                        ]
                                    }
                                },
                                {
                                    label: 'CTNAT',
                                    slug: 'hru-gencontrat-ctnat',
                                    description: "Type de contrat de travail.",
                                    type: "string",
                                    order: 4,
                                    minLength: 2,
                                    maxLength: 2,
                                    isRequired: true,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(16)',
                                                slug: 'hru-gencontrat-ctnat-1',
                                            },
                                            {
                                                order: 2,
                                                value: 'REFERENCE.CTR',
                                                slug: 'hru-gencontrat-ctnat-2',
                                            },
                                            {
                                                order: 3,
                                                value: 'Obligatoire',
                                                slug: 'hru-gencontrat-ctnat-3',
                                            },

                                        ]
                                    }
                                },
                                {
                                    label: 'DISPP',
                                    slug: 'hru-gencontrat-dispp',
                                    description: "Dispositif politique public.",
                                    type: "string",
                                    order: 5,
                                    minLength: 2,
                                    maxLength: 2,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(2)',
                                                slug: 'hru-gencontrat-dispp-1',
                                            },
                                            {
                                                order: 2,
                                                value: 'DISPOSITIF.POL',
                                                slug: 'hru-gencontrat-dispp-2',
                                            },
                                            {
                                                order: 3,
                                                value: 'Facultatif',
                                                slug: 'hru-gencontrat-dispp-3',
                                            },

                                        ]
                                    }
                                },
                                {
                                    label: 'MRCDD',
                                    slug: 'hru-gencontrat-mrcdd',
                                    description: "Motif de CDD",
                                    type: "string",
                                    order: 6,
                                    minLength: 2,
                                    maxLength: 2,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(2)',
                                                slug: 'hru-gencontrat-mrcdd-1',
                                            },
                                            {
                                                order: 2,
                                                value: 'DISPOSITIF.POL',
                                                slug: 'hru-gencontrat-mrcdd-2',
                                            },
                                            {
                                                order: 3,
                                                value: 'Facultatif',
                                                slug: 'hru-gencontrat-mrcdd-3',
                                            },

                                        ]
                                    }
                                },
                                {
                                    label: 'CTSIE',
                                    slug: 'hru-gencontrat-ctsie',
                                    typeValue: 'Valeur par défault',
                                    description: "EFF.CTR",
                                    type: "string",
                                    order: 7,
                                    minLength: 1,
                                    maxLength: 1,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'N(1,0)',
                                                slug: 'hru-gencontrat-ctsie-1',
                                            },
                                            {
                                                order: 2,
                                                value: 'EFF.CTR',
                                                slug: 'hru-gencontrat-ctsie-2',
                                            },
                                            {
                                                order: 3,
                                                value: 'Facultatif',
                                                slug: 'hru-gencontrat-ctsie-3',
                                            },

                                        ]
                                    }
                                },
                                {
                                    label: 'CTSIM',
                                    slug: 'hru-gencontrat-ctsim',
                                    typeValue: 'Valeur par défault',
                                    description: "Contrat simultané.",
                                    type: "string",
                                    order: 8,
                                    minLength: 1,
                                    maxLength: 1,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(1)',
                                                slug: 'hru-gencontrat-ctsim-1',
                                            },
                                            {
                                                order: 2,
                                                value: 'CTRS.SIMULTANES',
                                                slug: 'hru-gencontrat-ctsim-2',
                                            },
                                            {
                                                order: 3,
                                                value: 'Facultatif',
                                                slug: 'hru-gencontrat-ctsim-3',
                                            },

                                        ]
                                    }
                                },
                                {
                                    label: 'MATRR',
                                    slug: 'hru-gencontrat-matrr',
                                    typeValue: 'Valeur par défault',
                                    description: "Matricule Remplacé.",
                                    type: "string",
                                    order: 9,
                                    minLength: 1,
                                    maxLength: 11,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'A(11)',
                                                slug: 'hru-gencontrat-matrr-1',
                                            },
                                            {
                                                order: 2,
                                                value: 'Matricule Remplacé',
                                                slug: 'hru-gencontrat-matrr-2',
                                            },
                                            {
                                                order: 3,
                                                value: 'Facultatif',
                                                slug: 'hru-gencontrat-matrr-3',
                                            },

                                        ]
                                    }
                                },
                                {
                                    label: 'CDETS',
                                    slug: 'hru-gencontrat-cdets',
                                    typeValue: 'Valeur par défault',
                                    description: "Code établissement",
                                    type: "string",
                                    order: 10,
                                    minLength: 8,
                                    maxLength: 8,
                                    isRequired: true,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'N(8,0)',
                                                slug: 'hru-gencontrat-cdets-1',
                                            },
                                            {
                                                order: 2,
                                                value: 'CODE.ETS',
                                                slug: 'hru-gencontrat-cdets-2',
                                            },
                                            {
                                                order: 3,
                                                value: 'Obligatoire',
                                                slug: 'hru-gencontrat-cdets-3',
                                            },

                                        ]
                                    }
                                },
                                {
                                    label: 'TRETS',
                                    slug: 'hru-gencontrat-trets',
                                    typeValue: 'Valeur par défault',
                                    description: "Code établissement lieu de travail",
                                    type: "string",
                                    order: 11,
                                    minLength: 8,
                                    maxLength: 8,
                                    Row: {
                                        create: [
                                            {
                                                order: 1,
                                                value: 'N(8,0)',
                                                slug: 'hru-gencontrat-trets-1',
                                            },
                                            {
                                                order: 2,
                                                value: 'CODE.ETS',
                                                slug: 'hru-gencontrat-trets-2',
                                            },
                                            {
                                                order: 3,
                                                value: 'Facultatif',
                                                slug: 'hru-gencontrat-trets-3',
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

export const filev0003 = new FileV0003("File_V0003", "Template banque", 8, "Temmplate_V0001")

