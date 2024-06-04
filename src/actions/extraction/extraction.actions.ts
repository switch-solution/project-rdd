"use server";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ExtractionCreateSchema, ExtractionStatCreateSchema } from '@/src/defintion';
import z from 'zod';
import { authorizationProject, ActionError } from '@/lib/safe-actions';
import { prisma } from '@/lib/prisma';
import { Logger } from '@/src/class/logger';
import { Project } from '@/src/class/project';
import { Extraction } from '@/src/class/extraction';
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
                slug: `Extraction-${projectSlug}-${countExtraction + 1}`
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

export const createExtractionStat = authorizationProject(ExtractionStatCreateSchema, async (values: z.infer<typeof ExtractionStatCreateSchema>, { userId, projectId }) => {
    const { projectSlug, startDate, endDate, extractionSlug, totalRows, projectFileSlug } = ExtractionStatCreateSchema.parse(values)
    const project = new Project(projectSlug)
    const projectDetail = await project.project()
    if (!projectDetail) {
        throw new ActionError("Le projet n'a pas été trouvé")
    }
    const extraction = new Extraction(extractionSlug)
    const extractionDetail = await extraction.getExtraction()
    if (!extractionDetail) {
        throw new ActionError("L'extraction n'a pas été trouvé")
    }
    try {
        await extraction.endExtraction(projectFileSlug)
        await extraction.statistics({
            startDate,
            endDate,
            userId,
            totalRows

        })
    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)
    }

    revalidatePath(`/project/${projectSlug}/extraction/${extractionSlug}/`);

})