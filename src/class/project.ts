import { prisma } from "@/lib/prisma";
import { Logger } from "@/src/class/logger";

export class Project extends Logger {
    slug: string;
    constructor(slug: string) {
        super()
        this.slug = slug;
    }

    count = async () => {
        try {
            const countDsn = await prisma.dsn.count({
                where: {
                    Project: {
                        slug: this.slug
                    }
                }
            })
            const countNumSS = await prisma.person.groupBy({
                by: ['numSS'],
                where: {
                    Project: {
                        slug: this.slug
                    }
                }
            })
            const countSociety = await prisma.society.groupBy({
                by: ['siren'],
                where: {
                    Project: {
                        slug: this.slug
                    }
                }
            })
            const countEstablishment = await prisma.establishment.groupBy({
                by: ['nic'],
                where: {
                    Project: {
                        slug: this.slug
                    }
                }
            })
            const countTranscoEtablissement = await prisma.transco_Establishment.count({
                where: {
                    Project: {
                        slug: this.slug
                    }
                }
            })
            const countTranscoSociety = await prisma.transco_Society.count({
                where: {
                    Project: {
                        slug: this.slug
                    }
                }
            })
            const countTranscoPerson = await prisma.transco_Person.count({
                where: {
                    Project: {
                        slug: this.slug
                    }
                }
            })
            const countTranscoWorkContract = await prisma.transco_WorkContract.count({
                where: {
                    Project: {
                        slug: this.slug
                    }
                }
            })
            const countTranscoJob = await prisma.transco_Job.count({
                where: {
                    Project: {
                        slug: this.slug
                    }
                }
            })
            return {
                countDsn,
                countNumSS: countNumSS.length,
                countSociety: countSociety.length,
                countEstablishment: countEstablishment.length,
                countTranscoEtablissement,
                countTranscoSociety,
                countTranscoPerson,
                countTranscoWorkContract,
                countTranscoJob
            }
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération du projet')
        }
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

    getTranscoJob = async () => {
        try {
            const transcoJob = await prisma.transco_Job.findMany({
                where: {
                    Project: {
                        slug: this.slug
                    }
                }
            })
            return transcoJob
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération des transcodifications')
        }
    }

    getTranscoSociety = async () => {
        try {
            const transcoSociety = await prisma.transco_Society.findMany({
                where: {
                    Project: {
                        slug: this.slug
                    }
                }
            })
            return transcoSociety
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération des transcodifications')
        }
    }

    getTranscoEstablishment = async () => {
        try {
            const transcoEstablishment = await prisma.transco_Establishment.findMany({
                where: {
                    Project: {
                        slug: this.slug
                    }
                }
            })
            return transcoEstablishment

        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération des transcodifications')
        }

    }

    getTranscoPerson = async () => {
        try {
            const transcoPerson = await prisma.transco_Person.findMany({
                where: {
                    Project: {
                        slug: this.slug
                    }
                }
            })
            return transcoPerson
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération des transcodifications')
        }

    }
    getTranscoWorkContract = async () => {
        try {
            const transcoWorkContract = await prisma.transco_WorkContract.findMany({
                where: {
                    Project: {
                        slug: this.slug
                    }
                }
            })
            return transcoWorkContract
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération des transcodifications')
        }

    }

}