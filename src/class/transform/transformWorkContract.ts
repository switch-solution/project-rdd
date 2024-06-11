import { prisma } from "@/lib/prisma"
import type { ITransform, Person, WorkContract } from "@/src/class/transform/iTransform"
import { Transform } from "@/src/class/transform/transform";
import type { IteratorLabel } from "@/src/helpers/typeTransco";
export class TransformWorkContract extends Transform implements ITransform {
    projectId: string;
    extractionLabel: string;
    userId: string;
    fileLabel: string;
    numSS?: string;
    contractId?: string;
    siren?: string;
    iteratorLabel: IteratorLabel;
    dsnId: string;
    constructor(props: { projectId: string; extractionLabel: string; userId: string; fileLabel: string; numSS?: string; contractId?: string; siren?: string; iteratorLabel: IteratorLabel, dsnId: string }) {
        super(props)
        this.projectId = props.projectId
        this.extractionLabel = props.extractionLabel
        this.userId = props.userId
        this.fileLabel = props.fileLabel
        this.numSS = props.numSS
        this.contractId = props.contractId
        this.siren = props.siren
        this.iteratorLabel = props.iteratorLabel
        this.dsnId = props.dsnId

    }
    data = async ({ numSS, contractId, siren }: { numSS?: string, contractId?: string, siren?: string }) => {
        if (!numSS || !contractId) {
            throw new Error("Le numéro SS et le contrat Id sont obligatoires")
        }
        const workContract = await prisma.workContract.findFirstOrThrow({
            where: {
                numSS,
                contractId,
                dsnId: this.dsnId,
            },
            select: {
                dsnId: true,
                numSS: true,
                siren: true,
                nic: true,
                startDate: true,
                contractEndDate: true,
                status: true,
                pcs: true,
                pcsBis: true,
                mal: true,
                contractId: true,
                contract: true,
                ss: true,
                idcc: true,

            }
        })

        const transcoWorkContract = await prisma.transco_WorkContract.findFirstOrThrow({
            where: {
                numSS,
                contractId: workContract.contractId,
                projectId: this.projectId
            },
            select: {
                transcoContractNewId: true
            }
        })
        const transcoPerson = await prisma.transco_Person.findFirstOrThrow({
            where: {
                numSS,
                projectId: this.projectId
            },
            select: {
                transcoEmployeeNewId: true
            }
        })
        return {
            ...workContract,
            ...transcoWorkContract,
            ...transcoPerson

        }
    }

    transform = async () => {
        try {

            if (!this.numSS || !this.contractId) {
                throw new Error("Le num SS est obligatoire et le contrat Id est obligatoire")
            }
            const datas = await this.data({ numSS: this.numSS, contractId: this.contractId }) as WorkContract
            if (!datas) {
                throw new Error("Le num SS n'a pas été trouvé")
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
            if (iterator !== "Contrat de travail") {
                throw new Error("L'itérateur doit être 'individu'")
            }
            const standardFieldWorkContract = await this.loadStandardField(iterator)
            return standardFieldWorkContract
        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }
    }



}