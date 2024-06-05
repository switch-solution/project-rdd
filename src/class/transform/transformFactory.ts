import { TransformSociety } from "@/src/class/transform/transformSociety";
import { TransformPerson } from "@/src/class/transform/transformPerson";
import { TransformWorkContract } from "@/src/class/transform/transformWorkContract";
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
            iteratorLabel: 'Société' | 'Etablissement' | 'Individu' | 'Contrat de travail'
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
                    siren
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
                    siren
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
                    siren
                })
                break
            default:
                throw new Error('Le type de d\'iterateur n\'est pas reconnu')
        }

    }


}