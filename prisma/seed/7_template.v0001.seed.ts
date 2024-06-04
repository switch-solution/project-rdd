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

class TemplateV0001 extends Seed {
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
                        label: 'RIB des salariés',
                        description: 'Template de reprise des RIB des salariés',
                        slug: 'rib_salaries',
                        table: 'Person_Bank',
                        Template_Column: {
                            create: [
                                {
                                    label: 'Numéro de sécurité sociale',
                                    fieldLabel: 'numSS',
                                    type: 'string',
                                    minLength: 15,
                                    maxLength: 15,
                                    slug: 'person_bank_numSS',
                                    order: 1,
                                    description: 'Numéro de sécurité sociale du salarié'
                                },
                                {
                                    label: 'Siren',
                                    fieldLabel: 'siren',
                                    type: 'string',
                                    minLength: 9,
                                    maxLength: 9,
                                    slug: 'person_bank_siren',
                                    order: 2,
                                    description: 'Siren de l\'entreprise du salarié'
                                },
                                {
                                    label: 'IBAN 1',
                                    fieldLabel: 'iban1',
                                    type: 'string',
                                    minLength: 35,
                                    maxLength: 35,
                                    slug: 'person_bank_iban_1',
                                    order: 3,
                                    description: 'IBAN 1 du salarié'
                                },
                                {
                                    label: 'BIC 1',
                                    fieldLabel: 'bic1',
                                    type: 'string',
                                    minLength: 35,
                                    maxLength: 35,
                                    slug: 'person_bank_bic_1',
                                    order: 4,
                                    description: 'BIC 1 du salarié'
                                },
                                {
                                    label: 'Banque 1',
                                    fieldLabel: 'bank1',
                                    type: 'string',
                                    minLength: 1,
                                    maxLength: 100,
                                    slug: 'person_bank_bank_1',
                                    order: 5,
                                    description: 'Libellé de l\'établissement bancaire 1 du salarié'
                                },
                                {
                                    label: 'IBAN 2',
                                    fieldLabel: 'iban2',
                                    type: 'string',
                                    minLength: 35,
                                    maxLength: 35,
                                    slug: 'person_bank_iban_2',
                                    order: 6,
                                    description: 'IBAN 2 du salarié'
                                },
                                {
                                    label: 'BIC 2',
                                    fieldLabel: 'bic2',
                                    type: 'string',
                                    minLength: 35,
                                    maxLength: 35,
                                    slug: 'person_bank_bic_2',
                                    order: 7,
                                    description: 'BIC 2 du salarié'
                                },
                                {
                                    label: 'Banque 2',
                                    fieldLabel: 'bank2',
                                    type: 'string',
                                    minLength: 1,
                                    maxLength: 100,
                                    slug: 'person_bank_bank_2',
                                    order: 8,
                                    description: 'Libellé de l\'établissement bancaire 2 du salarié'
                                },
                                {
                                    label: 'Rib salaire',
                                    fieldLabel: 'payrool',
                                    type: 'boolean',
                                    minLength: 1,
                                    maxLength: 1,
                                    slug: 'person_bank_payrool',
                                    order: 9,
                                    description: 'Indiquer 1 si le RIB est utilisé pour le versement du salaire sinon 0'
                                },
                                {
                                    label: 'Rib acompte',
                                    fieldLabel: 'advance',
                                    type: 'boolean',
                                    minLength: 1,
                                    maxLength: 1,
                                    slug: 'person_bank_advance',
                                    order: 10,
                                    description: 'Indiquer 1 si le RIB est utilisé pour le versement des acomptes sinon 0'
                                },
                                {
                                    label: 'Rib frais professionnels',
                                    fieldLabel: 'expense',
                                    type: 'boolean',
                                    minLength: 1,
                                    maxLength: 1,
                                    slug: 'person_bank_expense',
                                    order: 11,
                                    description: 'Indiquer 1 si le RIB est utilisé pour le remboursement des notes de frais sinon 0'
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

export const templateV0001 = new TemplateV0001("Temmplate_V0001", "Template banque", 7, "Format_V0001")

