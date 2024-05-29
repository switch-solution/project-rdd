import { prisma } from "@/lib/prisma";
import { Logger } from "@/src/class/logger";

export class Project extends Logger {
    slug: string;
    constructor(slug: string) {
        super()
        this.slug = slug;
    }

    project = async () => {
        try {
            const project = await prisma.project.findUnique({
                where: {
                    slug: this.slug
                }

            })
            return project
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération du projet')
        }

    }
    userExist = async (userId: string) => {
        try {
            const userProject = await prisma.project.findFirst({
                where: {
                    slug: this.slug,
                },
                include: {
                    User_Project: {
                        where: {
                            userId
                        }
                    }
                }
            })
            if (userProject?.User_Project.length === 0) {
                await this.writeLog({
                    level: 'security',
                    message: `L'utilisateur ${userId} essaye d'accéder au projet ${userProject.label} sans autorisation`,
                    userId
                })
                throw new Error('Vous n\'avez pas accès à ce projet')
            }
            return userProject
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération du projet')
        }

    }
}