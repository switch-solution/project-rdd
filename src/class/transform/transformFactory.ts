import { TransformSociety } from "@/src/class/transform/transformSociety";
import { TransformPerson } from "@/src/class/transform/transformPerson";
import { TransformWorkContract } from "@/src/class/transform/transformWorkContract";
import { TransformEmail } from "@/src/class/transform/transformEmail"
import { TransformChildren } from "@/src/class/transform/transformChildren";
import type { IteratorLabel } from "@/src/helpers/typeTransco";
export class TransformFactory {
    static createTransform(
        {
            iteratorLabel,
            projectId,
            extractionLabel,
            userId,
            fileLabel,
            numSS,
            contractId,
            siren
        }: {
            iteratorLabel: IteratorLabel
            projectId: string;
            extractionLabel: string;
            userId: string;
            fileLabel: string;
            numSS?: string;
            contractId?: string;
            siren?: string;
        }) {
        switch (iteratorLabel) {
            case "Société":
                return new TransformSociety({
                    projectId,
                    extractionLabel,
                    userId,
                    fileLabel,
                    numSS,
                    contractId,
                    siren,
                    iteratorLabel
                })
                break

            case "Individu":
                return new TransformPerson({
                    projectId,
                    extractionLabel,
                    userId,
                    fileLabel,
                    numSS,
                    contractId,
                    siren,
                    iteratorLabel
                })
                break
            case "Contrat de travail":
                return new TransformWorkContract({
                    projectId,
                    extractionLabel,
                    userId,
                    fileLabel,
                    numSS,
                    contractId,
                    siren,
                    iteratorLabel
                })
                break
            case "Email":
                return new TransformEmail({
                    projectId,
                    extractionLabel,
                    userId,
                    fileLabel,
                    numSS,
                    contractId,
                    siren,
                    iteratorLabel
                })
                break
            case "Enfant":
                return new TransformChildren({
                    projectId,
                    extractionLabel,
                    userId,
                    fileLabel,
                    numSS,
                    contractId,
                    siren,
                    iteratorLabel
                })
                break
            default:
                throw new Error('Le type de d\'iterateur n\'est pas reconnu')
        }

    }


}