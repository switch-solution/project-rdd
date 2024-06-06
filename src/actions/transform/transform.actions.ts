"use server";
import { revalidatePath } from 'next/cache';
import z from 'zod';
import { authorizationProject, ActionError } from '@/lib/safe-actions';
import { TranformCreateSchema } from '@/src/defintion';
import { ProjectFile } from '@/src/class/projectFile';
import { Project } from '@/src/class/project'
import { Extraction } from '@/src/class/extraction';
import { TransformFactory } from '@/src/class/transform/transformFactory';
import { IteratorLabel } from '@/src/helpers/typeTransco';
export const createTransform = authorizationProject(TranformCreateSchema, async (values: z.infer<typeof TranformCreateSchema>, { userId, projectId }) => {
    const { projectSlug, projectFileSlug, extractionSlug, numSS, siren, contractId } = TranformCreateSchema.parse(values)
    const project = new Project(projectSlug)
    const projectDetail = await project.project()
    if (!projectDetail) {
        throw new ActionError("Le projet n'a pas été trouvé")
    }
    const projectFile = new ProjectFile(projectFileSlug)
    const projectFileDetail = await projectFile.getFileDetail()
    if (!projectFileDetail) {
        throw new ActionError("Le fichier n'a pas été trouvé")
    }
    const extraction = new Extraction(extractionSlug)
    const extractionDetail = await extraction.getExtraction()
    const status = extractionDetail.status
    if (status !== "En attente") {
        throw new ActionError("L'extraction a déjà été traitée")
    }
    const transform = TransformFactory.createTransform({
        iteratorLabel: projectFileDetail.iteratorLabel as IteratorLabel,
        projectId,
        extractionLabel: extractionDetail.label,
        userId,
        fileLabel: projectFileDetail.fileLabel,
        numSS,
        contractId,
        siren

    })
    try {
        await transform.transform()
    } catch (err: unknown) {
        throw new ActionError(err as string)
    }

    revalidatePath(`/project/${projectSlug}/extraction/${extractionSlug}/`);

})

