"use server";
import { revalidatePath } from 'next/cache';
import z from 'zod';
import { authorizationProject, ActionError } from '@/lib/safe-actions';
import { TranformCreateSchema } from '@/src/defintion';
import { Loader } from '@/src/class/loader';
import { ProjectFile } from '@/src/class/projectFile';
import { Project } from '@/src/class/project'
import { Transform } from '@/src/class/transform';
import { Extraction } from '@/src/class/extraction';
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
    const history = projectFileDetail.history
    const columns = await projectFile.getColumns(projectId)
    try {
        if (history) {
            //const allDsn = await project.getAllDsn(id)
        } else {

            switch (projectFileDetail.iteratorLabel) {
                case "Société":
                    if (!siren) {
                        throw new ActionError("Le siren est obligatoire")
                    }
                    const lastDsnIdSociety = await project.getLastDsn(siren)
                    const loader = new Loader(lastDsnIdSociety.dsnId)
                    const loadSociety = await loader.getSociety(siren)
                    if (!loadSociety) {
                        throw new ActionError("La société n'a pas été trouvé")
                    }
                    const transformSociety = new Transform(
                        {
                            iteratorLabel: "Société",
                            society: {
                                data: loadSociety,
                            }
                        },
                        columns,
                        extractionDetail.label,
                        projectId,
                        projectDetail.softwareLabel,
                        userId,
                        projectFileDetail.fileLabel
                    )
                    await transformSociety.saveData()

                    break
                case "Contrat de travail":
                    if (!numSS || !contractId) {
                        throw new ActionError("Le numéro de sécurité sociale et l'id du contrat de travail sont obligatoires")
                    }
                    const lastDsnIdWorkContract = await project.getLastDsn(numSS)
                    const loaderWorkContract = new Loader(lastDsnIdWorkContract.dsnId)
                    const loadWorkContract = await loaderWorkContract.getWorkContract(numSS, contractId)
                    const transformWorkContract = new Transform(
                        {
                            iteratorLabel: "Contrat de travail",
                            workContract: {
                                data: loadWorkContract,
                            }
                        },
                        columns,
                        extractionDetail.label,
                        projectId,
                        projectDetail.softwareLabel,
                        userId,
                        projectFileDetail.fileLabel

                    )
                    await transformWorkContract.saveData()
                    break
                case "Individu":
                    if (!numSS) {
                        throw new ActionError("Le numéro de sécurité sociale est obligatoire")
                    }
                    const lastDsnIdPerson = await project.getLastDsn(numSS)
                    const loaderPerson = new Loader(lastDsnIdPerson.dsnId)
                    let loadPerson = await loaderPerson.getPerson(numSS)
                    const transformPerson = new Transform(
                        {
                            iteratorLabel: "Individu",
                            person: {
                                data: loadPerson,
                            }
                        },
                        columns,
                        extractionDetail.label,
                        projectId,
                        projectDetail.softwareLabel,
                        userId,
                        projectFileDetail.fileLabel

                    )
                    await transformPerson.saveData()
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

