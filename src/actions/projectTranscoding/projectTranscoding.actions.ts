"use server";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { TranscodingCreateSchema } from '@/src/defintion';
import z from 'zod';
import { authorizationProject, ActionError } from '@/lib/safe-actions';
import { prisma } from '@/lib/prisma';
import { ProjectColumn } from '@/src/class/projectColumn';

export const createTranscoding = authorizationProject(TranscodingCreateSchema, async (values: z.infer<typeof TranscodingCreateSchema>, { userId, projectId }) => {

    const { projectSlug, columnSlug, sourceValue, targetValue, fileSlug } = TranscodingCreateSchema.parse(values);
    const projectColumn = new ProjectColumn(columnSlug);
    const projectColumnDetail = await projectColumn.getColumnDetail();
    if (!projectColumnDetail) {
        throw new ActionError('La colonne n\'existe pas');
    }

    try {
        await prisma.project_Column_Transco_Value.create({
            data: {
                sourceValue,
                targetValue,
                fileLabel: projectColumnDetail.fileLabel,
                columnLabel: projectColumnDetail.columnLabel,
                softwareLabel: projectColumnDetail.softwareLabel,
                createdBy: userId,
                projectId: projectId
            }
        })
    } catch (err: unknown) {
        throw new ActionError(err as string);
    }

    revalidatePath(`/project/${projectSlug}/param/${fileSlug}/column/${columnSlug}/transcoding`);
    redirect(`/project/${projectSlug}/param/${fileSlug}/column/${columnSlug}/transcoding`);

})  
