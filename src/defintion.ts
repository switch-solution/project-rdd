import { z } from "zod"

export const TranscoGenerateSchema = z.object({
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    type: z.enum(["society", "establishment", "person", "workcontract"], { required_error: "Le type est obligatoire" })
})

export const TemplateCreateSchema = z.object({
    templateSlug: z.string({ required_error: "Le template est obligatoire." }),
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

export const ExtractionCreateSchema = z.object({
    label: z.string({ required_error: "Le label est obligatoire." }).min(1, { message: "Le label est obligatoire." }),
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    description: z.string().optional(),
})


export const ProjectCreateSchema = z.object({
    label: z.string({ required_error: "Le client est obligatoire." }),
    description: z.string().optional(),
    softwareLabel: z.string({ required_error: "Le logiciel est obligatoire." }).min(1, { message: "Le logiciel est obligatoire." }),
})

export const ExtractionStatCreateSchema = z.object({
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    startDate: z.date({ required_error: "La date de début est obligatoire." }),
    endDate: z.date({ required_error: "La date de fin est obligatoire." }),
    extractionSlug: z.string({ required_error: "L'extraction est obligatoire." }),
    projectFileSlug: z.string({ required_error: "Le fichier est obligatoire." }),
    totalRows: z.number({ required_error: "Le nombre de ligne est obligatoire." })
})

export const ProjectColumnEditSchema = z.object({
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    fileSlug: z.string({ required_error: "Le fichier est obligatoire." }),
    columnSlug: z.string({ required_error: "La colonne est obligatoire." }),
    label: z.string({ required_error: "Le label est obligatoire." }),
    type: z.enum(["string", "integer", "float", "date"], { required_error: "Le type est obligatoire." }),
    standardFieldLabel: z.string().optional(),
    defaultValue: z.string().optional(),
    isRequired: z.boolean(),
    order: z.coerce.number().int(),
    min: z.number().optional(),
    max: z.number().optional(),
    minLength: z.number().optional(),
    maxLength: z.number().optional(),
    format: z.string().optional(),
    typeValue: z.enum(["Champ standard", 'Méthode', 'Valeur par default'])


})

export const TranformCreateSchema = z.object({
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    projectFileSlug: z.string({ required_error: "Le fichier est obligatoire." }),
    extractionSlug: z.string({ required_error: "L'extraction est obligatoire." }),
    id: z.string({ required_error: "L'id est obligatoire." }),
    numSS: z.string().optional(),
    siren: z.string().optional(),
    contractId: z.string().optional()
})

export const TemplatePersonBankCreateSchema = z.object({
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    templateSlug: z.enum(["rib_salaries"]),
    datas: z.array(
        z.object({
            "Numéro de sécurité sociale": z.string().optional(),
            "Siren": z.string().optional(),
            "IBAN 1": z.string().optional(),
            "BIC 1": z.string().optional(),
            "Banque 1": z.string().optional(),
            "IBAN2": z.string().optional(),
            "BIC 2": z.string().optional(),
            "Banque 2": z.string().optional(),
            "Rib salaire": z.string().optional(),
            "Rib acompte": z.string().optional(),
        })
    ).optional()

})

export const TemplateImportCreateSchema = z.object({
    template: z.instanceof(File)
})

