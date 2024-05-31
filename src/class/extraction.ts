import { prisma } from '@/lib/prisma';
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
            const extractionDatas = await prisma.extraction_File.findMany({
                where: {
                    Extraction: {
                        slug: this.slug
                    }
                },
                include: {
                    Extraction_Data: true

                }
            })
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
                    fileLabel: countFiles._max.fileLabel
                },
            }
        } catch (err: unknown) {
            throw new Error(err as string)
        }
    }
}