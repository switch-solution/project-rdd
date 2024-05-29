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
    let project
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

    } catch (err: unknown) {
        throw new ActionError(err as string);
    }

    revalidatePath(`/project/${project.slug}`);
    redirect(`/project/${project.slug}`);
})
