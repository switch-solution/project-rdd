import { prisma } from "@/lib/prisma"
import type { ITransform, Society } from "@/src/class/transform/iTransform"
import { Transform } from "@/src/class/transform/transform";
import type { IteratorLabel } from "@/src/helpers/typeTransco";

export class TransformSociety extends Transform implements ITransform {
    projectId: string;
    extractionLabel: string;
    userId: string;
    fileLabel: string;
    numSS?: string;
    contractId?: string;
    siren?: string;
    iteratorLabel: IteratorLabel;
    constructor(props: { projectId: string; extractionLabel: string; userId: string; fileLabel: string; numSS?: string; contractId?: string; siren?: string; iteratorLabel: IteratorLabel }) {
        super(props)
        this.projectId = props.projectId
        this.extractionLabel = props.extractionLabel
        this.userId = props.userId
        this.fileLabel = props.fileLabel
        this.numSS = props.numSS
        this.contractId = props.contractId
        this.siren = props.siren
        this.iteratorLabel = props.iteratorLabel

    }
    data = async ({ numSS, contractId, siren }: { numSS?: string, contractId?: string, siren?: string }) => {
        if (!siren) {
            throw new Error("Le siren est obligatoire")
        }

        const lastDsn = await this.lastDsn(siren)
        const society = await prisma.society.findFirstOrThrow({
            where: {
                siren,
                dsnId: lastDsn.dsnId
            },
            select: {
                dsnId: true,
                siren: true,
                apen: true,
                zipCode: true,
                city: true,
            }
        })
        const transcoSociety = await prisma.transco_Society.findFirstOrThrow({
            where: {
                siren,
                projectId: this.projectId
            },
            select: {
                transcoSocietyNewId: true
            }
        })
        return {
            ...society,
            ...transcoSociety


        }
    }

    transform = async () => {
        try {

            if (!this.siren) {
                throw new Error("Le siren est obligatoire")
            }
            const datas = await this.data({ siren: this.siren }) as Society
            if (!datas) {
                throw new Error("La société n'a pas été trouvé")
            }
            const columns = await this.columns()
            if (!columns) {
                throw new Error("Les colonnes n'ont pas été trouvé")
            }
            const standardField = await this.standardField(this.iteratorLabel)
            await this.process({ columns, datas, standardField })


        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }
    }

    standardField = async (iterator: IteratorLabel) => {
        try {
            if (iterator !== "Société") {
                throw new Error("L'itérateur doit être 'Société'")
            }
            const standardFieldSociety = await this.loadStandardField('Société')
            return standardFieldSociety
        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }
    }



}