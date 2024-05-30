"use server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import z from 'zod';
import { authorizationProject, ActionError } from '@/lib/safe-actions';
import { prisma } from '@/lib/prisma';
import { Logger } from '@/src/class/logger';
import { TranscoGenerateSchema, TranscoEditSchema, TranscoDeleteSchema } from '@/src/defintion';
import { Transco } from '@/src/class/transco';
export const createTranscoSociety = authorizationProject(TranscoGenerateSchema, async (values: z.infer<typeof TranscoGenerateSchema>, { userId, projectId }) => {
    const { projectSlug, type } = TranscoGenerateSchema.parse(values);
    if (type !== 'society') {
        throw new ActionError("Le type doit être society")
    }
    try {
        await prisma.transco_Society.deleteMany({
            where: {
                projectId
            }
        })
        const societyGroupBy = await prisma.society.groupBy({
            by: ['siren'],
            where: {
                Project: {
                    slug: projectSlug
                }
            }
        })
        await prisma.transco_Society.createMany({
            data: societyGroupBy.map(society => ({
                siren: society.siren,
                projectId,
                createdBy: userId

            }))

        })
        const logger = new Logger()
        await logger.writeLog({
            projectId,
            userId,
            level: 'info',
            message: `Transcodification des sociétés réalisée`
        })
    } catch (err: unknown) {
        const logger = new Logger()
        await logger.writeLog({
            projectId,
            userId,
            level: 'error',
            message: `Erreur transcodification des sociétés`
        })
        throw new ActionError(err as string);
    }
    revalidatePath(`/project/${projectSlug}/transco/society`);
    redirect(`/project/${projectSlug}/transco/society`);

})

export const createTranscoEstablishment = authorizationProject(TranscoGenerateSchema, async (values: z.infer<typeof TranscoGenerateSchema>, { userId, projectId }) => {
    const { projectSlug, type } = TranscoGenerateSchema.parse(values);
    if (type !== 'establishment') {
        throw new ActionError("Le type doit être establishment")
    }
    try {
        await prisma.transco_Establishment.deleteMany({
            where: {
                projectId
            }
        })
        const establishementGroupBy = await prisma.establishment.groupBy({
            by: ['nic', 'siren'],
            where: {
                Project: {
                    slug: projectSlug
                }
            }
        })
        await prisma.transco_Establishment.createMany({
            data: establishementGroupBy.map(establishment => ({
                nic: establishment.nic,
                siren: establishment.siren,
                projectId,
                createdBy: userId

            }))
        })
        const logger = new Logger()
        await logger.writeLog({
            projectId,
            userId,
            level: 'info',
            message: `Transcodification des établissements réalisée`
        })
    } catch (err: unknown) {
        const logger = new Logger()
        await logger.writeLog({
            projectId,
            userId,
            level: 'error',
            message: `Erreur transcodification des sociétés`
        })
        throw new ActionError(err as string);
    }
    revalidatePath(`/project/${projectSlug}/transco/establishment`);
    redirect(`/project/${projectSlug}/transco/establishment`);
})

export const createTranscoPerson = authorizationProject(TranscoGenerateSchema, async (values: z.infer<typeof TranscoGenerateSchema>, { userId, projectId }) => {
    const { projectSlug, type } = TranscoGenerateSchema.parse(values);
    if (type !== 'person') {
        throw new ActionError("Le type doit être matricule")
    }
    try {
        await prisma.transco_Person.deleteMany({
            where: {
                projectId
            }
        })
        const personGroupBy = await prisma.person.groupBy({
            by: ['numSS', 'firstname', 'lastname', 'siren', 'nic', 'employeeId'],
            where: {
                Project: {
                    slug: projectSlug
                }
            }
        })
        await prisma.transco_Person.createMany({
            data: personGroupBy.map(person => ({
                numSS: person.numSS,
                firstname: person.firstname,
                oldId: person.employeeId,
                lastname: person.lastname,
                projectId,
                createdBy: userId,
                siret: `${person.siren}${person.nic}`

            }))
        })
        const logger = new Logger()
        await logger.writeLog({
            projectId,
            userId,
            level: 'info',
            message: `Transcodification des matricules réalisée`
        })
    } catch (err: unknown) {
        const logger = new Logger()
        await logger.writeLog({
            projectId,
            userId,
            level: 'error',
            message: `Erreur transcodification des matricules`
        })
        throw new ActionError(err as string);
    }

    revalidatePath(`/project/${projectSlug}/transco/person`);
    redirect(`/project/${projectSlug}/transco/person`);

})

