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

class FileV0005 extends Seed {
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
                await prisma.column.update({
                    where: {
                        slug: 'hru-individu-dvind',
                    },
                    data: {
                        format: 'AAAAMMJJ'
                    }
                })
                await prisma.column.update({
                    where: {
                        slug: 'hru-individu-dnais',
                    },
                    data: {
                        format: 'AAAAMMJJ'
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

export const filev0005 = new FileV0005("File_V0005", "Update format date HRU", 10, "File_V0004")

