"use server";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ProjectColumnEditSchema } from '@/src/defintion';
import z from 'zod';
import { authorizationProject, ActionError } from '@/lib/safe-actions';
import { Logger } from '@/src/class/logger';
import { ProjectColumn } from '@/src/class/projectColumn';

export const editProjectColumn = authorizationProject(ProjectColumnEditSchema, async (values: z.infer<typeof ProjectColumnEditSchema>, { userId, projectId }) => {
    const { projectSlug, fileSlug, columnSlug, label, type, standardFieldLabel, defaultValue, isRequired, order, min, max, minLength, maxLength } = ProjectColumnEditSchema.parse(values);
    try {
        const projectColumn = new ProjectColumn(columnSlug)
        const orderExist = await projectColumn.orderIsUnique(order)
        if (orderExist) {
            throw new ActionError(`La position ${order} est déjà utilisée par la colonne ${orderExist.label}`)
        }
        await projectColumn.editColumn({
            label,
            type,
            standardFieldLabel,
            defaultValue,
            isRequired,
            order,
            min,
            max,
            minLength,
            maxLength
        })

    } catch (err: unknown) {
        throw new ActionError(err as string)
    }

    revalidatePath(`/project/${projectSlug}/param/${fileSlug}/`);
    redirect(`/project/${projectSlug}/param/${fileSlug}/`);
})