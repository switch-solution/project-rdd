import { prisma } from "@/lib/prisma"
import type { ITransform, Person } from "@/src/class/transform/iTransform"
import { Transform } from "@/src/class/transform/transform";
import type { IteratorLabel } from "@/src/helpers/typeTransco";
export class TransformPerson extends Transform implements ITransform {
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
        if (!numSS) {
            throw new Error("Le siren est obligatoire")
        }
        const person = await prisma.person.findFirstOrThrow({
            where: {
                numSS,
                dsnId: this.dsnId
            },
            select: {
                dsnId: true,
                numSS: true,
                siren: true,
                nic: true,
                lastname: true,
                surname: true,
                firstname: true,
                sex: true,
                birthday: true,
                placeOfBith: true,
                address1: true,
                codeZip: true,
                city: true,
                countryBirth: true,

            }
        })
        const persnBank = await prisma.person_Bank.findFirst({
            where: {
                numSS
            },
            select: {
                iban1: true,
                iban2: true,
                bic1: true,
                bic2: true,
                payrool: true,
                bank1: true,
                bank2: true,
                advance: true,
                expense: true,
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

        const emailPerson = await prisma.person.findFirst({
            where: {
                numSS
            },
            select: {
                email: true
            }
        })
        const transcoEmail = await prisma.transco_Domain_Email.findMany({
            where: {
                projectId: this.projectId,
            }
        })
        const emailPersonDomain = emailPerson?.email?.split('@')[1]
        const emailDomain = transcoEmail.find(e => e.domain === emailPersonDomain)
        const emailPerso = emailDomain?.type === 'personnel' ? emailPerson?.email : ''
        const emailPro = emailDomain?.type === 'professionnel' ? emailPerson?.email : ''
        return {
            ...person,
            ...transcoPerson,
            ...persnBank,
            emailPerso,
            emailPro
        }
    }

    transform = async () => {
        try {

            if (!this.numSS) {
                throw new Error("Le num SS est obligatoire")
            }
            const datas = await this.data({ numSS: this.numSS }) as Person
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
            if (iterator !== "Individu") {
                throw new Error("L'itérateur doit être 'individu'")
            }
            const standardFieldSociety = await this.loadStandardField(iterator)
            return standardFieldSociety
        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }
    }



}