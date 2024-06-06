import { prisma } from "@/lib/prisma"
import type { ITransform, Children } from "@/src/class/transform/iTransform"
import { Transform } from "@/src/class/transform/transform";
import type { IteratorLabel } from "@/src/helpers/typeTransco";
export class TransformChildren extends Transform implements ITransform {
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
        if (!numSS) {
            throw new Error("Le siren est obligatoire")
        }
        const lastDsn = await this.lastDsn(numSS)
        const children = await prisma.person_Children.findMany({
            where: {
                numSS,
            },
            select: {
                numSS: true,
                lastname: true,
                firstname: true,
                birthday: true,
                sex: true,
                order: true,
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
            children,
            transcoEmployeeNewId: transcoPerson.transcoEmployeeNewId,

        }
    }

    transform = async () => {
        try {

            if (!this.numSS) {
                throw new Error("Le num SS est obligatoire")
            }
            const datas = await this.data({ numSS: this.numSS }) as Children
            if (!datas) {
                throw new Error("Le num SS n'a pas été trouvé")
            }
            const columns = await this.columns()
            if (!columns) {
                throw new Error("Les colonnes n'ont pas été trouvé")
            }
            const standardField = await this.standardField(this.iteratorLabel)
            for (const child of datas.children) {
                await this.process({ columns, datas: child, standardField })
            }

        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }
    }

    standardField = async (iterator: IteratorLabel) => {
        try {
            if (iterator !== "Email") {
                throw new Error("L'itérateur doit être 'email'")
            }
            const standardFieldSociety = await this.loadStandardField('Email')
            return standardFieldSociety
        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }
    }



}