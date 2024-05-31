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

class SoftwareV0001 extends Seed {
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
                await prisma.software.createMany({
                    data: [
                        {
                            label: 'Hr Ultimate',
                            provider: 'Cegid',
                            slug: 'hru'
                        },
                        {
                            label: 'Hr Sprint',
                            provider: 'Cegid',
                            slug: 'hrs'
                        },
                        {
                            label: 'People net',
                            provider: 'Cegid',
                            slug: 'people-net'
                        },
                        {
                            label: 'Teams rh',
                            provider: 'Cegedim',
                            slug: 'teams-rh'
                        },
                        {
                            label: 'Workday',
                            provider: 'Workday',
                            slug: 'workday'
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

export const softwareV0001 = new SoftwareV0001("Software_V0001", "Logiciels", 1, "")

