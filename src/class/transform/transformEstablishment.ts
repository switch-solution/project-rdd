import { prisma } from "@/lib/prisma"
import type { ITransform, Establishment } from "@/src/class/transform/iTransform"
import { Transform } from "@/src/class/transform/transform";
import type { IteratorLabel } from "@/src/helpers/typeTransco";

export class TransformEstablishment extends Transform implements ITransform {
    projectId: string;
    extractionLabel: string;
    userId: string;
    fileLabel: string;
    numSS?: string;
    contractId?: string;
    siren?: string;
    iteratorLabel: IteratorLabel;
    nic?: string;
    dsnId: string;
    constructor(props: { projectId: string; extractionLabel: string; userId: string; fileLabel: string; numSS?: string; contractId?: string; siren?: string; nic?: string, iteratorLabel: IteratorLabel, dsnId: string }) {
        super(props)
        this.projectId = props.projectId
        this.extractionLabel = props.extractionLabel
        this.userId = props.userId
        this.fileLabel = props.fileLabel
        this.numSS = props.numSS
        this.contractId = props.contractId
        this.siren = props.siren
        this.iteratorLabel = props.iteratorLabel
        this.nic = props.nic
        this.dsnId = props.dsnId

    }
    data = async ({ numSS, contractId, siren, nic }: { numSS?: string, contractId?: string, siren?: string, nic?: string }) => {
        if (!siren || !nic) {
            throw new Error("Le siren et le nic sont obligatoires")
        }

        const establishment = await prisma.establishment.findFirstOrThrow({
            where: {
                siren,
                dsnId: this.dsnId,
                nic
            },
            select: {
                dsnId: true,
                siren: true,
                ape: true,
                postalCode: true,
                city: true,
                nic: true,
                legalStatus: true
            }
        })
        const transcoEstablishment = await prisma.transco_Establishment.findFirstOrThrow({
            where: {
                siren,
                nic,
                projectId: this.projectId
            },
            select: {
                transcoEstablishmentNewId: true
            }
        })
        return {
            ...establishment,
            ...transcoEstablishment


        }
    }

    transform = async () => {
        try {

            if (!this.siren || !this.nic) {
                throw new Error("Le siren et le siren sont obligatoires")
            }
            const datas = await this.data({ siren: this.siren, nic: this.nic }) as Establishment
            if (!datas) {
                throw new Error("L\'établissement n'a pas été trouvé")
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
            if (iterator !== "Etablissement") {
                throw new Error("L'itérateur doit être etablissement'")
            }
            const standardFieldSociety = await this.loadStandardField(iterator)
            return standardFieldSociety
        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }
    }



}