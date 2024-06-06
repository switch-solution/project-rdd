"use server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import z from 'zod';
import { action, ActionError, authorizationProject } from '@/lib/safe-actions';
import { TemplateCreateSchema, TemplatePersonBankCreateSchema, TemplateImportCreateSchema, TemplateChildrenCreateSchema } from '@/src/defintion';
import { Template } from '@/src/class/template';
export const createTemplate = action(TemplateCreateSchema, async (values: z.infer<typeof TemplateCreateSchema>) => {
    const { templateSlug } = TemplateCreateSchema.parse(values)
    try {
        const template = new Template(templateSlug)
        const file = await template.makeFile()
        return file
    } catch (err: unknown) {
        console.error(err)
        throw new ActionError("Une erreur est survenue lors de la création du template")
    }

    revalidatePath("/template")

})

export const createTemplateChildren = authorizationProject(TemplateChildrenCreateSchema, async (values: z.infer<typeof TemplateChildrenCreateSchema>, { userId, projectId }) => {
    const { templateSlug, datas, projectSlug } = TemplateChildrenCreateSchema.parse(values)
    if (!datas) {
        throw new ActionError("Aucune donnée n'a été importée")
    }
    try {
        const template = new Template(templateSlug)
        await template.deleteChildren(projectId)
        await template.insertChildren({
            projectId,
            children: datas,
            userId
        })

    } catch (err: unknown) {
        console.error(err)
        throw new ActionError("Une erreur est survenue lors de la création du template")
    }

    revalidatePath(`/project/${projectSlug}/`)
    redirect(`/project/${projectSlug}/`)


})



export const createTemplatePersonBank = authorizationProject(TemplatePersonBankCreateSchema, async (values: z.infer<typeof TemplatePersonBankCreateSchema>, { userId, projectId }) => {
    const { projectSlug, templateSlug, datas } = TemplatePersonBankCreateSchema.parse(values)
    if (!datas) {
        throw new ActionError("Aucune donnée n'a été importée")
    }

    try {
        const template = new Template(templateSlug)
        await template.deleteBank(projectId)
        await template.insertBank({
            projectId,
            ribs: datas,
            userId
        })
    } catch (err: unknown) {
        console.error(err)
        throw new ActionError("Une erreur est survenue lors de la création du template")
    }

    revalidatePath(`/project/${projectSlug}/`)
    redirect(`/project/${projectSlug}/`)

})
