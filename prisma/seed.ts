import { PrismaClient } from '@prisma/client'
import { softwareV0001 } from "./seed/1_software.v0001.seed";
import { iteratorV0001 } from './seed/2_iterator.v0001.seed';
import { fileV0001 } from "./seed/3_file.v0001.seed";
import { iteratorV0002 } from './seed/4_iterator.v0002.seed';
import { fileV0002 } from "./seed/5_file.v0002.seed";
import { formatV0001 } from './seed/6_format.v0001.seed';
import { templateV0001 } from './seed/7_template.v0001.seed';
import { filev0003 } from './seed/8_file.v0003.seed';
import { filev0004 } from './seed/9_file.v0004.seed';
import { filev0005 } from './seed/10_file.v0005.seed';
import { templateV0002 } from './seed/11_template.v0002.seed';
import { iteratorV0003 } from './seed/12_iterator.v0003.seed';
import { filev0006 } from './seed/13_file.v0006.seed';
import { iteratorV0004 } from './seed/14_iterator.v0004.seed';
import { filev0007 } from './seed/15_file.v0007.seed';
import { filev0008 } from './seed/16_file.v0008.seed';
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

const main = async () => {
    await softwareV0001.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await iteratorV0001.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await fileV0001.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await iteratorV0002.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await fileV0002.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await formatV0001.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await templateV0001.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await filev0003.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await filev0004.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await filev0005.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await templateV0002.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await iteratorV0003.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await filev0006.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await iteratorV0004.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await filev0007.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    await filev0008.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })


}

main()
