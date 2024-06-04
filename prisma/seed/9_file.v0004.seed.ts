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

class FileV0004 extends Seed {
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
                        softwareLabel: 'People net',
                        label: 'CFR_RDD_TMP_INDIVIDU',
                        slug: 'people-net-cfr-rdd-tmp-individu',
                        description: 'Fichier de reprise des individus',
                        fileFormat: 'excel',
                        separator: ';',
                        iteratorLabel: 'Individu',
                        Column: {
                            create: [
                                {
                                    label: 'TYPE_IMPORT',
                                    slug: 'people-net-individu-type-import',
                                    defaultValue: 'NEW',
                                    description: "Type d'import.",
                                    type: "string",
                                    order: 1,
                                    isRequired: true,
                                },
                                {
                                    label: 'CFR_ID_PERSON',
                                    slug: 'people-net-individu-cfr-id-person',
                                    typeValue: 'Champ standard',
                                    standardFieldLabel: 'Individu transcodification matricule',
                                    description: "Code de l'individu",
                                    type: "string",
                                    order: 2,
                                    isRequired: true,
                                },
                                {
                                    label: 'CFR_DT_EFFET',
                                    slug: 'people-net-individu-cfr-dt-effet',
                                    typeValue: 'Champ standard',
                                    standardFieldLabel: 'Individu date de naissance',
                                    description: "Date effet",
                                    type: "date",
                                    format: 'AAAA-MM-JJ',
                                    order: 3,
                                    isRequired: true,
                                },
                                {
                                    label: 'CFR_CHANGE_REASON',
                                    slug: 'people-net-individu-cfr-change-reason',
                                    description: "DESCRIPTION DU CHANGEMENT",
                                    type: "string",
                                    order: 4,
                                },
                                {
                                    label: 'CFR_N_FAMILY_NAME',
                                    slug: 'people-net-individu-cfr-n-family-name',
                                    description: "Nom d'usage",
                                    typeValue: 'Champ standard',
                                    standardFieldLabel: 'Individu nom d\'usage',
                                    type: "string",
                                    order: 5,
                                },
                                {
                                    label: 'CFR_N_FIRST_NAME',
                                    slug: 'people-net-individu-cfr-n-first-name',
                                    description: "Prénom",
                                    typeValue: 'Champ standard',
                                    standardFieldLabel: 'Individu prénom',
                                    type: "string",
                                    order: 6,
                                },
                                {
                                    label: 'CFR_SS_NUMBER',
                                    slug: 'people-net-individu-cfr-ss-number',
                                    description: "Numéro de sécurité sociale",
                                    typeValue: 'Méthode',
                                    standardFieldLabel: 'Individu numéro de sécurité sociale clé',
                                    type: "string",
                                    order: 7,
                                },
                                {
                                    label: 'CFR_SS_KEY',
                                    slug: 'people-net-individu-cfr-ss-key',
                                    description: "Clé SS",
                                    typeValue: 'Méthode',
                                    standardFieldLabel: 'Individu numéro de sécurité sociale sans clé',
                                    type: "string",
                                    order: 8,
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

export const filev0004 = new FileV0004("File_V0004", "People net individu", 9, "File_V0003")

