import { prisma } from "@/lib/prisma"
type Column = {
    label: string,
    type: string,
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

type SocietyTransco = {
    siren: string,
    newId: string,
}

type PersonTransco = {
    numSS: string,
    newId: string,
}


type SocietyData = {

    dsnId: string,
    siren: string,
    apen: string,
    zipCode: string,
    city: string,


}

type PersonData = {
    numSS: string,
}
type Data = {
    iteratorLabel: 'Société' | 'Etablissement' | 'Individu',
    society?: {
        data: SocietyData,
        transco: SocietyTransco
    },
    person?: {
        data: PersonData,
        transco: PersonTransco
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
                            const standardFieldSociety = await this.loadStandardField('Society')
                            const findKey = standardFieldSociety.find((element) => element.label === column.standardFieldLabel)
                            const field = findKey?.field as keyof SocietyData
                            if (field) {
                                value = String(this.datas.society.data[field])
                            }
                            break
                        case 'Individu':
                            if (!this.datas.person) {
                                throw new Error('La personne n\'est pas définie')

                            }
                            const standardFieldPerson = await this.loadStandardField('Person')
                            const findKeyPerson = standardFieldPerson.find((element) => element.label === column.standardFieldLabel)
                            const fieldPerson = findKeyPerson?.field as keyof PersonData
                            if (fieldPerson) {
                                value = String(this.datas.person.data[fieldPerson])
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

    private loadStandardField = async (table: 'Society' | 'Person') => {
        try {
            const society = await prisma.standard_Field.findMany({
                where: {
                    table
                },
                select: {
                    field: true,
                    label: true

                }
            })
            return society
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



    deleteData = async () => {
        try {
            await prisma.extraction_Data.deleteMany({

                where: {
                    projectId: this.projectId,
                    extractionLabel: this.extractionLabel,
                    fileLabel: this.fileLabel

                }
            })
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération de la société')
        }

    }



}