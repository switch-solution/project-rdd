import { prisma } from "@/lib/prisma";

export class Logger {

    writeLog = async ({
        level,
        message,
        userId,
        projectId

    }: {
        level: 'info' | 'error' | 'security',
        message: string,
        userId: string,
        projectId?: string | null
    }) => {
        try {
            await prisma.logger.create({
                data: {
                    level,
                    message,
                    createdBy: userId,
                    projectId
                }

            })
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de l\'écriture du log')
        }
    }

}