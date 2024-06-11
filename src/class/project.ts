import { prisma } from "@/lib/prisma";
import { Logger } from "@/src/class/logger";
import type { IdListSociety, IdListPerson, IdListWorkContract, IdListEstablishment } from "../helpers/type";
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
            const countExtraction = await prisma.extraction.count({
                where: {
                    Project: {
                        slug: this.slug
                    }
                }
            })
            const countPersonBank = await prisma.person_Bank.count({
                where: {
                    Project: {
                        slug: this.slug
                    }
                }
            })
            const countWorkContract = await prisma.workContract.groupBy({
                by: ['numSS', 'contractId'],
                where: {
                    Project: {
                        slug: this.slug
                    }
                }
            })
            const countMutual = await prisma.mutual.count({
                where: {
                    Project: {
                        slug: this.slug
                    }
                }
            })
            const countChildren = await prisma.person_Children.count({
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
                countTranscoJob,
                countExtraction,
                countPersonBank,
                countWorkContract: countWorkContract.length,
                countMutual,
                countChildren
            }
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération du projet')
        }
    }

    getTransco = async () => {
        try {
            const transcoSociety = await prisma.transco_Society.findMany({
                where: {
                    Project: {
                        slug: this.slug
                    }
                },
                select: {
                    siren: true
                }
            }) as unknown as IdListSociety[]
            const transcoPerson = await prisma.transco_Person.findMany({
                where: {
                    Project: {
                        slug: this.slug
                    }
                },
                select: {
                    numSS: true
                }
            }) as unknown as IdListPerson[]
            const transcoWorkContract = await prisma.transco_WorkContract.findMany({
                where: {
                    Project: {
                        slug: this.slug
                    }
                },
                select: {
                    numSS: true,
                    contractId: true
                }
            }) as unknown as IdListWorkContract[]
            const transcoPersonEmail = await prisma.person.findMany({
                where: {
                    Project: {
                        slug: this.slug
                    },
                    email: {
                        not: null
                    }
                },
                select: {
                    numSS: true
                }
            }) as unknown as IdListPerson[]
            const transcoPersonEnfant = await prisma.person_Children.findMany({
                where: {
                    Project: {
                        slug: this.slug
                    },
                },
                select: {
                    numSS: true
                }
            })
            const transcoEstablishment = await prisma.transco_Establishment.findMany({
                where: {
                    Project: {
                        slug: this.slug
                    },
                },
                select: {
                    siren: true,
                    nic: true
                }
            }) as unknown as IdListEstablishment[]
            return {
                transcoSociety,
                transcoEstablishment,
                transcoPerson,
                transcoWorkContract,
                transcoPersonEmail,
                transcoPersonEnfant
            }
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération des transcodifications')
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
    getExtraction = async () => {
        try {
            const extraction = await prisma.extraction.findMany({
                where: {
                    Project: {
                        slug: this.slug
                    }
                },
                orderBy: {
                    createdAt: 'asc'
                }
            })
            return extraction
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération des extractions')
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

    getAllDsn = async (value: string) => {
        try {
            const dsn = await prisma.dsn_Value_Exist.findMany({
                where: {
                    value: value,
                    Project: {
                        slug: this.slug
                    },
                },
                orderBy: {
                    createdAt: 'asc'
                }
            })
            return dsn
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération des DSN')
        }
    }

    getLastDsn = async (value: string) => {
        try {
            const dsn = await prisma.dsn_Value_Exist.findFirstOrThrow({
                where: {
                    value: value,
                    Project: {
                        slug: this.slug
                    },
                },
                orderBy: {
                    dsnMonth: 'desc'
                }
            })
            return dsn
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération de la dernière DSN')
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
                },
                orderBy: {
                    siren: 'asc'
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
                },
                orderBy: {
                    nic: 'asc'
                }
            })
            return transcoEstablishment

        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération des transcodifications')
        }

    }

    getTranscoDomainEmail = async () => {
        try {
            const transcoEmail = await prisma.transco_Domain_Email.findMany({
                where: {
                    Project: {
                        slug: this.slug
                    }
                },
                orderBy: {
                    domain: 'asc'
                }
            })
            return transcoEmail
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
                },
                orderBy: {
                    numSS: 'asc'
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
                },
                orderBy: {
                    numSS: 'asc'
                }
            })
            return transcoWorkContract
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération des transcodifications')
        }

    }

    getFiles = async () => {
        try {
            const projectFiles = await prisma.project_File.findMany({
                where: {
                    Project: {
                        slug: this.slug
                    }
                },
                orderBy: {
                    fileLabel: 'asc'
                }
            })
            return projectFiles
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération des fichiers')
        }
    }

}