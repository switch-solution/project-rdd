"use server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import z from 'zod';
import { authorizationProject, ActionError } from '@/lib/safe-actions';
import { prisma } from '@/lib/prisma';
import { Logger } from '@/src/class/logger';
import { TranformCreateSchema } from '@/src/defintion';
import { Loader } from '@/src/class/loader';
import { ProjectFile } from '@/src/class/projectFile';
import { Project } from '@/src/class/project'
import { Transform } from '@/src/class/transform';
import { Extraction } from '@/src/class/extraction';
export const createTransform = authorizationProject(TranformCreateSchema, async (values: z.infer<typeof TranformCreateSchema>, { userId, projectId }) => {
    const { projectSlug, projectFileSlug, extractionSlug, id } = TranformCreateSchema.parse(values)
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
    const history = projectFileDetail.history
    const columns = await projectFile.getColumns(projectId)
    try {
        if (history) {
            const allDsn = await project.getAllDsn(id)
        } else {
            const lastDsnId = await project.getLastDsn(id)
            const loader = new Loader(lastDsnId.dsnId)
            switch (projectFileDetail.iteratorLabel) {
                case "Société":
                    const loadSociety = await loader.getSociety(id)
                    if (!loadSociety) {
                        throw new ActionError("La société n'a pas été trouvé")
                    }
                    const transcoSociety = await loader.getTranscoSociety(id, projectId)
                    const transformSociety = new Transform(
                        {
                            iteratorLabel: "Société",
                            society: {
                                data: loadSociety,
                                transco: {
                                    siren: transcoSociety.siren,
                                    newId: transcoSociety.newId ?? ""
                                }
                            }
                        },
                        columns,
                        extractionDetail.label,
                        projectId,
                        projectDetail.softwareLabel,
                        userId,
                        projectFileDetail.fileLabel
                    )
                    await transformSociety.deleteData()

                    await transformSociety.saveData()

                    break
                default:
                    throw new ActionError("Le type de fichier n'est pas supporté")

            }
        }
    } catch (err: unknown) {
        throw new ActionError(err as string)
    }
    revalidatePath(`/project/${projectSlug}/extraction/${extractionSlug}/`);

})