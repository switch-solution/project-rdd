import { prisma } from "@/lib/prisma";

export class File {
    slug: string;
    constructor(slug: string) {
        this.slug = slug;
    }

    getDetail = async () => {
        try {
            const file = await prisma.file.findUnique({
                where: {
                    slug: this.slug
                }
            })
            return file;
        } catch (error) {
            console.log(error);
            throw new Error("Erreur lors de la récupération des détails du fichier");

        }
    }
    getColumns = async () => {
        try {
            const columns = await prisma.column.findMany({
                where: {
                    File: {
                        slug: this.slug
                    }
                }
            })
            return columns;
        } catch (error) {
            console.log(error);
            throw new Error("Erreur lors de la récupération des colonnes");
        }

    }
    getColumnDetail = async (columnSlug: string) => {
        try {
            const column = await prisma.column.findUniqueOrThrow({
                where: {
                    slug: columnSlug
                }

            })
            return column;
        } catch (error) {
            console.log(error);
            throw new Error("Erreur lors de la récupération des détails de la colonne");
        }

    }



}