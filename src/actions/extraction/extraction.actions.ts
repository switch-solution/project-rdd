"use server";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ExtractionCreateSchema } from '@/src/defintion';
import z from 'zod';
import { authorizationProject, ActionError } from '@/lib/safe-actions';
import { prisma } from '@/lib/prisma';
import { Logger } from '@/src/class/logger';
import { Project } from '@/src/class/project';
export const createExtraction = authorizationProject(ExtractionCreateSchema, async (values: z.infer<typeof ExtractionCreateSchema>, { userId, projectId }) => {
    const { label, projectSlug, description } = ExtractionCreateSchema.parse(values);
    let extractionSlug: string;
    const project = new Project(projectSlug);
    try {
        const countExtraction = await prisma.extraction.count({
            where: {
                projectId
            }
        })

        const extraction = await prisma.extraction.create({
            data: {
                label,
                projectId,
                createdBy: userId,
                description,
                status: 'En attente',
                slug: `Extraction-${countExtraction + 1}`
            }
        })
        extractionSlug = extraction.slug
        const files = await project.getFiles()
        await prisma.extraction_File.createMany({
            data: files.map(file => ({
                fileLabel: file.fileLabel,
                projectFileSlug: file.slug,
                projectId,
                createdBy: userId,
                extractionLabel: extraction.label,
                iteratorLabel: file.iteratorLabel,
            }))
        })
        const logger = new Logger()
        await logger.writeLog({
            level: 'info',
            message: `L'extraction ${label} a été créée`,
            userId
        })
    } catch (err: unknown) {
        throw new ActionError(err as string);
    }
    revalidatePath(`/project/${projectSlug}/extraction/${extractionSlug}`);
    redirect(`/project/${projectSlug}/extraction/${extractionSlug}`);
})