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

class TemplateV0002 extends Seed {
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

                await prisma.template.create({
                    data: {
                        label: 'Enfants',
                        description: 'Template de reprise des enfants',
                        slug: 'enfants',
                        table: 'Person_Children',
                        Template_Column: {
                            create: [
                                {
                                    label: 'Numéro de sécurité sociale du salarié',
                                    fieldLabel: 'numSS',
                                    type: 'string',
                                    minLength: 15,
                                    maxLength: 15,
                                    slug: 'person_children_numSS',
                                    order: 1,
                                    description: 'Numéro de sécurité sociale du salarié'
                                },
                                {
                                    label: 'Nom de l\enfant',
                                    fieldLabel: 'lastname',
                                    type: 'string',
                                    minLength: 1,
                                    maxLength: 50,
                                    slug: 'person_children_lastname',
                                    order: 2,
                                    description: "Nom de l'enfant"
                                },
                                {
                                    label: 'Prénom de l\enfant',
                                    fieldLabel: 'firstname',
                                    type: 'string',
                                    minLength: 9,
                                    maxLength: 9,
                                    slug: 'person_children_firstname',
                                    order: 3,
                                    description: "Prénom de l 'enfant"
                                },
                                {
                                    label: 'Date anniversaire de l\enfant',
                                    fieldLabel: 'birthday',
                                    type: 'date',
                                    slug: 'person_children_birthday',
                                    order: 4,
                                    format: 'JJ/MM/AAAA',
                                    description: "Date anniversaire de l'enfant"
                                },
                                {
                                    label: 'Sexe de l\'enfant',
                                    fieldLabel: 'sex',
                                    type: 'string',
                                    slug: 'person_children_sex',
                                    order: 5,
                                    description: 'Sexe de l\'enfant'
                                },
                                {
                                    label: 'Numéro d\'ordre de l\'enfant',
                                    fieldLabel: 'order',
                                    type: 'string',
                                    slug: 'person_children_order',
                                    order: 6,
                                    description: "Numéro d'ordre de l'enfant"
                                },

                            ]
                        }

                    },

                })
                await prisma.template.create({
                    data: {
                        label: 'Analytique',
                        description: 'Template des ventes analytiques',
                        slug: 'analytique',
                        table: 'Person_Analytic',
                        Template_Column: {
                            create: [
                                {
                                    label: 'Numéro de sécurité sociale du salarié',
                                    fieldLabel: 'numSS',
                                    type: 'string',
                                    minLength: 15,
                                    maxLength: 15,
                                    slug: 'person_analytic_numSS',
                                    order: 1,
                                    description: 'Numéro de sécurité sociale du salarié'
                                },
                                {
                                    label: 'Siren',
                                    fieldLabel: 'siren',
                                    type: 'string',
                                    minLength: 9,
                                    maxLength: 9,
                                    slug: 'person_analytic_siren',
                                    order: 2,
                                    description: "Siren de l'entreprise"
                                },
                                {
                                    label: 'Axe',
                                    fieldLabel: 'axis',
                                    type: 'string',
                                    minLength: 1,
                                    maxLength: 50,
                                    slug: 'person_analytic_axis',
                                    order: 3,
                                    description: 'Axe analytique'
                                },
                                {
                                    label: 'Section',
                                    fieldLabel: 'section',
                                    type: 'string',
                                    minLength: 1,
                                    maxLength: 50,
                                    slug: 'person_analytic_section',
                                    order: 4,
                                    description: 'Section analytique'
                                },
                                {
                                    label: 'Ordre',
                                    fieldLabel: 'order',
                                    type: 'number',
                                    minLength: 1,
                                    maxLength: 50,
                                    slug: 'person_analytic_order',
                                    order: 5,
                                    description: 'Ordre analytique'
                                },
                                {
                                    label: 'Pourcentage',
                                    fieldLabel: 'percentage',
                                    type: 'number',
                                    minLength: 1,
                                    maxLength: 50,
                                    slug: 'person_analytic_percentage',
                                    order: 6,
                                    description: 'Pourcentage analytique'
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

export const templateV0002 = new TemplateV0002("Temmplate_V0002", "Template enfants, analytique", 11, "File_V0005")

