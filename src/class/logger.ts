import { prisma } from "@/lib/prisma";

export class Logger {

    writeLog = async ({
        level,
        message,
        userId,

    }: {
        level: 'info' | 'error' | 'security',
        message: string,
        userId: string
    }) => {
        try {
            await prisma.logger.create({
                data: {
                    level,
                    message,
                    createdBy: userId
                }

            })
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de l\'écriture du log')
        }
    }
}