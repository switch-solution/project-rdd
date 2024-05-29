import { z } from "zod"
import { zfd } from "zod-form-data";

export const uploadFileSchema = zfd.formData({
    email: zfd.text(z.string()),
    file: zfd.file().array(),
});

export const ProjectCreateSchema = z.object({
    label: z.string({ required_error: "Le client est obligatoire." }),
    description: z.string().optional(),
    softwareLabel: z.string({ required_error: "Le logiciel est obligatoire." }).min(1, { message: "Le logiciel est obligatoire." }),
})