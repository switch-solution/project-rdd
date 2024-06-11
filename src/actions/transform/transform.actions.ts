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
import { prisma } from '@/lib/prisma';
export const createTransform = authorizationProject(TranformCreateSchema, async (values: z.infer<typeof TranformCreateSchema>, { userId, projectId }) => {
    const { projectSlug, projectFileSlug, extractionSlug, numSS, siren, contractId, nic } = TranformCreateSchema.parse(values)
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

    const history = projectFileDetail.history
    try {
        if (history) {
            const dsnList = await prisma.dsn.findMany({
                where: {
                    projectId,
                },
                orderBy: {
                    month: 'asc'
                }
            })
            for (const dsn of dsnList) {
                const transform = TransformFactory.createTransform({
                    iteratorLabel: projectFileDetail.iteratorLabel as IteratorLabel,
                    projectId,
                    extractionLabel: extractionDetail.label,
                    userId,
                    fileLabel: projectFileDetail.fileLabel,
                    numSS,
                    contractId,
                    siren,
                    nic,
                    dsnId: dsn.id
                })
                await transform.transform()
            }
        } else {
            let dsnId = null
            if (numSS) {
                dsnId = await lastDsn(numSS, projectId)
            }
            if (siren) {
                dsnId = await lastDsn(siren, projectId)
            }
            if (contractId) {
                dsnId = await lastDsn(contractId, projectId)
            }
            if (nic) {
                dsnId = await lastDsn(nic, projectId)
            }
            if (!dsnId) {
                throw new ActionError("Aucun DSN n'a été trouvé")
            }
            const transform = TransformFactory.createTransform({
                iteratorLabel: projectFileDetail.iteratorLabel as IteratorLabel,
                projectId,
                extractionLabel: extractionDetail.label,
                userId,
                fileLabel: projectFileDetail.fileLabel,
                numSS,
                contractId,
                siren,
                nic,
                dsnId: dsnId?.dsnId

            })
            await transform.transform()

        }


    } catch (err: unknown) {
        throw new ActionError(err as string)
    }

    revalidatePath(`/project/${projectSlug}/extraction/${extractionSlug}/`);

})

const lastDsn = async (value: string, projectId: string): Promise<{
    dsnId: string;
    dsnMonth: string;
}> => {
    try {
        const dsn = await prisma.dsn_Value_Exist.findFirstOrThrow({
            where: {
                value,
                projectId: projectId
            },
            select: {
                dsnId: true,
                dsnMonth: true
            },
            orderBy: {
                dsnMonth: 'desc'
            }
        })
        return dsn
    } catch (err: unknown) {
        console.error(err)
        throw new Error(err as string)
    }

}

