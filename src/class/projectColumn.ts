import { prisma } from "@/lib/prisma";

export class ProjectColumn {
    projectColumnSlug: string;
    constructor(projectColumnSlug: string) {
        this.projectColumnSlug = projectColumnSlug;
    }

    getColumnDetail = async () => {
        try {
            const file = await prisma.project_Column.findUniqueOrThrow({
                where: {
                    slug: this.projectColumnSlug
                }

            })
            return file;
        } catch (error) {
            console.log(error);
            throw new Error("Erreur lors de la récupération des détails du fichier");
        }
    }

    orderIsUnique = async (order: number) => {
        try {
            const column = await this.getColumnDetail()
            const orderExist = await prisma.project_Column.findFirst({
                where: {
                    projectId: column.projectId,
                    softwareLabel: column.softwareLabel,
                    fileLabel: column.fileLabel,
                    order: order
                }
            })
            return orderExist
        } catch (error) {
            console.log(error);
            throw new Error("Erreur lors de la vérification de l'unicité de l'ordre");
        }
    }

    editColumn = async ({
        label,
        type,
        standardFieldLabel,
        defaultValue,
        isRequired,
        order,
        min,
        max,
        minLength,
        maxLength,
        format,
        typeValue
    }: {
        label: string,
        type: string,
        standardFieldLabel?: string | null,
        defaultValue?: string | null,
        isRequired: boolean,
        order: number,
        min?: number,
        max?: number,
        minLength?: number,
        maxLength?: number,
        format?: string | null,
        typeValue: string

    }) => {
        try {
            //Le fomulaire d'édition initialise toute les valeurs car il ne peut pas gérer de null. Attention si min = 0 alors envoyer min = null
            await prisma.project_Column.update({
                where: {
                    slug: this.projectColumnSlug
                },
                data: {
                    type,
                    standardFieldLabel: standardFieldLabel ? standardFieldLabel : null,
                    defaultValue,
                    isRequired,
                    order,
                    min: min ? min : null,
                    max: max ? max : null,
                    minLength: minLength ? minLength : null,
                    maxLength: maxLength ? maxLength : null,
                    format: format ? format : null,
                    typeValue,
                }
            })
        } catch (error) {
            console.log(error);
            throw new Error("Erreur lors de la modification de la colonne");
        }
    }



}