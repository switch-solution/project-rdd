import { prisma } from "@/lib/prisma"
type Column = {
    label: string,
    type: string,
    standardFieldLabel: string | null,
    min: number | null,
    max: number | null,
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

type SocietyData = {

    dsnId: string,
    siren: string,
    apen: string,
    zipCode: string,
    city: string,


}
type Data = {
    iteratorLabel: 'Société' | 'Etablissement' | 'Salarié',
    society: {
        data: SocietyData,
        transco: SocietyTransco
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
            const count = await prisma.extraction_Data.count({
                where: {
                    projectId: this.projectId,
                    extractionLabel: this.extractionLabel,
                    fileLabel: this.fileLabel
                }
            }) + 1

            for (const column of this.columns) {
                let value = ''
                if (column.standardFieldLabel) {
                    switch (this.datas.iteratorLabel) {
                        case 'Société':
                            const standardFieldSociety = await this.loadStandardField('Society')
                            const findKey = standardFieldSociety.find((element) => element.label === column.standardFieldLabel)
                            const field = findKey?.field as keyof SocietyData
                            if (field) {
                                value = String(this.datas.society.data[field])
                            }
                            break
                        default:
                            throw new Error('Le type de fichier n\'est pas supporté')
                    }

                }
                datasList.push({
                    projectId: this.projectId,
                    extractionLabel: this.extractionLabel,
                    fileLabel: this.fileLabel,
                    columnLabel: column.label,
                    columnValue: value,
                    rowOrder: count,
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

    private loadStandardField = async (table: 'Society') => {
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



    deleteData = async () => {
        try {
            await prisma.extraction_Data.deleteMany({

                where: {
                    projectId: this.projectId,
                    extractionLabel: this.extractionLabel,

                }
            })
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération de la société')
        }

    }



}