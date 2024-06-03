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

class FormatV0001 extends Seed {
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

                await prisma.format.createMany({
                    data: [
                        {
                            type: "date",
                            format: "AAAA-MM-JJ",
                        },
                        {
                            type: "date",
                            format: "AAAA/MM/JJ",
                        },
                        {
                            type: "date",
                            format: "AAAAMMJJ",
                        },
                        {
                            type: "date",
                            format: "JJ/MM/AAAA",
                        },
                        {
                            type: "date",
                            format: "JJ-MM-AAAA",
                        },
                        {
                            type: "date",
                            format: "JJMMAAAA"
                        }
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

export const formatV0001 = new FormatV0001("Format_V0001", "Format date", 6, "File_V0002")

