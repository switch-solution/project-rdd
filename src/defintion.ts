import { z } from "zod"

export const TranscoGenerateSchema = z.object({
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    type: z.enum(["society", "establishment", "person", "workcontract"], { required_error: "Le type est obligatoire" })
})

export const TranscoEditSchema = z.object({
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    transcoSlug: z.string({ required_error: "Le slug est obligatoire." }),
    newId: z.string({ required_error: "La nouvelle valeur est obligatoire" }),
    type: z.enum(["society", "establishment", "person", "workcontract"], { required_error: "Le type est obligatoire" })

})

export const TranscoDeleteSchema = z.object({
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    transcoSlug: z.string({ required_error: "Le slug est obligatoire." }),
    type: z.enum(["society", "establishment", "person", "workcontract"], { required_error: "Le type est obligatoire" })

})



export const ProjectCreateSchema = z.object({
    label: z.string({ required_error: "Le client est obligatoire." }),
    description: z.string().optional(),
    softwareLabel: z.string({ required_error: "Le logiciel est obligatoire." }).min(1, { message: "Le logiciel est obligatoire." }),
})