export const createTranscoWorkcontract = authorizationProject(TranscoGenerateSchema, async (values: z.infer<typeof TranscoGenerateSchema>, { userId, projectId }) => {
    const { projectSlug, type } = TranscoGenerateSchema.parse(values);
    if (type !== 'workcontract') {
        throw new ActionError("Le type doit être workcontract")
    }
    try {
        await prisma.transco_WorkContract.deleteMany({
            where: {
                projectId
            }
        })
        const workContractGroupBy = await prisma.workContract.groupBy({
            by: ['numSS', 'siren', 'nic', 'contractId'],
            where: {
                Project: {
                    slug: projectSlug
                }
            }

        })
        const personList = await prisma.person.findMany({
            where: {
                Project: {
                    slug: projectSlug
                },
                numSS: {
                    in: workContractGroupBy.map(workContract => workContract.numSS)
                }
            }
        })
        await prisma.transco_WorkContract.createMany({
            data: workContractGroupBy.map(workContract => {
                const person = personList.find(person => person.numSS === workContract.numSS)
                return {
                    numSS: workContract.numSS,
                    siren: workContract.siren,
                    nic: workContract.nic,
                    contractId: workContract.contractId,
                    projectId,
                    createdBy: userId,
                    siret: `${workContract.siren}${workContract.nic}`,
                    firstname: person?.firstname ? person.firstname : "",
                    lastname: person?.lastname ? person.lastname : ""
                }
            })

        })
        const logger = new Logger()
        await logger.writeLog({
            projectId,
            userId,
            level: 'info',
            message: `Transcodification des contrats réalisée`
        })
    } catch (err: unknown) {
        const logger = new Logger()
        await logger.writeLog({
            projectId,
            userId,
            level: 'error',
            message: `Erreur transcodification des contrats`
        })
        throw new ActionError(err as string);
    }
    revalidatePath(`/project/${projectSlug}/transco/workcontract`);
    redirect(`/project/${projectSlug}/transco/workcontract`);

})

export const editTransco = authorizationProject(TranscoEditSchema, async (values: z.infer<typeof TranscoEditSchema>, { userId, projectId }) => {
    const { projectSlug, transcoSlug, newId, type } = TranscoEditSchema.parse(values)
    const transco = new Transco(transcoSlug, type)
    try {
        await transco.editTransco(newId)
        const logger = new Logger()
        await logger.writeLog({
            projectId,
            userId,
            level: 'info',
            message: `Modification des sociétés réalisée ${transcoSlug} => ${newId}`
        })

    } catch (err: unknown) {
        const logger = new Logger()
        await logger.writeLog({
            projectId,
            userId,
            level: 'error',
            message: `Erreur modification des sociétés`
        })
        throw new ActionError(err as string);
    }
    revalidatePath(`/project/${projectSlug}/transco/${type}`);
    redirect(`/project/${projectSlug}/transco/${type}`);

})

export const deleteTransco = authorizationProject(TranscoDeleteSchema, async (values: z.infer<typeof TranscoDeleteSchema>, { userId, projectId }) => {
    const { projectSlug, transcoSlug, type } = TranscoDeleteSchema.parse(values)
    const transco = new Transco(transcoSlug, type)
    try {
        await transco.deleteTransco()
        const logger = new Logger()
        await logger.writeLog({
            projectId,
            userId,
            level: 'info',
            message: `Suppression transco société`
        })

    } catch (err: unknown) {
        const logger = new Logger()
        await logger.writeLog({
            projectId,
            userId,
            level: 'error',
            message: `Erreur suppression transco société`
        })
        throw new ActionError(err as string);
    }
    revalidatePath(`/project/${projectSlug}/transco/${type}`);
    redirect(`/project/${projectSlug}/transco/${type}`);

})


