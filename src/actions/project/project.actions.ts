"use server";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ProjectCreateSchema } from '@/src/defintion';
import z from 'zod';
import { action, ActionError } from '@/lib/safe-actions';
import { prisma } from '@/lib/prisma';
import { Logger } from '@/src/class/logger';
export const createProject = action(ProjectCreateSchema, async (values: z.infer<typeof ProjectCreateSchema>, { userId }) => {

    const { label, description, softwareLabel } = ProjectCreateSchema.parse(values);
    if (!userId) {
        throw new ActionError("Vous devez être connecté pour effectuer cette action.");
    }
    let project: { id: string, slug: string }
    try {
        const countProject = await prisma.project.count()
        project = await prisma.project.create({
            data: {
                label,
                description,
                createdBy: userId,
                softwareLabel,
                slug: `Project-${countProject}`
            },
        })
        await prisma.user_Project.create({
            data: {
                userId,
                projectId: project.id,
                createdBy: userId
            },

        })
        const logger = new Logger()
        await logger.writeLog({
            level: 'info',
            message: `Le projet ${label} a été créé`,
            userId
        })

        const file = await prisma.file.findMany({
            where: {
                softwareLabel: softwareLabel
            },
            include: {
                Column: {
                    include: {
                        Row: true
                    },
                }
            }
        })
        const transcos = await prisma.column.findMany({
            where: {
                softwareLabel: softwareLabel
            },
            include: {
                Column_Transco_Value: {

                }
            }
        })
        await prisma.project_File.createMany({
            data: file.map((file) => {
                return {
                    fileLabel: file.label,
                    fileFormat: file.fileFormat,
                    projectId: project.id,
                    softwareLabel: softwareLabel,
                    createdBy: userId,
                    separator: file.separator,
                    iteratorLabel: file.iteratorLabel,

                }
            })
        })

        await prisma.project_Column.createMany({
            data: file.map((file) => {
                return file.Column.map((column) => {
                    return {
                        columnLabel: column.label,
                        projectId: project.id,
                        createdBy: userId,
                        softwareLabel: softwareLabel,
                        fileLabel: file.label,
                        typeValue: column.typeValue,
                        label: column.label,
                        type: column.type,
                        format: column.format,
                        min: column.min,
                        max: column.max,
                        minLength: column.minLength,
                        maxLength: column.maxLength,
                        order: column.order,
                        standardFieldLabel: column.standardFieldLabel,

                    }
                })

            }).flat(1)

        })
        await prisma.project_Row.createMany({
            data: file.map((file) => {
                return file.Column.map((column) => {
                    return column.Row.map((row) => {
                        return {
                            projectId: project.id,
                            createdBy: userId,
                            softwareLabel: softwareLabel,
                            fileLabel: file.label,
                            columnLabel: column.label,
                            order: row.order,
                            value: row.value
                        }
                    })
                })
            }).flat(2)
        })
        await prisma.project_Column_Transco_Value.createMany({
            data: transcos.map((transcos) => {
                return transcos.Column_Transco_Value.map((transco) => {
                    return {
                        projectId: project.id,
                        createdBy: userId,
                        order: transco.order,
                        softwareLabel: softwareLabel,
                        columnLabel: transco.columnLabel,
                        fileLabel: transco.fileLabel,
                        sourceValue: transco.sourceValue,
                        targetValue: transco.targetValue,
                    }
                })

            }).flat(1)
        })


    } catch (err: unknown) {
        throw new ActionError(err as string);
    }

    revalidatePath(`/project/${project.slug}`);
    redirect(`/project/${project.slug}`);
})
