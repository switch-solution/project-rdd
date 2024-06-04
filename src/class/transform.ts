import { prisma } from "@/lib/prisma"
type Column = {
    label: string,
    type: string,
    typeValue: 'Champ standard' | 'Méthode' | 'Valeur par default' | string
    standardFieldLabel: string | null,
    min: number | null,
    max: number | null,
    format: string | null,
    defaultValue: string | null,
    isRequired: boolean,
    minLength: number | null,
    maxLength: number | null,
    order: number,
}


type SocietyData = {
    dsnId: string,
    siren: string,
    apen: string,
    zipCode: string,
    city: string,

}

type WorkContractData = {

}

type PersonData = {
    numSS: string,
}
type Data = {
    iteratorLabel: 'Société' | 'Etablissement' | 'Individu' | 'Contrat de travail',
    society?: {
        data: SocietyData,
    },
    person?: {
        data: PersonData,
    },
    workContract?: {
        data: WorkContractData
    }
}
type ExtractionData = {
    projectId: string,
    extractionLabel: string,
    fileLabel: string,
    columnLabel: string,
    columnValue: string,
    rowOrder: number,
    softwareLabel: string,
    createdBy: string,
}
export class Transform {
    datas: Data
    columns: Column[]
    extractionLabel: string
    projectId: string
    softwareLabel: string
    userId: string
    fileLabel: string
    constructor(
        datas: Data,
        columns: Column[],
        extractionLabel: string,
        projectId: string,
        softwareLabel: string,
        userId: string,
        fileLabel: string
    ) {
        this.datas = datas
        this.columns = columns
        this.extractionLabel = extractionLabel
        this.projectId = projectId
        this.softwareLabel = softwareLabel
        this.userId = userId
        this.fileLabel = fileLabel
    }

    private getStandardField = async () => {
        try {
            switch (this.datas.iteratorLabel) {
                case 'Société':
                    const standardFieldSociety = await this.loadStandardField(['Society'], 'Champ standard')
                    return standardFieldSociety
                    break
                case 'Individu':
                    const standardFieldPerson = await this.loadStandardField(['Person', 'Person_Bank', 'Transco_Person'], 'Champ standard')
                    return standardFieldPerson
                    break
                case 'Contrat de travail':
                    const standardWorkContract = await this.loadStandardField(['WorkContract', 'Transco_Person'], 'Champ standard')
                    return standardWorkContract
                    break

                default:
                    throw new Error('Le type de fichier n\'est pas supporté impossible de charger les champs standards')

            }
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération des champs standards')
        }
    }


    saveData = async () => {
        try {
            const datasList: ExtractionData[] = []
            const rowOrder = await prisma.extraction_Data.findFirst({
                where: {
                    projectId: this.projectId,
                    extractionLabel: this.extractionLabel,
                    fileLabel: this.fileLabel

                },
                select: {
                    rowOrder: true
                },
                orderBy: {
                    rowOrder: 'desc'
                }
            })
            const standardField = await this.getStandardField()

            for (const column of this.columns) {
                let value = ''
                if (column.defaultValue) {
                    value = column.defaultValue
                }
                if (column.standardFieldLabel) {
                    switch (this.datas.iteratorLabel) {
                        case 'Société':
                            if (!this.datas.society) {
                                throw new Error('La société n\'est pas définie')
                            }
                            const findKey = standardField.find((element) => element.label === column.standardFieldLabel)
                            const field = findKey?.field as keyof SocietyData
                            if (field) {
                                value = String(this.datas.society.data[field] ? this.datas.society.data[field] : '')
                            }
                            break
                        case 'Contrat de travail':
                            if (!this.datas.workContract) {
                                throw new Error('Le contrat n\'est pas défini')
                            }
                            const findKeyWorkContract = standardField.find((element) => element.label === column.standardFieldLabel)
                            const fieldWorkContract = findKeyWorkContract?.field as keyof WorkContractData
                            if (fieldWorkContract) {
                                value = String(this.datas.workContract[fieldWorkContract] ? this.datas.workContract[fieldWorkContract] : '')
                            }
                            break
                        case 'Individu':
                            if (!this.datas.person) {
                                throw new Error('La personne n\'est pas définie')
                            }
                            if (column.typeValue === 'Champ standard') {
                                const findKeyPerson = standardField.find((element) => element.label === column.standardFieldLabel)
                                const fieldPerson = findKeyPerson?.field as keyof PersonData
                                if (fieldPerson) {
                                    value = String(this.datas.person.data[fieldPerson] ? this.datas.person.data[fieldPerson] : '')
                                }
                            }
                            if (column.typeValue === 'Méthode') {
                                const standardFieldPerson = await this.loadStandardField(['Person', 'Person_Bank'], 'Méthode')
                                const findKeyPerson = standardFieldPerson.find((element) => element.label === column.standardFieldLabel)
                                const methodLabel = column.standardFieldLabel
                                const fieldPerson = findKeyPerson?.field as keyof PersonData
                                if (fieldPerson) {
                                    value = String(this.datas.person.data[fieldPerson] ? this.datas.person.data[fieldPerson] : '')
                                    value = await this.method(methodLabel, value)
                                }
                            }

                            break
                        default:
                            throw new Error('Le type de fichier n\'est pas supporté')
                    }

                }
                //Check format 
                if (column.type === 'date' && column.format) {
                    value = await this.convertFormatDate(value, column.format)
                }
                datasList.push({
                    projectId: this.projectId,
                    extractionLabel: this.extractionLabel,
                    fileLabel: this.fileLabel,
                    columnLabel: column.label,
                    columnValue: value,
                    rowOrder: rowOrder ? rowOrder.rowOrder + 1 : 1,
                    softwareLabel: this.softwareLabel,
                    createdBy: this.userId,
                })
            }
            await prisma.extraction_Data.createMany({
                data: datasList
            })
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération de la société')
        }
    }

    private method = async (methodLabel:
        'Individu numéro de sécurité sociale sans clé' |
        'Individu numéro de sécurité sociale clé' |
        string
        , value: string) => {
        try {
            switch (methodLabel) {
                case 'Individu numéro de sécurité sociale clé':
                    return value.slice(-2)
                    break
                case 'Individu numéro de sécurité sociale sans clé':
                    return value.slice(0, 13)
                    break
                default:
                    throw new Error('Méthode non supporté')
            }

        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération de la société')
        }
    }

    private loadStandardField = async (table: string[], typeValue: 'Champ standard' | 'Méthode') => {
        try {
            const load = await prisma.standard_Field.findMany({
                where: {
                    table: {
                        in: table as string[]
                    },
                    typeValue
                },
                select: {
                    field: true,
                    label: true

                }
            })
            return load
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération de la société')
        }
    }

    private convertFormatDate = async (value: string, format: string) => {
        //DSN format date DDMMYYYY
        const day = value.slice(0, 2)
        const month = value.slice(2, 4)
        const year = value.slice(4, 8)
        switch (format) {
            case 'AAAA-MM-JJ':
                return `${year}-${month}-${day}`
                break
            case 'AAAA/MM/JJ':
                return `${year}/${month}/${day}`
                break
            case 'AAAAMMJJ':
                return `${year}${month}${day}`
                break
            case 'JJ/MM/AAAA':
                return `${day}/${month}/${year}`
                break
            case 'JJ-MM-AAAA':
                return `${day}-${month}-${year}`
                break
            case 'JJMMAAAA':
                return `${day}${month}${year}`
                break
            default:
                throw new Error(`Format de date ${format} non supporté `)
        }
    }


}