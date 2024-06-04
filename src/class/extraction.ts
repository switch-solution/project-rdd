import { prisma } from '@/lib/prisma';
import { count } from 'console';
export class Extraction {
    slug: string;
    constructor(slug: string) {
        this.slug = slug;
    }
    getExtraction = async () => {
        try {
            const extraction = await prisma.extraction.findUniqueOrThrow({
                where: {
                    slug: this.slug
                }
            })
            return extraction
        } catch (err: unknown) {
            throw new Error(err as string)
        }
    }

    getFile = async (fileSlug: string) => {
        try {
            const file = await prisma.extraction_File.findUniqueOrThrow({
                where: {
                    slug: fileSlug
                }
            })
            return file
        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }
    }

    getFiles = async () => {
        try {
            const extraction = await this.getExtraction()
            const files = await prisma.extraction_File.findMany({
                where: {
                    Extraction: {
                        slug: this.slug
                    }
                }
            })
            const countRows: {
                fileLabel: string,
                count: number
            }[] = []

            for (const file of files) {
                let count = await prisma.extraction_Data.findFirst({
                    where: {
                        projectId: extraction.projectId,
                        extractionLabel: extraction.label,
                        fileLabel: file.fileLabel

                    },
                    orderBy: {
                        rowOrder: 'desc'
                    }
                })
                countRows.push({
                    fileLabel: file.fileLabel,
                    count: count?.rowOrder || 0
                })
            }

            const countFiles = await prisma.extraction_Data.aggregate({
                where: {
                    projectId: extraction.projectId,
                    extractionLabel: extraction.label
                },
                _max: {
                    rowOrder: true,
                    fileLabel: true
                }
            })


            return {
                files,
                countFiles: {
                    count: countFiles._max.rowOrder,
                    fileLabel: countFiles._max.fileLabel,
                    countRows
                },
            }
        } catch (err: unknown) {
            throw new Error(err as string)
        }
    }

    endExtraction = async (projectFileSlug: string) => {
        try {
            const extraction = await this.getExtraction()
            await prisma.extraction_File.updateMany({
                where: {
                    projectFileSlug: projectFileSlug,
                    extractionLabel: extraction.label,
                    projectId: extraction.projectId
                },
                data: {
                    status: 'Terminé'
                }
            })
        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }
    }

    statistics = async ({
        startDate,
        endDate,
        userId,
        totalRows
    }: {
        startDate: Date,
        endDate: Date,
        userId: string,
        totalRows: number
    }) => {
        {
            try {
                const extraction = await this.getExtraction()
                await prisma.extraction_Stat.create({
                    data: {
                        startDate,
                        endDate,
                        extractionLabel: extraction.label,
                        projectId: extraction.projectId,
                        totalRows: totalRows,
                        createdBy: userId,
                        duration: endDate.getTime() - startDate.getTime()
                    }
                })
            } catch (err: unknown) {
                console.error(err)
                throw new Error(err as string)
            }
        }
    }


}