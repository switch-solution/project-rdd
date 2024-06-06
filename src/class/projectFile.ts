import { prisma } from "@/lib/prisma";

export class ProjectFile {
    projectFileSlug: string;
    constructor(projectFileSlug: string) {
        this.projectFileSlug = projectFileSlug;
    }

    getFileDetail = async () => {
        try {
            const file = await prisma.project_File.findUniqueOrThrow({
                where: {
                    slug: this.projectFileSlug
                }

            })
            return file;
        } catch (error) {
            console.log(error);
            throw new Error("Erreur lors de la récupération des détails du fichier");
        }
    }


    getStandardFields = async () => {
        try {
            const projectFileDetail = await this.getFileDetail();
            const standardFields = await prisma.iterator_Standard_Field.findMany({
                where: {
                    iteratorLabel: projectFileDetail.iteratorLabel
                }
            })
            return standardFields
        } catch (error) {
            console.log(error);
            throw new Error("Erreur lors de la récupération des champs standards");

        }

    }

    getColumns = async (projectId: string) => {
        try {
            const columns = await prisma.project_File.findUniqueOrThrow({
                where: {
                    slug: this.projectFileSlug
                },
                include: {
                    File: {
                        include: {
                            Column: {
                                include: {
                                    Project_Column: {
                                        where: {
                                            Project: {
                                                id: projectId
                                            }
                                        },
                                        orderBy: {
                                            order: 'asc'
                                        }
                                    }
                                },
                                orderBy: {
                                    order: 'asc'
                                }
                            }
                        }
                    }
                }
            })
            const projectColumns = columns.File.Column.map((column) => {
                return column.Project_Column.map((projectColumn) => {
                    return {
                        ...projectColumn
                    }
                })
            }).flat(1)
            return projectColumns
        } catch (error) {
            console.log(error);
            throw new Error("Erreur lors de la récupération des colonnes");
        }
    }
}